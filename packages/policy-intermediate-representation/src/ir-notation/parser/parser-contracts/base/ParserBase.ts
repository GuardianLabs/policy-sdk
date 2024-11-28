import { ParsingResult } from '../../types';
import { ParamsExtractor, nodeId } from '../tools';
import {
  GetTypesValues,
  NormalizedExecParameter,
  SubstitutingParameter,
} from '../types';

export class ParserBase {
  static processSingle = async (
    unprocessedArtifact: string,
    getTypesSource: GetTypesValues,
    pos?: number,
  ) => {
    // note: wrapper is kinda temporaty solution;
    // todo: re-design Parser class to support 'IGetArgsTypes' a bit smootherly
    const getTypesSourceAtIndex = (param: string) => getTypesSource(param, pos);

    const exctractionHandler = ParamsExtractor.build(
      unprocessedArtifact,
      getTypesSourceAtIndex,
    );

    const extractedData = await exctractionHandler.artifactData();

    const {
      artifactAddress,
      argsCount,
      execKnownParamsList,
      execRuntimeVariablesIndices,
      execRuntimeVariablesInjectionsWithIndices,
      execSubstitutionParamsList,
      initDataParamsSolidityPacked,
      needsInitialization,
    } = extractedData;

    const processedArtifact: Omit<ParsingResult, 'id'> = {
      artifactAddress,
      partialExecData: execKnownParamsList,
      variables: execRuntimeVariablesIndices,
      injections: execRuntimeVariablesInjectionsWithIndices,
      argsCount,
      substitutions: execSubstitutionParamsList.map(toRegularParam),
      initData: initDataParamsSolidityPacked,
      needsInitialization,
    };

    return processedArtifact;
  };

  static processSingleWithId = async (
    unprocessedArtifact: string,
    salt: number,
    getTypesSource: GetTypesValues,
  ): Promise<ParsingResult> => {
    const id = nodeId(unprocessedArtifact, salt);
    const processed = await this.processSingle(
      unprocessedArtifact,
      getTypesSource,
      salt,
    );

    return {
      id,
      ...processed,
    };
  };
}

const toRegularParam = ({
  from,
  atPos,
}: SubstitutingParameter): NormalizedExecParameter => {
  return {
    value: from,
    index: atPos,
  };
};
