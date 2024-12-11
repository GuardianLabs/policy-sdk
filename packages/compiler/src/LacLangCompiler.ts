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
import { dirname } from 'path';
import { cwd } from 'process';
import { readFromFile } from './utils.helper';
import {
  validateFinalRepresentation,
  validateProviderIsSupplied,
} from './validations.helper';

export class LacLangCompiler implements ICompiler {
  protected static build<R>(
    this: new (
      sources: string,
      options: LacLangCompilerOptions,
      _cwd: string,
    ) => R,
    sources: string,
    options: LacLangCompilerOptions = {},
  ): R {
    return new this(sources, options, cwd());
  }

  static async fromFile<R>(
    this: new (
      sources: string,
      options: LacLangCompilerOptions,
      _cwd: string,
    ) => R,
    sourcesPath: string,
    options: LacLangCompilerOptions = {},
  ): Promise<R> {
    const sources = await readFromFile(sourcesPath);
    return new this(sources, options, dirname(sourcesPath));
  }

  static fromSources<R>(
    this: new (
      sources: string,
      options: LacLangCompilerOptions,
      _cwd: string,
    ) => R,
    sources: string,
    options: LacLangCompilerOptions = {},
  ): R {
    return new this(sources, options, cwd());
  }

  constructor(
    protected sources: string,
    protected readonly options: LacLangCompilerOptions,
    protected readonly _cwd: string,
  ) {
    validateProviderIsSupplied(this.options);
  }

  compile = async (): Promise<OnchainPresentation> => {
    return this.compileSources();
  };

  protected compileSources = async (): Promise<OnchainPresentation> => {
    const transpilerOutput = this.transpileDSL(this._cwd);
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

  protected transpileDSL = (cwd: string): TranspilerOutput => {
    const transpilerOutput = Transpiler.create(this.sources, {
      partialSources: false,
      sourcesDir: cwd,
    })
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
