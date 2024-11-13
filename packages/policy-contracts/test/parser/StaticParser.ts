import { ContractRunner } from 'ethers';
import { TreeNodeInitParamsStruct } from '../types';
import { ParserBase } from './base/ParserBase';
import { prepareGetDescriptors, toUnprocessedArtifactsList } from './tools';
import { IOnchainHandler } from './types';

export class StaticParser {
  static process = async (
    ip: string,
    providerOrHandler: ContractRunner | IOnchainHandler,
  ): Promise<Array<TreeNodeInitParamsStruct>> => {
    const unprocessedArtifacts = toUnprocessedArtifactsList(ip);

    const getDescriptors = prepareGetDescriptors(providerOrHandler);

    const processPromises = unprocessedArtifacts.map((v, i) =>
      ParserBase.processSingleWithId(v, i, getDescriptors),
    );

    const processedArtifacts = await Promise.all(processPromises);
    return processedArtifacts;
  };
}
