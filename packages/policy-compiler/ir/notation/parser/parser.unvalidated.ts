import { Provider } from 'ethers';
import { IArbitraryDataArtifact__factory } from '../../../../policy-contracts/src/typechain';
import { TranspilerOutput } from '../../../dsl';
import { nodeIdByNotation } from '../../../dsl/transformer';
import { InstanceConfig } from '../../../dsl/transpiler/state';
import {
  bytesEncodeArgs,
  DSLTypesToIRTypes,
  extractArguments,
  extractComponents,
  indexConstants,
  isConstant,
  strIsSubst,
  strIsVar,
} from '../helpers';
import { ParsingResult, Type } from './types';

// note: types dsl-inferred-first
export const parseIRByDSLTypesWithInterceptor = async (
  { ir, typings }: TranspilerOutput,
  middleware?: (
    artifactAddress: string,
    currentInstanceConfig: InstanceConfig,
  ) => Promise<void>,
) => {
  const res: ParsingResult[] = [];

  const artifacts = ir.trim().split(/\r?\n/);
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

    const currentInstanceConfig = typings[index];

    if (middleware) await middleware(artifactAddress, currentInstanceConfig);

    const execConstTypes = currentInstanceConfig.execArguments
      .filter((el) => el.constant)
      .map((el) => el.type);
    const initTypes = currentInstanceConfig.initArguments.map((el) => el.type);

    const partialExecData = indexConstants(
      parameters.filter((arg) => isConstant(arg.value)),
      execConstTypes.map(DSLTypesToIRTypes),
    );
    const initData = bytesEncodeArgs(
      initArgs,
      initTypes.map(DSLTypesToIRTypes),
    );

    res.push({
      id: nodeIdByNotation(artifact, index),
      artifactAddress,
      partialExecData,
      variables,
      argsCount: parameters.length,
      substitutions,
      initData,
      needsInitialization: initArgs.length != 0,
    });
  }

  return res;
};

// note: types onchain-inferred-first
export const parseIRByOnchainTypesWithInterceptor = async (
  { ir, typings }: TranspilerOutput,
  provider: Provider,
  middleware?: (
    artifactAddress: string,
    currentInstanceConfig: InstanceConfig,
  ) => Promise<void>,
) => {
  const res: ParsingResult[] = [];

  const artifacts = ir.trim().split(/\r?\n/);
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

    const currentInstanceConfig = typings[index];

    if (middleware) await middleware(artifactAddress, currentInstanceConfig);

    const instance = IArbitraryDataArtifact__factory.connect(
      artifactAddress,
      provider,
    );

    const { argsTypes } = await instance.getExecDescriptor();

    const { argsTypes: initArgsTypes } = await instance.getInitDescriptor();

    const partialExecData = indexConstants(
      parameters.filter((arg) => isConstant(arg.value)),
      <Type[]>argsTypes,
    );
    const initData = bytesEncodeArgs(initArgs, <Type[]>initArgsTypes);

    res.push({
      id: nodeIdByNotation(artifact, index),
      artifactAddress,
      partialExecData,
      variables,
      argsCount: parameters.length,
      substitutions,
      initData,
      needsInitialization: initArgs.length != 0,
    });
  }

  return res;
};
