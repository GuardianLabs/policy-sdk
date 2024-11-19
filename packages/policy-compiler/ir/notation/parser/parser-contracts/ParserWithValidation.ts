import { ContractRunner } from 'ethers';
import { InstanceConfig } from '../../../../dsl/transpiler/state/types';
import { TypingsValidator } from '../parser.validated';
import { ParsingResult, ValidationMiddlware } from '../types';
import { ParserBase } from './base/ParserBase';
import {
  DSLConfigArgsTypesSource,
  createOrInferTypesSource,
  toUnprocessedArtifactsList,
} from './tools';
import { GetTypesValues } from './types';

export class ParserWithValidation {
  static fromOnchainSource = (
    intermediatePresentation: string,
    provider: ContractRunner,
  ): ParserWithValidation => {
    let middleware: ValidationMiddlware | undefined;
    if (!!provider) {
      middleware = TypingsValidator(provider);
    }

    const getTypesSource = createOrInferTypesSource(provider);

    return this.build(intermediatePresentation, getTypesSource, middleware);
  };

  static fromDSLBasedConfig = (
    intermediatePresentation: string,
    ipArtifactInstanceConfig: Array<InstanceConfig>,
    provider?: ContractRunner,
  ) => {
    let middleware: ValidationMiddlware | undefined;
    if (!!provider) {
      middleware = TypingsValidator(provider);
    }

    const getTypesSource = DSLConfigArgsTypesSource.build(
      ipArtifactInstanceConfig,
    );

    return this.build(
      intermediatePresentation,
      getTypesSource.getTypes,
      middleware,
    );
  };

  static build = (
    intermediatePresentation: string,
    getTypesSource: GetTypesValues,
    middleware?: ValidationMiddlware,
  ): ParserWithValidation => {
    return new ParserWithValidation(
      getTypesSource,
      intermediatePresentation,
      middleware,
    );
  };

  // note: This expects String of intermediate-representation of artifacts and their relations.
  // The string value is validated in ParserBase, Extractor
  constructor(
    private getTypesSource: GetTypesValues,
    private intermediatePresentation: string,
    private middleware?: ValidationMiddlware,
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
