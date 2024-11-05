import { TranspilerOutput } from '../../../dsl';
import { nodeIdByNotation } from '../../../dsl/transformer';
import { InstanceConfig } from '../../../dsl/transpiler/state';
import {
  bytesEncodeArgs,
  DSLTypesToIRTypes,
  extractArguments,
  extractComponents,
  indexConstants,
  strIsSubst,
  strIsVar,
} from '../helpers';
import { ParsingResult } from './types';

export const parseIRWithInterceptor = async (
  { ir, typings }: TranspilerOutput,
  middleware: (
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

    await middleware(artifactAddress, currentInstanceConfig);

    const execConstTypes = currentInstanceConfig.execArguments
      .filter((el) => el.constant)
      .map((el) => el.type);
    const initTypes = currentInstanceConfig.initArguments.map((el) => el.type);

    const partialExecData = indexConstants(
      parameters,
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
