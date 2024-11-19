import { ContractRunner } from 'ethers';
import { ParsingResult } from '../types';
import { ParserBase } from './base/ParserBase';
import { prepareGetDescriptors, toUnprocessedArtifactsList } from './tools';
import { GetDescriptors, IGetArgsTypes } from './types';

export class Parser {
  static build = (
    intermediatePresentation: string,
    providerOrHandler: ContractRunner | IGetArgsTypes,
  ): Parser => {
    const getDescrpiptors = prepareGetDescriptors(providerOrHandler);

    return new Parser(getDescrpiptors, intermediatePresentation);
  };

  // note: This expects String of intermediate-representation of artifacts and their relations.
  // The string value is validated in ParserBase, Extractor
  constructor(
    private getDescriptors: GetDescriptors,
    private intermediatePresentation: string,
  ) {}

  private get unprocessedArtifacts(): Array<string> {
    return toUnprocessedArtifactsList(this.intermediatePresentation);
  }

  // note:
  // a. When processed it basically returns a List of 'TreeNodeInitParamsStruct' matching
  // the interface requirements of onchain artifacts declaration
  // b. Each List entry includes the values of [constants-data], [substitutions-data], [init-data], [runtime-supplied-params-indices]
  // and other related data of Artifact.
  process = async (): Promise<Array<ParsingResult>> => {
    const processPromises = this.unprocessedArtifacts.map((v, i) =>
      ParserBase.processSingleWithId(v, i, this.getDescriptors),
    );

    const processedArtifacts = await Promise.all(processPromises);
    return processedArtifacts;
  };
}
