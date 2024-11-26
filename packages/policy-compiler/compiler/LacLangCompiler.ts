import { LacLangCompilerOptions } from '.';
import { GraphInitParamsStruct } from '../../policy-contracts/src/typechain/contracts/ArtifactsGraph';
import { Transpiler, TranspilerOutput } from '../dsl';
import { ParsingResult } from '../src';
import { ParserWithValidation } from '../src/intermediate-representation/notation/parser/parser-contracts';
import { readFromFile } from './utils.helper';
import {
  validateFinalRepresentation,
  validateProviderIsSupplied,
} from './validations.helper';

export class LacLangCompiler {
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

  compile = async (): Promise<GraphInitParamsStruct> => {
    return this.compileSources();
  };

  protected compileSources = async (): Promise<GraphInitParamsStruct> => {
    const transpilerOutput = this.transpileDSL();
    const parserOutput =
      await this.parseIntermediateRepresentation(transpilerOutput);

    // note: actually is onchain representation
    const finalRepresentation: GraphInitParamsStruct = {
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
