import { ContractRunner } from 'ethers';
import { InstanceConfig } from '../../../../dsl/transpiler/state/types';
import { TypingsValidator } from '../parser.validated';
import { ValidationMiddlware } from '../types';
import { SimplifiedParser } from './SimplifiedParser';
import { DSLConfigArgsTypesSource, createOrInferTypesSource } from './tools';
import { GetTypesValues } from './types';

export class ParserWithValidation extends SimplifiedParser {
  static fromOnchainSource = (
    intermediatePresentation: string,
    provider: ContractRunner,
  ): ParserWithValidation => {
    let middleware: ValidationMiddlware | undefined;
    if (!!provider) {
      middleware = TypingsValidator(provider);
    }

    const getTypesSource = createOrInferTypesSource(provider);

    return this.create(intermediatePresentation, getTypesSource, middleware);
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

    return this.create(
      intermediatePresentation,
      getTypesSource.getTypes,
      middleware,
    );
  };

  static create = (
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
    getTypesSource: GetTypesValues,
    intermediatePresentation: string,
    private middleware?: ValidationMiddlware,
  ) {
    super(getTypesSource, intermediatePresentation);
  }
}
