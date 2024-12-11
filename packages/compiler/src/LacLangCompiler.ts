import { Transpiler } from '@guardian-network/policy-dsl/src';
import { ParserWithValidation } from '@guardian-network/policy-intermediate-representation/src';
import {
  ICompiler,
  LacLangCompilerOptions,
} from '@guardian-network/shared/src/types/compiler.types';
import {
  OnchainPresentation,
  NodeTreeInitData as ParsingResult,
} from '@guardian-network/shared/src/types/contracts.types';
import { TranspilerOutput } from '@guardian-network/shared/src/types/dsl.types';
import { readFromFile } from './utils.helper';
import {
  validateFinalRepresentation,
  validateProviderIsSupplied,
} from './validations.helper';

export class LacLangCompiler implements ICompiler {
  protected static build<R>(
    this: new (sources: string, options: LacLangCompilerOptions) => R,
    sources: string,
    options: LacLangCompilerOptions = {},
  ): R {
    return new this(sources, options);
  }

  static async fromFile<R>(
    this: new (sources: string, options: LacLangCompilerOptions) => R,
    sourcesPath: string,
    options: LacLangCompilerOptions = {},
  ): Promise<R> {
    const sources = await readFromFile(sourcesPath);
    return new this(sources, options);
  }

  static fromSources<R>(
    this: new (sources: string, options: LacLangCompilerOptions) => R,
    sources: string,
    options: LacLangCompilerOptions = {},
  ): R {
    return new this(sources, options);
  }

  constructor(
    protected sources: string,
    protected readonly options: LacLangCompilerOptions,
  ) {
    validateProviderIsSupplied(this.options);
  }

  compile = async (): Promise<OnchainPresentation> => {
    return this.compileSources();
  };

  protected compileSources = async (): Promise<OnchainPresentation> => {
    const transpilerOutput = this.transpileDSL();
    const parserOutput =
      await this.parseIntermediateRepresentation(transpilerOutput);

    // note: actually is onchain representation
    const finalRepresentation: OnchainPresentation = {
      rootNode: transpilerOutput.rootNode,
      nodes: parserOutput,
    };

    validateFinalRepresentation(finalRepresentation);
    return finalRepresentation;
  };

  protected transpileDSL = (): TranspilerOutput => {
    const transpilerOutput = Transpiler.create(this.sources)
      .transpile()
      .toIntermediateRepresentation();
    return transpilerOutput;
  };

  protected parseIntermediateRepresentation = async (
    transpilerOutput: TranspilerOutput,
  ): Promise<Array<ParsingResult>> => {
    const parser = ParserWithValidation.fromCompilerConfiguration(
      this.options,
      transpilerOutput,
    );

    const parserOutput = await parser.process();
    return parserOutput;
  };
}
