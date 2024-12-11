import { TranspilerOutput } from '@guardian-network/shared/src/types/dsl.types';
import { CharStreams, CodePointCharStream, CommonTokenStream } from 'antlr4ts';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { LacLangLexer, LacLangParser, ProgramContext } from '../antlr';
import { IRTransformer } from '../ir-generation';
import { TranspilerConfig } from './helpers';
import { LacLangTranspiler } from './listener';
import { LatentState } from './state';

export class Transpiler {
  protected tree: ProgramContext;
  protected listener: LacLangTranspiler;
  protected walker: ParseTreeWalker;

  // are those needed within state???
  /* protected inputStream: CodePointCharStream;
  protected lexer: LacLangLexer;
  protected tokenStream: CommonTokenStream;
  protected parser: LacLangParser; */

  static create = (sources: string, options: TranspilerConfig) => {
    return new Transpiler(sources, options);
  };

  constructor(sources: string, options: TranspilerConfig) {
    const inputStream: CodePointCharStream = CharStreams.fromString(sources);
    const lexer = new LacLangLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new LacLangParser(tokenStream);

    this.tree = parser.program();
    this.listener = new LacLangTranspiler(options);
    this.walker = new ParseTreeWalker();
  }

  transpile() {
    this.walker.walk(<ParseTreeListener>this.listener, this.tree);
    return this;
  }

  toIntermediateRepresentation(): TranspilerOutput {
    const { definitions, rootNode, typings } = IRTransformer.buildFullIR(
      this.listener.latentState,
    );
    const ir = definitions.join('\r\n');

    return {
      ir,
      rootNode,
      typings,
    };
  }

  getLatentState(): LatentState {
    return this.listener.latentState;
  }
}
