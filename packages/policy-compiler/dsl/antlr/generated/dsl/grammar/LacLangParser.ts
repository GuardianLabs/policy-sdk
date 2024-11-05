// Generated from ./dsl/grammar/LacLang.g4 by ANTLR 4.9.0-SNAPSHOT

import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { RecognitionException } from 'antlr4ts/RecognitionException';
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { Token } from 'antlr4ts/Token';
import { TokenStream } from 'antlr4ts/TokenStream';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

import { LacLangListener } from './LacLangListener';

export class LacLangParser extends Parser {
  public static readonly T__0 = 1;
  public static readonly T__1 = 2;
  public static readonly T__2 = 3;
  public static readonly T__3 = 4;
  public static readonly T__4 = 5;
  public static readonly T__5 = 6;
  public static readonly T__6 = 7;
  public static readonly T__7 = 8;
  public static readonly T__8 = 9;
  public static readonly T__9 = 10;
  public static readonly T__10 = 11;
  public static readonly T__11 = 12;
  public static readonly T__12 = 13;
  public static readonly T__13 = 14;
  public static readonly T__14 = 15;
  public static readonly T__15 = 16;
  public static readonly T__16 = 17;
  public static readonly T__17 = 18;
  public static readonly ADDRESS_LITERAL = 19;
  public static readonly BOOL_LITERAL = 20;
  public static readonly NUMBER_LITERAL = 21;
  public static readonly STRING_LITERAL = 22;
  public static readonly BYTES_LITERAL = 23;
  public static readonly IDENTIFIER = 24;
  public static readonly WHITESPACE = 25;
  public static readonly COMMENT = 26;
  public static readonly RULE_program = 0;
  public static readonly RULE_statement = 1;
  public static readonly RULE_varDeclaration = 2;
  public static readonly RULE_constantDeclaration = 3;
  public static readonly RULE_artifactDeclaration = 4;
  public static readonly RULE_instanceDeclaration = 5;
  public static readonly RULE_evaluateStatement = 6;
  public static readonly RULE_dataType = 7;
  public static readonly RULE_constantsList = 8;
  public static readonly RULE_argumentsList = 9;
  public static readonly RULE_identifier_or_literal = 10;
  public static readonly RULE_literal = 11;
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'program',
    'statement',
    'varDeclaration',
    'constantDeclaration',
    'artifactDeclaration',
    'instanceDeclaration',
    'evaluateStatement',
    'dataType',
    'constantsList',
    'argumentsList',
    'identifier_or_literal',
    'literal',
  ];

  private static readonly _LITERAL_NAMES: Array<string | undefined> = [
    undefined,
    "'var'",
    "';'",
    "'constant'",
    "'='",
    "'artifact'",
    "'instance'",
    "'of'",
    "'takes'",
    "'('",
    "')'",
    "'with'",
    "'evaluate'",
    "'bool'",
    "'number'",
    "'string'",
    "'bytes'",
    "'address'",
    "','",
  ];
  private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'ADDRESS_LITERAL',
    'BOOL_LITERAL',
    'NUMBER_LITERAL',
    'STRING_LITERAL',
    'BYTES_LITERAL',
    'IDENTIFIER',
    'WHITESPACE',
    'COMMENT',
  ];
  public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(
    LacLangParser._LITERAL_NAMES,
    LacLangParser._SYMBOLIC_NAMES,
    [],
  );

  // @Override
  // @NotNull
  public get vocabulary(): Vocabulary {
    return LacLangParser.VOCABULARY;
  }
  // tslint:enable:no-trailing-whitespace

  // @Override
  public get grammarFileName(): string {
    return 'LacLang.g4';
  }

  // @Override
  public get ruleNames(): string[] {
    return LacLangParser.ruleNames;
  }

  // @Override
  public get serializedATN(): string {
    return LacLangParser._serializedATN;
  }

  protected createFailedPredicateException(
    predicate?: string,
    message?: string,
  ): FailedPredicateException {
    return new FailedPredicateException(this, predicate, message);
  }

  constructor(input: TokenStream) {
    super(input);
    this._interp = new ParserATNSimulator(LacLangParser._ATN, this);
  }
  // @RuleVersion(0)
  public program(): ProgramContext {
    let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
    this.enterRule(_localctx, 0, LacLangParser.RULE_program);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 27;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          (_la & ~0x1f) === 0 &&
          ((1 << _la) &
            ((1 << LacLangParser.T__0) |
              (1 << LacLangParser.T__2) |
              (1 << LacLangParser.T__4) |
              (1 << LacLangParser.T__5) |
              (1 << LacLangParser.T__11))) !==
            0
        ) {
          {
            {
              this.state = 24;
              this.statement();
            }
          }
          this.state = 29;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 30;
        this.match(LacLangParser.EOF);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public statement(): StatementContext {
    let _localctx: StatementContext = new StatementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 2, LacLangParser.RULE_statement);
    try {
      this.state = 37;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case LacLangParser.T__0:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 32;
            this.varDeclaration();
          }
          break;
        case LacLangParser.T__2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 33;
            this.constantDeclaration();
          }
          break;
        case LacLangParser.T__4:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 34;
            this.artifactDeclaration();
          }
          break;
        case LacLangParser.T__5:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 35;
            this.instanceDeclaration();
          }
          break;
        case LacLangParser.T__11:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 36;
            this.evaluateStatement();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public varDeclaration(): VarDeclarationContext {
    let _localctx: VarDeclarationContext = new VarDeclarationContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 4, LacLangParser.RULE_varDeclaration);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 39;
        this.match(LacLangParser.T__0);
        this.state = 40;
        this.dataType();
        this.state = 41;
        this.match(LacLangParser.IDENTIFIER);
        this.state = 42;
        this.match(LacLangParser.T__1);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public constantDeclaration(): ConstantDeclarationContext {
    let _localctx: ConstantDeclarationContext = new ConstantDeclarationContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 6, LacLangParser.RULE_constantDeclaration);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 44;
        this.match(LacLangParser.T__2);
        this.state = 45;
        this.dataType();
        this.state = 46;
        this.match(LacLangParser.IDENTIFIER);
        this.state = 47;
        this.match(LacLangParser.T__3);
        this.state = 48;
        this.literal();
        this.state = 49;
        this.match(LacLangParser.T__1);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public artifactDeclaration(): ArtifactDeclarationContext {
    let _localctx: ArtifactDeclarationContext = new ArtifactDeclarationContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 8, LacLangParser.RULE_artifactDeclaration);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 51;
        this.match(LacLangParser.T__4);
        this.state = 52;
        this.match(LacLangParser.IDENTIFIER);
        this.state = 53;
        this.match(LacLangParser.T__3);
        this.state = 54;
        this.match(LacLangParser.ADDRESS_LITERAL);
        this.state = 55;
        this.match(LacLangParser.T__1);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public instanceDeclaration(): InstanceDeclarationContext {
    let _localctx: InstanceDeclarationContext = new InstanceDeclarationContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 10, LacLangParser.RULE_instanceDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 57;
        this.match(LacLangParser.T__5);
        this.state = 58;
        this.dataType();
        this.state = 59;
        this.match(LacLangParser.IDENTIFIER);
        this.state = 60;
        this.match(LacLangParser.T__6);
        this.state = 61;
        this.identifier_or_literal();
        this.state = 62;
        this.match(LacLangParser.T__7);
        this.state = 63;
        this.match(LacLangParser.T__8);
        this.state = 65;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (_la & ~0x1f) === 0 &&
          ((1 << _la) &
            ((1 << LacLangParser.ADDRESS_LITERAL) |
              (1 << LacLangParser.BOOL_LITERAL) |
              (1 << LacLangParser.NUMBER_LITERAL) |
              (1 << LacLangParser.STRING_LITERAL) |
              (1 << LacLangParser.BYTES_LITERAL) |
              (1 << LacLangParser.IDENTIFIER))) !==
            0
        ) {
          {
            this.state = 64;
            this.argumentsList();
          }
        }

        this.state = 67;
        this.match(LacLangParser.T__9);
        this.state = 74;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === LacLangParser.T__10) {
          {
            this.state = 68;
            this.match(LacLangParser.T__10);
            this.state = 69;
            this.match(LacLangParser.T__8);
            this.state = 71;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              (_la & ~0x1f) === 0 &&
              ((1 << _la) &
                ((1 << LacLangParser.ADDRESS_LITERAL) |
                  (1 << LacLangParser.BOOL_LITERAL) |
                  (1 << LacLangParser.NUMBER_LITERAL) |
                  (1 << LacLangParser.STRING_LITERAL) |
                  (1 << LacLangParser.BYTES_LITERAL) |
                  (1 << LacLangParser.IDENTIFIER))) !==
                0
            ) {
              {
                this.state = 70;
                this.constantsList();
              }
            }

            this.state = 73;
            this.match(LacLangParser.T__9);
          }
        }

        this.state = 76;
        this.match(LacLangParser.T__1);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public evaluateStatement(): EvaluateStatementContext {
    let _localctx: EvaluateStatementContext = new EvaluateStatementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 12, LacLangParser.RULE_evaluateStatement);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 78;
        this.match(LacLangParser.T__11);
        this.state = 79;
        this.match(LacLangParser.IDENTIFIER);
        this.state = 80;
        this.match(LacLangParser.T__1);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public dataType(): DataTypeContext {
    let _localctx: DataTypeContext = new DataTypeContext(this._ctx, this.state);
    this.enterRule(_localctx, 14, LacLangParser.RULE_dataType);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 82;
        _la = this._input.LA(1);
        if (
          !(
            (_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << LacLangParser.T__12) |
                (1 << LacLangParser.T__13) |
                (1 << LacLangParser.T__14) |
                (1 << LacLangParser.T__15) |
                (1 << LacLangParser.T__16))) !==
              0
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public constantsList(): ConstantsListContext {
    let _localctx: ConstantsListContext = new ConstantsListContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 16, LacLangParser.RULE_constantsList);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 84;
        this.argumentsList();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public argumentsList(): ArgumentsListContext {
    let _localctx: ArgumentsListContext = new ArgumentsListContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 18, LacLangParser.RULE_argumentsList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 86;
        this.identifier_or_literal();
        this.state = 91;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === LacLangParser.T__17) {
          {
            {
              this.state = 87;
              this.match(LacLangParser.T__17);
              this.state = 88;
              this.identifier_or_literal();
            }
          }
          this.state = 93;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public identifier_or_literal(): Identifier_or_literalContext {
    let _localctx: Identifier_or_literalContext =
      new Identifier_or_literalContext(this._ctx, this.state);
    this.enterRule(_localctx, 20, LacLangParser.RULE_identifier_or_literal);
    try {
      this.state = 96;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case LacLangParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 94;
            this.match(LacLangParser.IDENTIFIER);
          }
          break;
        case LacLangParser.ADDRESS_LITERAL:
        case LacLangParser.BOOL_LITERAL:
        case LacLangParser.NUMBER_LITERAL:
        case LacLangParser.STRING_LITERAL:
        case LacLangParser.BYTES_LITERAL:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 95;
            this.literal();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public literal(): LiteralContext {
    let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
    this.enterRule(_localctx, 22, LacLangParser.RULE_literal);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 98;
        _la = this._input.LA(1);
        if (
          !(
            (_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << LacLangParser.ADDRESS_LITERAL) |
                (1 << LacLangParser.BOOL_LITERAL) |
                (1 << LacLangParser.NUMBER_LITERAL) |
                (1 << LacLangParser.STRING_LITERAL) |
                (1 << LacLangParser.BYTES_LITERAL))) !==
              0
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  public static readonly _serializedATN: string =
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x1Cg\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x03' +
    '\x02\x07\x02\x1C\n\x02\f\x02\x0E\x02\x1F\v\x02\x03\x02\x03\x02\x03\x03' +
    '\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03(\n\x03\x03\x04\x03\x04\x03\x04' +
    '\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05' +
    '\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07' +
    '\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x05\x07D\n\x07\x03\x07\x03\x07' +
    '\x03\x07\x03\x07\x05\x07J\n\x07\x03\x07\x05\x07M\n\x07\x03\x07\x03\x07' +
    '\x03\b\x03\b\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\v\x03\v\x03\v\x07' +
    '\v\\\n\v\f\v\x0E\v_\v\v\x03\f\x03\f\x05\fc\n\f\x03\r\x03\r\x03\r\x02\x02' +
    '\x02\x0E\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12' +
    '\x02\x14\x02\x16\x02\x18\x02\x02\x04\x03\x02\x0F\x13\x03\x02\x15\x19\x02' +
    "d\x02\x1D\x03\x02\x02\x02\x04'\x03\x02\x02\x02\x06)\x03\x02\x02\x02\b" +
    '.\x03\x02\x02\x02\n5\x03\x02\x02\x02\f;\x03\x02\x02\x02\x0EP\x03\x02\x02' +
    '\x02\x10T\x03\x02\x02\x02\x12V\x03\x02\x02\x02\x14X\x03\x02\x02\x02\x16' +
    'b\x03\x02\x02\x02\x18d\x03\x02\x02\x02\x1A\x1C\x05\x04\x03\x02\x1B\x1A' +
    '\x03\x02\x02\x02\x1C\x1F\x03\x02\x02\x02\x1D\x1B\x03\x02\x02\x02\x1D\x1E' +
    '\x03\x02\x02\x02\x1E \x03\x02\x02\x02\x1F\x1D\x03\x02\x02\x02 !\x07\x02' +
    '\x02\x03!\x03\x03\x02\x02\x02"(\x05\x06\x04\x02#(\x05\b\x05\x02$(\x05' +
    "\n\x06\x02%(\x05\f\x07\x02&(\x05\x0E\b\x02'\"\x03\x02\x02\x02'#\x03" +
    "\x02\x02\x02'$\x03\x02\x02\x02'%\x03\x02\x02\x02'&\x03\x02\x02\x02" +
    '(\x05\x03\x02\x02\x02)*\x07\x03\x02\x02*+\x05\x10\t\x02+,\x07\x1A\x02' +
    '\x02,-\x07\x04\x02\x02-\x07\x03\x02\x02\x02./\x07\x05\x02\x02/0\x05\x10' +
    '\t\x0201\x07\x1A\x02\x0212\x07\x06\x02\x0223\x05\x18\r\x0234\x07\x04\x02' +
    '\x024\t\x03\x02\x02\x0256\x07\x07\x02\x0267\x07\x1A\x02\x0278\x07\x06' +
    '\x02\x0289\x07\x15\x02\x029:\x07\x04\x02\x02:\v\x03\x02\x02\x02;<\x07' +
    '\b\x02\x02<=\x05\x10\t\x02=>\x07\x1A\x02\x02>?\x07\t\x02\x02?@\x05\x16' +
    '\f\x02@A\x07\n\x02\x02AC\x07\v\x02\x02BD\x05\x14\v\x02CB\x03\x02\x02\x02' +
    'CD\x03\x02\x02\x02DE\x03\x02\x02\x02EL\x07\f\x02\x02FG\x07\r\x02\x02G' +
    'I\x07\v\x02\x02HJ\x05\x12\n\x02IH\x03\x02\x02\x02IJ\x03\x02\x02\x02JK' +
    '\x03\x02\x02\x02KM\x07\f\x02\x02LF\x03\x02\x02\x02LM\x03\x02\x02\x02M' +
    'N\x03\x02\x02\x02NO\x07\x04\x02\x02O\r\x03\x02\x02\x02PQ\x07\x0E\x02\x02' +
    'QR\x07\x1A\x02\x02RS\x07\x04\x02\x02S\x0F\x03\x02\x02\x02TU\t\x02\x02' +
    '\x02U\x11\x03\x02\x02\x02VW\x05\x14\v\x02W\x13\x03\x02\x02\x02X]\x05\x16' +
    '\f\x02YZ\x07\x14\x02\x02Z\\\x05\x16\f\x02[Y\x03\x02\x02\x02\\_\x03\x02' +
    '\x02\x02][\x03\x02\x02\x02]^\x03\x02\x02\x02^\x15\x03\x02\x02\x02_]\x03' +
    '\x02\x02\x02`c\x07\x1A\x02\x02ac\x05\x18\r\x02b`\x03\x02\x02\x02ba\x03' +
    '\x02\x02\x02c\x17\x03\x02\x02\x02de\t\x03\x02\x02e\x19\x03\x02\x02\x02' +
    "\t\x1D'CIL]b";
  public static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!LacLangParser.__ATN) {
      LacLangParser.__ATN = new ATNDeserializer().deserialize(
        Utils.toCharArray(LacLangParser._serializedATN),
      );
    }

    return LacLangParser.__ATN;
  }
}

export class ProgramContext extends ParserRuleContext {
  public EOF(): TerminalNode {
    return this.getToken(LacLangParser.EOF, 0);
  }
  public statement(): StatementContext[];
  public statement(i: number): StatementContext;
  public statement(i?: number): StatementContext | StatementContext[] {
    if (i === undefined) {
      return this.getRuleContexts(StatementContext);
    } else {
      return this.getRuleContext(i, StatementContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_program;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterProgram) {
      listener.enterProgram(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitProgram) {
      listener.exitProgram(this);
    }
  }
}

export class StatementContext extends ParserRuleContext {
  public varDeclaration(): VarDeclarationContext | undefined {
    return this.tryGetRuleContext(0, VarDeclarationContext);
  }
  public constantDeclaration(): ConstantDeclarationContext | undefined {
    return this.tryGetRuleContext(0, ConstantDeclarationContext);
  }
  public artifactDeclaration(): ArtifactDeclarationContext | undefined {
    return this.tryGetRuleContext(0, ArtifactDeclarationContext);
  }
  public instanceDeclaration(): InstanceDeclarationContext | undefined {
    return this.tryGetRuleContext(0, InstanceDeclarationContext);
  }
  public evaluateStatement(): EvaluateStatementContext | undefined {
    return this.tryGetRuleContext(0, EvaluateStatementContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_statement;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterStatement) {
      listener.enterStatement(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitStatement) {
      listener.exitStatement(this);
    }
  }
}

export class VarDeclarationContext extends ParserRuleContext {
  public dataType(): DataTypeContext {
    return this.getRuleContext(0, DataTypeContext);
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(LacLangParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_varDeclaration;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterVarDeclaration) {
      listener.enterVarDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitVarDeclaration) {
      listener.exitVarDeclaration(this);
    }
  }
}

export class ConstantDeclarationContext extends ParserRuleContext {
  public dataType(): DataTypeContext {
    return this.getRuleContext(0, DataTypeContext);
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(LacLangParser.IDENTIFIER, 0);
  }
  public literal(): LiteralContext {
    return this.getRuleContext(0, LiteralContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_constantDeclaration;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterConstantDeclaration) {
      listener.enterConstantDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitConstantDeclaration) {
      listener.exitConstantDeclaration(this);
    }
  }
}

export class ArtifactDeclarationContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(LacLangParser.IDENTIFIER, 0);
  }
  public ADDRESS_LITERAL(): TerminalNode {
    return this.getToken(LacLangParser.ADDRESS_LITERAL, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_artifactDeclaration;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterArtifactDeclaration) {
      listener.enterArtifactDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitArtifactDeclaration) {
      listener.exitArtifactDeclaration(this);
    }
  }
}

export class InstanceDeclarationContext extends ParserRuleContext {
  public dataType(): DataTypeContext {
    return this.getRuleContext(0, DataTypeContext);
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(LacLangParser.IDENTIFIER, 0);
  }
  public identifier_or_literal(): Identifier_or_literalContext {
    return this.getRuleContext(0, Identifier_or_literalContext);
  }
  public argumentsList(): ArgumentsListContext | undefined {
    return this.tryGetRuleContext(0, ArgumentsListContext);
  }
  public constantsList(): ConstantsListContext | undefined {
    return this.tryGetRuleContext(0, ConstantsListContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_instanceDeclaration;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterInstanceDeclaration) {
      listener.enterInstanceDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitInstanceDeclaration) {
      listener.exitInstanceDeclaration(this);
    }
  }
}

export class EvaluateStatementContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(LacLangParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_evaluateStatement;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterEvaluateStatement) {
      listener.enterEvaluateStatement(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitEvaluateStatement) {
      listener.exitEvaluateStatement(this);
    }
  }
}

export class DataTypeContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_dataType;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterDataType) {
      listener.enterDataType(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitDataType) {
      listener.exitDataType(this);
    }
  }
}

export class ConstantsListContext extends ParserRuleContext {
  public argumentsList(): ArgumentsListContext {
    return this.getRuleContext(0, ArgumentsListContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_constantsList;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterConstantsList) {
      listener.enterConstantsList(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitConstantsList) {
      listener.exitConstantsList(this);
    }
  }
}

export class ArgumentsListContext extends ParserRuleContext {
  public identifier_or_literal(): Identifier_or_literalContext[];
  public identifier_or_literal(i: number): Identifier_or_literalContext;
  public identifier_or_literal(
    i?: number,
  ): Identifier_or_literalContext | Identifier_or_literalContext[] {
    if (i === undefined) {
      return this.getRuleContexts(Identifier_or_literalContext);
    } else {
      return this.getRuleContext(i, Identifier_or_literalContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_argumentsList;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterArgumentsList) {
      listener.enterArgumentsList(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitArgumentsList) {
      listener.exitArgumentsList(this);
    }
  }
}

export class Identifier_or_literalContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode | undefined {
    return this.tryGetToken(LacLangParser.IDENTIFIER, 0);
  }
  public literal(): LiteralContext | undefined {
    return this.tryGetRuleContext(0, LiteralContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_identifier_or_literal;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterIdentifier_or_literal) {
      listener.enterIdentifier_or_literal(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitIdentifier_or_literal) {
      listener.exitIdentifier_or_literal(this);
    }
  }
}

export class LiteralContext extends ParserRuleContext {
  public BOOL_LITERAL(): TerminalNode | undefined {
    return this.tryGetToken(LacLangParser.BOOL_LITERAL, 0);
  }
  public NUMBER_LITERAL(): TerminalNode | undefined {
    return this.tryGetToken(LacLangParser.NUMBER_LITERAL, 0);
  }
  public STRING_LITERAL(): TerminalNode | undefined {
    return this.tryGetToken(LacLangParser.STRING_LITERAL, 0);
  }
  public BYTES_LITERAL(): TerminalNode | undefined {
    return this.tryGetToken(LacLangParser.BYTES_LITERAL, 0);
  }
  public ADDRESS_LITERAL(): TerminalNode | undefined {
    return this.tryGetToken(LacLangParser.ADDRESS_LITERAL, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_literal;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterLiteral) {
      listener.enterLiteral(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitLiteral) {
      listener.exitLiteral(this);
    }
  }
}
