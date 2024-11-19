import { promises as fs } from 'fs';
import { LacLangCompilerOptions } from '.';
import { GraphInitParamsStruct } from '../../policy-contracts/src/typechain/contracts/ArtifactsGraph';
import { Transpiler, TranspilerOutput } from '../dsl';
import { getIRParser, getIRParserUnvalidate, ParsingResult } from '../ir';
import { NoProviderError } from './errors';
import { validateFinalRepresentation } from './validations';

const defaultCompilerOptions: LacLangCompilerOptions = {};

export class Compiler {
  private transpiler?: Transpiler;
  private transpilerOutput?: TranspilerOutput;
  private parserOutput?: ParsingResult[];
  private sources?: string;

  constructor(
    private readonly options: LacLangCompilerOptions = defaultCompilerOptions,
  ) {
    if (
      (options.checkTypesAgainstDeclaration ||
        options.checkTypesAgainstOnchain) &&
      !options.provider
    ) {
      throw new NoProviderError();
    }
  }

  public async compileSources(sources: string): Promise<GraphInitParamsStruct> {
    this.sources = sources;

    this.transpileDSL();
    await this.parseIR();

    const finalRepresentation = {
      rootNode: this.transpilerOutput!.rootNode,
      nodes: this.parserOutput!,
    };

    try {
      validateFinalRepresentation(finalRepresentation);
    } catch (frValidationError: unknown) {
      console.error(
        'Finar representation validation error during compilation:',
      );
      throw frValidationError;
    }

    return finalRepresentation;
  }

  public async compileFile(sourcesPath: string) {
    const sources: string = await this._readTextFromFile(sourcesPath);

    return this.compileSources(sources);
  }

  private transpileDSL() {
    try {
      this.transpiler = new Transpiler(this.sources!);

      this.transpiler.transpile();
      this.transpilerOutput = this.transpiler.getFullIR();
    } catch (transpilerError: unknown) {
      console.error('DSL transpiler error during compilation:');
      throw transpilerError;
    }
  }

  private async parseIR() {
    try {
      let parser: (...args: any[]) => Promise<ParsingResult[]>;

      switch (true) {
        case this.options.checkTypesAgainstDeclaration:
          parser = getIRParser(this.transpilerOutput!, this.options.provider!)
            .validated.DSL_TYPING;
          break;
        case this.options.checkTypesAgainstOnchain:
          parser = getIRParser(this.transpilerOutput!, this.options.provider!)
            .validated.ONCHAIN_TYPING;
          break;
        default:
          parser = getIRParserUnvalidate(this.transpilerOutput!);
      }

      this.parserOutput = await parser();
    } catch (parserError: unknown) {
      console.error('IR parser error during compilation:');
      throw parserError;
    }
  }

  private async _readTextFromFile(filePath: string): Promise<string> {
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return fileContent;
    } catch (error) {
      console.error(`Error reading file at ${filePath}:`, error);
      throw error;
    }
  }
}
