import { ContractRunner } from 'ethers';
import { TranspilerOutput } from '../../../dsl';
import { nodeIdByNotation } from '../../../dsl/transformer';
import { InstanceConfig } from '../../../dsl/transpiler/state/types';
import {
  bytesEncodeArgs,
  DSLTypesToIRTypes,
  extractArguments,
  extractComponents,
  extractInjection,
  indexConstants,
  isConstant,
  strIsSubst,
  strIsVar,
} from '../helpers';
import { OnchainArgsTypesHandler } from './parser-contracts/tools';
import { ParsingResult, Type, ValidationMiddlware } from './types';

type Parameter = {
  value: string;
  index: number;
};

type KnownParamsAndInitData = {
  knownExecParams: Parameter[];
  initDataEncoded: string;
};

type RetrieveExecAndInitData = (
  parameters: Array<Parameter>,
  initArgs: string[],
  instanceConfig: InstanceConfig,
  artifactAddress: string,
  provider?: ContractRunner,
) => KnownParamsAndInitData | Promise<KnownParamsAndInitData>;

const getKnownExecDataAndInitDataFromDslTypes = (
  parameters: Array<Parameter>,
  initArgs: string[],
  instanceConfig: InstanceConfig,
  artifactAddress: string,
  provider?: ContractRunner,
): KnownParamsAndInitData => {
  const execConstTypes = instanceConfig.execArguments
    .filter((el) => el.constant)
    .map((el) => el.type);

  const knownExecParams = indexConstants(
    parameters.filter((arg) => isConstant(arg.value)),
    execConstTypes.map(DSLTypesToIRTypes),
  );

  const initTypes = instanceConfig.initArguments.map((el) => el.type);
  const initDataEncoded = bytesEncodeArgs(
    initArgs,
    initTypes.map(DSLTypesToIRTypes),
  );

  return {
    knownExecParams,
    initDataEncoded,
  };
};

const getKnownExecDataAndInitDataFromOnchainTypes = async (
  parameters: Array<Parameter>,
  initArgs: string[],
  instanceConfig: InstanceConfig,
  artifactAddress: string,
  provider?: ContractRunner,
): Promise<KnownParamsAndInitData> => {
  const onchain = new OnchainArgsTypesHandler(provider!);

  const { execParamsTypes, initParamsTypes } =
    await onchain.getDescriptors(artifactAddress);

  const knownExecParams = indexConstants(
    parameters.filter((arg) => isConstant(arg.value)),
    <Type[]>execParamsTypes,
  );
  const initDataEncoded = bytesEncodeArgs(initArgs, <Type[]>initParamsTypes);

  return {
    knownExecParams,
    initDataEncoded,
  };
};

// note: types dsl-inferred-first
export const parseIRByDSLTypesWithInterceptor = async (
  { ir, typings }: TranspilerOutput,
  middleware?: ValidationMiddlware,
) => {
  return parse(
    { ir, typings },
    getKnownExecDataAndInitDataFromDslTypes,
    middleware,
  );
};

// note: types onchain-inferred-first
export const parseIRByOnchainTypesWithInterceptor = async (
  { ir, typings }: TranspilerOutput,
  provider: ContractRunner,
  middleware?: ValidationMiddlware,
) => {
  return parse(
    { ir, typings },
    getKnownExecDataAndInitDataFromOnchainTypes,
    middleware,
    provider,
  );
};

const parse = async (
  transpileOutput: Pick<TranspilerOutput, 'ir' | 'typings'>,
  exectAndInitData: RetrieveExecAndInitData,
  middleware?: ValidationMiddlware,
  provider?: ContractRunner,
) => {
  const res: ParsingResult[] = [];

  const artifacts = transpileOutput.ir.trim().split(/\r?\n/);
  for (let [index, artifact] of artifacts.entries()) {
    artifact = artifact.trim();
    const { addressClause, paramsClause, initClause } =
      extractComponents(artifact);

    const artifactAddress = addressClause;
    const parameters = extractArguments(paramsClause).map((value, index) => ({
      value,
      index,
    }));

    const initArgs = extractArguments(initClause);

    const variables = parameters
      .filter((val) => strIsVar(val.value))
      .map((val) => val.index);
    const substitutions = parameters
      .filter((val) => strIsSubst(val.value))
      .map((val) => ({
        value: val.value.replace(/\|/g, ''),
        index: val.index,
      }));

    const currentInstanceConfig = transpileOutput.typings[index];

    if (middleware) {
      await middleware.innerValidations(artifactAddress, currentInstanceConfig);
    }

    const { knownExecParams: partialExecData, initDataEncoded: initData } =
      await exectAndInitData(
        parameters,
        initArgs,
        currentInstanceConfig,
        artifactAddress,
        provider,
      );

    const injections = parameters
      .filter((val) => strIsVar(val.value))
      .map((el, index) => {
        const injection = extractInjection(el.value);

        if (injection && injection != '') {
          return {
            value: el.value,
            index,
          };
        }
      })
      .filter((el) => !!el);

    res.push({
      id: nodeIdByNotation(artifact, index),
      artifactAddress,
      partialExecData,
      variables,
      injections,
      argsCount: parameters.length,
      substitutions,
      initData,
      needsInitialization: initArgs.length != 0,
    });
  }

  if (middleware) {
    await middleware.outerValidations(res);
  }

  return res;
};
