import { ContractRunner } from 'ethers';
import { LacLangCompilerOptions as CompilerConfiguration } from '../../../../../compiler';
import { TranspilerOutput } from '../../../../../dsl';
import { InstanceConfig } from '../../../../../dsl/transpiler/state/types';
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
    const middleware = TypingsValidator(provider);

    const getTypesSource = createOrInferTypesSource(provider);

    return this.create(intermediatePresentation, getTypesSource, middleware);
  };

  static fromDSLBasedConfig = (
    intermediatePresentation: string,
    artifactConfigsList: Array<InstanceConfig>,
    provider?: ContractRunner,
  ) => {
    let middleware: ValidationMiddlware | undefined;
    if (!!provider) {
      middleware = TypingsValidator(provider);
    }

    const getTypesSource = DSLConfigArgsTypesSource.build(artifactConfigsList);

    return this.create(
      intermediatePresentation,
      getTypesSource.getTypes,
      middleware,
    );
  };

  static fromCompilerConfiguration = (
    config: CompilerConfiguration,
    {
      ir: intermediatePresentation,
      typings: artifactConfigsList,
    }: Pick<TranspilerOutput, 'ir' | 'typings'>,
  ): ParserWithValidation => {
    const {
      checkTypesAgainstDslDeclarations,
      checkTypesAgainstOnchainDescriptors,
      provider,
    } = config;
    const isProvider = !!provider;

    if (!!checkTypesAgainstDslDeclarations) {
      return this.fromDSLBasedConfig(
        intermediatePresentation,
        artifactConfigsList,
        provider,
      );
    }

    if (!!checkTypesAgainstOnchainDescriptors) {
      if (!isProvider) throw new Error(`Parser: provider not supplied`);

      return this.fromOnchainSource(intermediatePresentation, provider);
    }

    return this.fromDSLBasedConfig(
      intermediatePresentation,
      artifactConfigsList,
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
