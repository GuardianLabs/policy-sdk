import { ParsingResult } from '../../types';
import { ParamsExtractor, nodeId } from '../tools';
import {
  GetDescriptors,
  NormalizedExecParameter,
  SubstitutingParameter,
} from '../types';

export class ParserBase {
  static processSingle = async (
    unprocessedArtifact: string,
    getDescriptors: GetDescriptors,
    pos?: number,
  ) => {
    // note: wrapper is kinda temporaty solution;
    // todo: re-design Parser class to support 'IGetArgsTypes' a bit smootherly
    const getDescriptorsAtIndex = (param: string) => getDescriptors(param, pos);

    const exctractionHandler = ParamsExtractor.build(
      unprocessedArtifact,
      getDescriptorsAtIndex,
    );

    const extractedData = await exctractionHandler.artifactData();

    const {
      artifactAddress,
      argsCount,
      execKnownParamsList,
      execRuntimeVariablesIndices,
      execSubstitutionParamsList,
      initDataParamsSolidityPacked,
      needsInitialization,
    } = extractedData;

    const processedArtifact: Omit<ParsingResult, 'id'> = {
      artifactAddress,
      partialExecData: execKnownParamsList,
      variables: execRuntimeVariablesIndices,
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
    getDescriptors: GetDescriptors,
  ): Promise<ParsingResult> => {
    const id = nodeId(unprocessedArtifact, salt);
    const processed = await this.processSingle(
      unprocessedArtifact,
      getDescriptors,
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
