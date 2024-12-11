// Generated from ./grammar/LacLang.g4 by ANTLR 4.9.0-SNAPSHOT

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
  public static readonly T__18 = 19;
  public static readonly T__19 = 20;
  public static readonly T__20 = 21;
  public static readonly T__21 = 22;
  public static readonly ADDRESS_LITERAL = 23;
  public static readonly BOOL_LITERAL = 24;
  public static readonly NUMBER_LITERAL = 25;
  public static readonly STRING_LITERAL = 26;
  public static readonly BYTES_LITERAL = 27;
  public static readonly IDENTIFIER = 28;
  public static readonly WHITESPACE = 29;
  public static readonly COMMENT = 30;
  public static readonly RULE_program = 0;
  public static readonly RULE_statement = 1;
  public static readonly RULE_importStatement = 2;
  public static readonly RULE_directive = 3;
  public static readonly RULE_directiveIndentifier = 4;
  public static readonly RULE_injectedOnlyDirective = 5;
  public static readonly RULE_varDeclaration = 6;
  public static readonly RULE_injectionModifier = 7;
  public static readonly RULE_constantDeclaration = 8;
  public static readonly RULE_artifactDeclaration = 9;
  public static readonly RULE_instanceDeclaration = 10;
  public static readonly RULE_evaluateStatement = 11;
  public static readonly RULE_dataType = 12;
  public static readonly RULE_constantsList = 13;
  public static readonly RULE_argumentsList = 14;
  public static readonly RULE_identifier_or_literal = 15;
  public static readonly RULE_literal = 16;
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'program',
    'statement',
    'importStatement',
    'directive',
    'directiveIndentifier',
    'injectedOnlyDirective',
    'varDeclaration',
    'injectionModifier',
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
    "'import'",
    "';'",
    "'pragma'",
    "'injected-only'",
    "'var'",
    "'inject'",
    "'('",
    "')'",
    "'constant'",
    "'='",
    "'artifact'",
    "'instance'",
    "'of'",
    "'takes'",
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
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 37;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
        while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1 + 1) {
            {
              {
                this.state = 34;
                this.importStatement();
              }
            }
          }
          this.state = 39;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
        }
        this.state = 43;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 1, this._ctx);
        while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1 + 1) {
            {
              {
                this.state = 40;
                this.directive();
              }
            }
          }
          this.state = 45;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 1, this._ctx);
        }
        this.state = 49;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
        while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1 + 1) {
            {
              {
                this.state = 46;
                this.statement();
              }
            }
          }
          this.state = 51;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
        }
        this.state = 52;
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
      this.state = 59;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case LacLangParser.T__4:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 54;
            this.varDeclaration();
          }
          break;
        case LacLangParser.T__8:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 55;
            this.constantDeclaration();
          }
          break;
        case LacLangParser.T__10:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 56;
            this.artifactDeclaration();
          }
          break;
        case LacLangParser.T__11:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 57;
            this.instanceDeclaration();
          }
          break;
        case LacLangParser.T__15:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 58;
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
  public importStatement(): ImportStatementContext {
    let _localctx: ImportStatementContext = new ImportStatementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 4, LacLangParser.RULE_importStatement);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 61;
        this.match(LacLangParser.T__0);
        this.state = 62;
        this.match(LacLangParser.STRING_LITERAL);
        this.state = 63;
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
  public directive(): DirectiveContext {
    let _localctx: DirectiveContext = new DirectiveContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 6, LacLangParser.RULE_directive);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 65;
        this.match(LacLangParser.T__2);
        this.state = 66;
        this.directiveIndentifier();
        this.state = 67;
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
  public directiveIndentifier(): DirectiveIndentifierContext {
    let _localctx: DirectiveIndentifierContext =
      new DirectiveIndentifierContext(this._ctx, this.state);
    this.enterRule(_localctx, 8, LacLangParser.RULE_directiveIndentifier);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 69;
        this.injectedOnlyDirective();
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
  public injectedOnlyDirective(): InjectedOnlyDirectiveContext {
    let _localctx: InjectedOnlyDirectiveContext =
      new InjectedOnlyDirectiveContext(this._ctx, this.state);
    this.enterRule(_localctx, 10, LacLangParser.RULE_injectedOnlyDirective);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 71;
        this.match(LacLangParser.T__3);
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
    this.enterRule(_localctx, 12, LacLangParser.RULE_varDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 73;
        this.match(LacLangParser.T__4);
        this.state = 75;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === LacLangParser.T__5) {
          {
            this.state = 74;
            this.injectionModifier();
          }
        }

        this.state = 77;
        this.dataType();
        this.state = 78;
        this.match(LacLangParser.IDENTIFIER);
        this.state = 79;
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
  public injectionModifier(): InjectionModifierContext {
    let _localctx: InjectionModifierContext = new InjectionModifierContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 14, LacLangParser.RULE_injectionModifier);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 81;
        this.match(LacLangParser.T__5);
        this.state = 82;
        this.match(LacLangParser.T__6);
        this.state = 83;
        this.match(LacLangParser.STRING_LITERAL);
        this.state = 84;
        this.match(LacLangParser.T__7);
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
    this.enterRule(_localctx, 16, LacLangParser.RULE_constantDeclaration);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 86;
        this.match(LacLangParser.T__8);
        this.state = 87;
        this.dataType();
        this.state = 88;
        this.match(LacLangParser.IDENTIFIER);
        this.state = 89;
        this.match(LacLangParser.T__9);
        this.state = 90;
        this.literal();
        this.state = 91;
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
    this.enterRule(_localctx, 18, LacLangParser.RULE_artifactDeclaration);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 93;
        this.match(LacLangParser.T__10);
        this.state = 94;
        this.match(LacLangParser.IDENTIFIER);
        this.state = 95;
        this.match(LacLangParser.T__9);
        this.state = 96;
        this.match(LacLangParser.ADDRESS_LITERAL);
        this.state = 97;
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
    this.enterRule(_localctx, 20, LacLangParser.RULE_instanceDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 99;
        this.match(LacLangParser.T__11);
        this.state = 100;
        this.dataType();
        this.state = 101;
        this.match(LacLangParser.IDENTIFIER);
        this.state = 102;
        this.match(LacLangParser.T__12);
        this.state = 103;
        this.identifier_or_literal();
        this.state = 104;
        this.match(LacLangParser.T__13);
        this.state = 105;
        this.match(LacLangParser.T__6);
        this.state = 107;
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
            this.state = 106;
            this.argumentsList();
          }
        }

        this.state = 109;
        this.match(LacLangParser.T__7);
        this.state = 116;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === LacLangParser.T__14) {
          {
            this.state = 110;
            this.match(LacLangParser.T__14);
            this.state = 111;
            this.match(LacLangParser.T__6);
            this.state = 113;
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
                this.state = 112;
                this.constantsList();
              }
            }

            this.state = 115;
            this.match(LacLangParser.T__7);
          }
        }

        this.state = 118;
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
    this.enterRule(_localctx, 22, LacLangParser.RULE_evaluateStatement);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 120;
        this.match(LacLangParser.T__15);
        this.state = 121;
        this.match(LacLangParser.IDENTIFIER);
        this.state = 122;
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
    this.enterRule(_localctx, 24, LacLangParser.RULE_dataType);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 124;
        _la = this._input.LA(1);
        if (
          !(
            (_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << LacLangParser.T__16) |
                (1 << LacLangParser.T__17) |
                (1 << LacLangParser.T__18) |
                (1 << LacLangParser.T__19) |
                (1 << LacLangParser.T__20))) !==
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
    this.enterRule(_localctx, 26, LacLangParser.RULE_constantsList);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 126;
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
    this.enterRule(_localctx, 28, LacLangParser.RULE_argumentsList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 128;
        this.identifier_or_literal();
        this.state = 133;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === LacLangParser.T__21) {
          {
            {
              this.state = 129;
              this.match(LacLangParser.T__21);
              this.state = 130;
              this.identifier_or_literal();
            }
          }
          this.state = 135;
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
    this.enterRule(_localctx, 30, LacLangParser.RULE_identifier_or_literal);
    try {
      this.state = 138;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case LacLangParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 136;
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
            this.state = 137;
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
    this.enterRule(_localctx, 32, LacLangParser.RULE_literal);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 140;
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
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03 \x91\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04' +
    '\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x03' +
    '\x02\x07\x02&\n\x02\f\x02\x0E\x02)\v\x02\x03\x02\x07\x02,\n\x02\f\x02' +
    '\x0E\x02/\v\x02\x03\x02\x07\x022\n\x02\f\x02\x0E\x025\v\x02\x03\x02\x03' +
    '\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03>\n\x03\x03\x04\x03' +
    '\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03' +
    '\x07\x03\x07\x03\b\x03\b\x05\bN\n\b\x03\b\x03\b\x03\b\x03\b\x03\t\x03' +
    '\t\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\v\x03' +
    '\v\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03' +
    '\f\x05\fn\n\f\x03\f\x03\f\x03\f\x03\f\x05\ft\n\f\x03\f\x05\fw\n\f\x03' +
    '\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x10' +
    '\x03\x10\x03\x10\x07\x10\x86\n\x10\f\x10\x0E\x10\x89\v\x10\x03\x11\x03' +
    "\x11\x05\x11\x8D\n\x11\x03\x12\x03\x12\x03\x12\x05'-3\x02\x02\x13\x02" +
    '\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02' +
    '\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02"\x02\x02\x04\x03\x02\x13' +
    "\x17\x03\x02\x19\x1D\x02\x8C\x02'\x03\x02\x02\x02\x04=\x03\x02\x02\x02" +
    '\x06?\x03\x02\x02\x02\bC\x03\x02\x02\x02\nG\x03\x02\x02\x02\fI\x03\x02' +
    '\x02\x02\x0EK\x03\x02\x02\x02\x10S\x03\x02\x02\x02\x12X\x03\x02\x02\x02' +
    '\x14_\x03\x02\x02\x02\x16e\x03\x02\x02\x02\x18z\x03\x02\x02\x02\x1A~\x03' +
    '\x02\x02\x02\x1C\x80\x03\x02\x02\x02\x1E\x82\x03\x02\x02\x02 \x8C\x03' +
    '\x02\x02\x02"\x8E\x03\x02\x02\x02$&\x05\x06\x04\x02%$\x03\x02\x02\x02' +
    "&)\x03\x02\x02\x02'(\x03\x02\x02\x02'%\x03\x02\x02\x02(-\x03\x02\x02" +
    "\x02)'\x03\x02\x02\x02*,\x05\b\x05\x02+*\x03\x02\x02\x02,/\x03\x02\x02" +
    '\x02-.\x03\x02\x02\x02-+\x03\x02\x02\x02.3\x03\x02\x02\x02/-\x03\x02\x02' +
    '\x0202\x05\x04\x03\x0210\x03\x02\x02\x0225\x03\x02\x02\x0234\x03\x02\x02' +
    '\x0231\x03\x02\x02\x0246\x03\x02\x02\x0253\x03\x02\x02\x0267\x07\x02\x02' +
    '\x037\x03\x03\x02\x02\x028>\x05\x0E\b\x029>\x05\x12\n\x02:>\x05\x14\v' +
    '\x02;>\x05\x16\f\x02<>\x05\x18\r\x02=8\x03\x02\x02\x02=9\x03\x02\x02\x02' +
    '=:\x03\x02\x02\x02=;\x03\x02\x02\x02=<\x03\x02\x02\x02>\x05\x03\x02\x02' +
    '\x02?@\x07\x03\x02\x02@A\x07\x1C\x02\x02AB\x07\x04\x02\x02B\x07\x03\x02' +
    '\x02\x02CD\x07\x05\x02\x02DE\x05\n\x06\x02EF\x07\x04\x02\x02F\t\x03\x02' +
    '\x02\x02GH\x05\f\x07\x02H\v\x03\x02\x02\x02IJ\x07\x06\x02\x02J\r\x03\x02' +
    '\x02\x02KM\x07\x07\x02\x02LN\x05\x10\t\x02ML\x03\x02\x02\x02MN\x03\x02' +
    '\x02\x02NO\x03\x02\x02\x02OP\x05\x1A\x0E\x02PQ\x07\x1E\x02\x02QR\x07\x04' +
    '\x02\x02R\x0F\x03\x02\x02\x02ST\x07\b\x02\x02TU\x07\t\x02\x02UV\x07\x1C' +
    '\x02\x02VW\x07\n\x02\x02W\x11\x03\x02\x02\x02XY\x07\v\x02\x02YZ\x05\x1A' +
    '\x0E\x02Z[\x07\x1E\x02\x02[\\\x07\f\x02\x02\\]\x05"\x12\x02]^\x07\x04' +
    '\x02\x02^\x13\x03\x02\x02\x02_`\x07\r\x02\x02`a\x07\x1E\x02\x02ab\x07' +
    '\f\x02\x02bc\x07\x19\x02\x02cd\x07\x04\x02\x02d\x15\x03\x02\x02\x02ef' +
    '\x07\x0E\x02\x02fg\x05\x1A\x0E\x02gh\x07\x1E\x02\x02hi\x07\x0F\x02\x02' +
    'ij\x05 \x11\x02jk\x07\x10\x02\x02km\x07\t\x02\x02ln\x05\x1E\x10\x02ml' +
    '\x03\x02\x02\x02mn\x03\x02\x02\x02no\x03\x02\x02\x02ov\x07\n\x02\x02p' +
    'q\x07\x11\x02\x02qs\x07\t\x02\x02rt\x05\x1C\x0F\x02sr\x03\x02\x02\x02' +
    'st\x03\x02\x02\x02tu\x03\x02\x02\x02uw\x07\n\x02\x02vp\x03\x02\x02\x02' +
    'vw\x03\x02\x02\x02wx\x03\x02\x02\x02xy\x07\x04\x02\x02y\x17\x03\x02\x02' +
    '\x02z{\x07\x12\x02\x02{|\x07\x1E\x02\x02|}\x07\x04\x02\x02}\x19\x03\x02' +
    '\x02\x02~\x7F\t\x02\x02\x02\x7F\x1B\x03\x02\x02\x02\x80\x81\x05\x1E\x10' +
    '\x02\x81\x1D\x03\x02\x02\x02\x82\x87\x05 \x11\x02\x83\x84\x07\x18\x02' +
    '\x02\x84\x86\x05 \x11\x02\x85\x83\x03\x02\x02\x02\x86\x89\x03\x02\x02' +
    '\x02\x87\x85\x03\x02\x02\x02\x87\x88\x03\x02\x02\x02\x88\x1F\x03\x02\x02' +
    '\x02\x89\x87\x03\x02\x02\x02\x8A\x8D\x07\x1E\x02\x02\x8B\x8D\x05"\x12' +
    '\x02\x8C\x8A\x03\x02\x02\x02\x8C\x8B\x03\x02\x02\x02\x8D!\x03\x02\x02' +
    "\x02\x8E\x8F\t\x03\x02\x02\x8F#\x03\x02\x02\x02\f'-3=Mmsv\x87\x8C";
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
  public importStatement(): ImportStatementContext[];
  public importStatement(i: number): ImportStatementContext;
  public importStatement(
    i?: number,
  ): ImportStatementContext | ImportStatementContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ImportStatementContext);
    } else {
      return this.getRuleContext(i, ImportStatementContext);
    }
  }
  public directive(): DirectiveContext[];
  public directive(i: number): DirectiveContext;
  public directive(i?: number): DirectiveContext | DirectiveContext[] {
    if (i === undefined) {
      return this.getRuleContexts(DirectiveContext);
    } else {
      return this.getRuleContext(i, DirectiveContext);
    }
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

export class ImportStatementContext extends ParserRuleContext {
  public STRING_LITERAL(): TerminalNode {
    return this.getToken(LacLangParser.STRING_LITERAL, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_importStatement;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterImportStatement) {
      listener.enterImportStatement(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitImportStatement) {
      listener.exitImportStatement(this);
    }
  }
}

export class DirectiveContext extends ParserRuleContext {
  public directiveIndentifier(): DirectiveIndentifierContext {
    return this.getRuleContext(0, DirectiveIndentifierContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_directive;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterDirective) {
      listener.enterDirective(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitDirective) {
      listener.exitDirective(this);
    }
  }
}

export class DirectiveIndentifierContext extends ParserRuleContext {
  public injectedOnlyDirective(): InjectedOnlyDirectiveContext {
    return this.getRuleContext(0, InjectedOnlyDirectiveContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_directiveIndentifier;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterDirectiveIndentifier) {
      listener.enterDirectiveIndentifier(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitDirectiveIndentifier) {
      listener.exitDirectiveIndentifier(this);
    }
  }
}

export class InjectedOnlyDirectiveContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_injectedOnlyDirective;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterInjectedOnlyDirective) {
      listener.enterInjectedOnlyDirective(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitInjectedOnlyDirective) {
      listener.exitInjectedOnlyDirective(this);
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
  public injectionModifier(): InjectionModifierContext | undefined {
    return this.tryGetRuleContext(0, InjectionModifierContext);
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

export class InjectionModifierContext extends ParserRuleContext {
  public STRING_LITERAL(): TerminalNode {
    return this.getToken(LacLangParser.STRING_LITERAL, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return LacLangParser.RULE_injectionModifier;
  }
  // @Override
  public enterRule(listener: LacLangListener): void {
    if (listener.enterInjectionModifier) {
      listener.enterInjectionModifier(this);
    }
  }
  // @Override
  public exitRule(listener: LacLangListener): void {
    if (listener.exitInjectionModifier) {
      listener.exitInjectionModifier(this);
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
