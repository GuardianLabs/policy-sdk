import { ContractRunner } from 'ethers';
import { ParsingResult } from '../types';
import { ParserBase } from './base/ParserBase';
import { createOrInferTypesSource, toUnprocessedArtifactsList } from './tools';
import { GetTypesValues, IArgsTypesSource } from './types';

export class Parser {
  static build = (
    intermediatePresentation: string,
    providerOrSource: ContractRunner | IArgsTypesSource,
  ): Parser => {
    const getTypesSource = createOrInferTypesSource(providerOrSource);

    return new Parser(getTypesSource, intermediatePresentation);
  };

  // note: This expects String of intermediate-representation of artifacts and their relations.
  // The string value is validated in ParserBase, Extractor
  constructor(
    private getTypesSource: GetTypesValues,
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
      ParserBase.processSingleWithId(v, i, this.getTypesSource),
    );

    const processedArtifacts = await Promise.all(processPromises);
    return processedArtifacts;
  };
}
