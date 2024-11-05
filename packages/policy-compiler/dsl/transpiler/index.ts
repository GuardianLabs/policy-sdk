import { CharStreams, CodePointCharStream, CommonTokenStream } from 'antlr4ts';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { LacLangLexer, LacLangParser, ProgramContext } from '../antlr';
import { IRTransformer } from '../transformer';
import { LacLangTranspiler } from './listener';

export class Transpiler {
  inputStream: CodePointCharStream;
  lexer: LacLangLexer;
  tokenStream: CommonTokenStream;
  parser: LacLangParser;
  tree: ProgramContext;
  listener: LacLangTranspiler;
  walker: ParseTreeWalker;

  constructor(public readonly sources: string) {
    this.inputStream = CharStreams.fromString(sources);
    this.lexer = new LacLangLexer(this.inputStream);
    this.tokenStream = new CommonTokenStream(this.lexer);
    this.parser = new LacLangParser(this.tokenStream);
    this.tree = this.parser.program();
    this.listener = new LacLangTranspiler();
    this.walker = new ParseTreeWalker();
  }

  transpile(): void {
    this.walker.walk(<ParseTreeListener>this.listener, this.tree);
  }

  getFullIR() {
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
}
