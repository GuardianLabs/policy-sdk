import { ContractRunner } from 'ethers';
import { ParsingResult } from '../types';
import { ParserBase } from './base/ParserBase';
import { prepareGetDescriptors, toUnprocessedArtifactsList } from './tools';
import { IGetArgsTypes } from './types';

export class StaticParser {
  static process = async (
    ip: string,
    providerOrHandler: ContractRunner | IGetArgsTypes,
  ): Promise<Array<ParsingResult>> => {
    const unprocessedArtifacts = toUnprocessedArtifactsList(ip);

    const getDescriptors = prepareGetDescriptors(providerOrHandler);

    const processPromises = unprocessedArtifacts.map((v, i) =>
      ParserBase.processSingleWithId(v, i, getDescriptors),
    );

    const processedArtifacts = await Promise.all(processPromises);
    return processedArtifacts;
  };
}
