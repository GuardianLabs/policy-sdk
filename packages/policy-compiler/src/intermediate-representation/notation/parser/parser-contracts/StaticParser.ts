import { ContractRunner } from 'ethers';
import { ParsingResult } from '../types';
import { ParserBase } from './base/ParserBase';
import { createOrInferTypesSource, toUnprocessedArtifactsList } from './tools';
import { IArgsTypesSource } from './types';

export class StaticParser {
  static process = async (
    intermediatePresentation: string,
    providerOrSource: ContractRunner | IArgsTypesSource,
  ): Promise<Array<ParsingResult>> => {
    const unprocessedArtifacts = toUnprocessedArtifactsList(
      intermediatePresentation,
    );

    const getTypesSource = createOrInferTypesSource(providerOrSource);

    const processPromises = unprocessedArtifacts.map((v, i) =>
      ParserBase.processSingleWithId(v, i, getTypesSource),
    );

    const processedArtifacts = await Promise.all(processPromises);
    return processedArtifacts;
  };
}
