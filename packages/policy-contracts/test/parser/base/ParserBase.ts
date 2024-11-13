import { TreeNodeInitParamsStruct } from '../../types';
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
  ) => {
    const exctractionHandler = ParamsExtractor.build(
      unprocessedArtifact,
      getDescriptors,
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

    const processedArtifact: Omit<TreeNodeInitParamsStruct, 'id'> = {
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
  ): Promise<TreeNodeInitParamsStruct> => {
    const id = nodeId(unprocessedArtifact, salt);
    const processed = await this.processSingle(
      unprocessedArtifact,
      getDescriptors,
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
