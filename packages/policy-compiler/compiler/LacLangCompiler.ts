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
  private sources!: string;
  private transpilerOutput?: TranspilerOutput;
  private parserOutput?: ParsingResult[];

  constructor(private readonly options: LacLangCompilerOptions = {}) {
    validateProviderIsSupplied(this.options);
  }

  compileFile = async (sourcesPath: string): Promise<GraphInitParamsStruct> => {
    this.sources = await readFromFile(sourcesPath);

    return this.compileSources();
  };

  private compileSources = async (): Promise<GraphInitParamsStruct> => {
    this.transpileDSL();

    await this.parseIntermediateRepresentation();

    // note: actually is onchain representation
    const finalRepresentation: GraphInitParamsStruct = {
      rootNode: this.transpilerOutput!.rootNode,
      nodes: this.parserOutput!,
    };

    try {
      validateFinalRepresentation(finalRepresentation);
    } catch (finalRepresentationValidationError: unknown) {
      console.error(
        'Finar representation validation error during compilation:',
      );
      throw finalRepresentationValidationError;
    }

    return finalRepresentation;
  };

  private transpileDSL = (): void => {
    try {
      const transpiler = new Transpiler(this.sources!);
      transpiler.transpile();

      this.transpilerOutput = transpiler.getFullIR();
    } catch (transpilerError: unknown) {
      console.error('DSL transpiler error during compilation:');
      throw transpilerError;
    }
  };

  private parseIntermediateRepresentation = async (): Promise<void> => {
    try {
      const parser = ParserWithValidation.fromCompilerConfiguration(
        this.options,
        this.transpilerOutput!,
      );

      this.parserOutput = await parser.process();
    } catch (parserError: unknown) {
      console.error('IR parser error during compilation:');
      throw parserError;
    }
  };
}
