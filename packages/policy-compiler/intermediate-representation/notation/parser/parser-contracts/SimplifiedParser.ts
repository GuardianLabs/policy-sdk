import { ContractRunner } from 'ethers';
import { ParsingResult } from '../types';
import { ParserBase } from './base/ParserBase';
import { createOrInferTypesSource, toUnprocessedArtifactsList } from './tools';
import { GetTypesValues, IArgsTypesSource } from './types';

export class SimplifiedParser {
  static build = (
    intermediatePresentation: string,
    providerOrSource: ContractRunner | IArgsTypesSource,
  ): SimplifiedParser => {
    const getTypesSource = createOrInferTypesSource(providerOrSource);

    return new SimplifiedParser(getTypesSource, intermediatePresentation);
  };

  // note: This expects String of intermediate-representation of artifacts and their relations.
  // The string value is validated in ParserBase, Extractor
  constructor(
    protected getTypesSource: GetTypesValues,
    protected intermediatePresentation: string,
  ) {}

  protected get unprocessedArtifacts(): Array<string> {
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
