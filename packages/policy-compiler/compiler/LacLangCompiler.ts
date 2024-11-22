import { LacLangCompilerOptions } from '.';
import { GraphInitParamsStruct } from '../../policy-contracts/src/typechain/contracts/ArtifactsGraph';
import { Transpiler, TranspilerOutput } from '../dsl';
import { ParsingResult } from '../ir';
import { ParserWithValidation } from '../ir/notation/parser/parser-contracts';
import { readFromFile } from './utils.helper';
import {
  validateFinalRepresentation,
  validateProviderIsSupplied,
} from './validations.helper';

export class LacLangCompiler {
  static fromFile = async (
    sourcesPath: string,
    options: LacLangCompilerOptions = {},
  ) => {
    const sources = await readFromFile(sourcesPath);
    return new LacLangCompiler(sources, options);
  };

  static fromSources = (
    sources: string,
    options: LacLangCompilerOptions = {},
  ) => {
    return new LacLangCompiler(sources, options);
  };

  constructor(
    private sources: string,
    private readonly options: LacLangCompilerOptions,
  ) {
    validateProviderIsSupplied(this.options);
  }

  compile = async (): Promise<GraphInitParamsStruct> => {
    return this.compileSources();
  };

  private compileSources = async (): Promise<GraphInitParamsStruct> => {
    const transpilerOutput = this.transpileDSL();
    const parserOutput =
      await this.parseIntermediateRepresentation(transpilerOutput);

    // note: actually is onchain representation
    const finalRepresentation: GraphInitParamsStruct = {
      rootNode: transpilerOutput.rootNode,
      nodes: parserOutput,
    };

    try {
      validateFinalRepresentation(finalRepresentation);
    } catch (finalRepresentationValidationError) {
      console.error(
        'Final-representation validation error during the compilation:',
      );
      throw finalRepresentationValidationError;
    }

    return finalRepresentation;
  };

  private transpileDSL = (): TranspilerOutput => {
    try {
      const transpilerOutput = Transpiler.create(this.sources)
        .transpile()
        .getFullIntermediateRepresentation();
      return transpilerOutput;
    } catch (transpilerError: unknown) {
      console.error('DSL transpiler error during compilation:');
      throw transpilerError;
    }
  };

  private parseIntermediateRepresentation = async (
    transpilerOutput: TranspilerOutput,
  ): Promise<Array<ParsingResult>> => {
    try {
      const parser = ParserWithValidation.fromCompilerConfiguration(
        this.options,
        transpilerOutput,
      );

      const parserOutput = await parser.process();
      return parserOutput;
    } catch (parserError: unknown) {
      console.error('IR parser error during compilation:');
      throw parserError;
    }
  };
}
