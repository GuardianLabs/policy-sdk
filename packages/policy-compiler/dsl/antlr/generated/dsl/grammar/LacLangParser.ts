// Generated from ./dsl/grammar/LacLang.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { LacLangListener } from "./LacLangListener";

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
	public static readonly ADDRESS_LITERAL = 20;
	public static readonly BOOL_LITERAL = 21;
	public static readonly NUMBER_LITERAL = 22;
	public static readonly STRING_LITERAL = 23;
	public static readonly BYTES_LITERAL = 24;
	public static readonly IDENTIFIER = 25;
	public static readonly WHITESPACE = 26;
	public static readonly COMMENT = 27;
	public static readonly RULE_program = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_varDeclaration = 2;
	public static readonly RULE_injectionModifier = 3;
	public static readonly RULE_constantDeclaration = 4;
	public static readonly RULE_artifactDeclaration = 5;
	public static readonly RULE_instanceDeclaration = 6;
	public static readonly RULE_evaluateStatement = 7;
	public static readonly RULE_dataType = 8;
	public static readonly RULE_constantsList = 9;
	public static readonly RULE_argumentsList = 10;
	public static readonly RULE_identifier_or_literal = 11;
	public static readonly RULE_literal = 12;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "statement", "varDeclaration", "injectionModifier", "constantDeclaration", 
		"artifactDeclaration", "instanceDeclaration", "evaluateStatement", "dataType", 
		"constantsList", "argumentsList", "identifier_or_literal", "literal",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'var'", "';'", "'inject'", "'('", "')'", "'constant'", "'='", 
		"'artifact'", "'instance'", "'of'", "'takes'", "'with'", "'evaluate'", 
		"'bool'", "'number'", "'string'", "'bytes'", "'address'", "','",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, "ADDRESS_LITERAL", 
		"BOOL_LITERAL", "NUMBER_LITERAL", "STRING_LITERAL", "BYTES_LITERAL", "IDENTIFIER", 
		"WHITESPACE", "COMMENT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(LacLangParser._LITERAL_NAMES, LacLangParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return LacLangParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "LacLang.g4"; }

	// @Override
	public get ruleNames(): string[] { return LacLangParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return LacLangParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
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
			this.state = 29;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << LacLangParser.T__0) | (1 << LacLangParser.T__5) | (1 << LacLangParser.T__7) | (1 << LacLangParser.T__8) | (1 << LacLangParser.T__12))) !== 0)) {
				{
				{
				this.state = 26;
				this.statement();
				}
				}
				this.state = 31;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 32;
			this.match(LacLangParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, LacLangParser.RULE_statement);
		try {
			this.state = 39;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case LacLangParser.T__0:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 34;
				this.varDeclaration();
				}
				break;
			case LacLangParser.T__5:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 35;
				this.constantDeclaration();
				}
				break;
			case LacLangParser.T__7:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 36;
				this.artifactDeclaration();
				}
				break;
			case LacLangParser.T__8:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 37;
				this.instanceDeclaration();
				}
				break;
			case LacLangParser.T__12:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 38;
				this.evaluateStatement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varDeclaration(): VarDeclarationContext {
		let _localctx: VarDeclarationContext = new VarDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, LacLangParser.RULE_varDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 41;
			this.match(LacLangParser.T__0);
			this.state = 43;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === LacLangParser.T__2) {
				{
				this.state = 42;
				this.injectionModifier();
				}
			}

			this.state = 45;
			this.dataType();
			this.state = 46;
			this.match(LacLangParser.IDENTIFIER);
			this.state = 47;
			this.match(LacLangParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public injectionModifier(): InjectionModifierContext {
		let _localctx: InjectionModifierContext = new InjectionModifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, LacLangParser.RULE_injectionModifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 49;
			this.match(LacLangParser.T__2);
			this.state = 50;
			this.match(LacLangParser.T__3);
			this.state = 51;
			this.match(LacLangParser.STRING_LITERAL);
			this.state = 52;
			this.match(LacLangParser.T__4);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constantDeclaration(): ConstantDeclarationContext {
		let _localctx: ConstantDeclarationContext = new ConstantDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, LacLangParser.RULE_constantDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 54;
			this.match(LacLangParser.T__5);
			this.state = 55;
			this.dataType();
			this.state = 56;
			this.match(LacLangParser.IDENTIFIER);
			this.state = 57;
			this.match(LacLangParser.T__6);
			this.state = 58;
			this.literal();
			this.state = 59;
			this.match(LacLangParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public artifactDeclaration(): ArtifactDeclarationContext {
		let _localctx: ArtifactDeclarationContext = new ArtifactDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, LacLangParser.RULE_artifactDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 61;
			this.match(LacLangParser.T__7);
			this.state = 62;
			this.match(LacLangParser.IDENTIFIER);
			this.state = 63;
			this.match(LacLangParser.T__6);
			this.state = 64;
			this.match(LacLangParser.ADDRESS_LITERAL);
			this.state = 65;
			this.match(LacLangParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public instanceDeclaration(): InstanceDeclarationContext {
		let _localctx: InstanceDeclarationContext = new InstanceDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, LacLangParser.RULE_instanceDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 67;
			this.match(LacLangParser.T__8);
			this.state = 68;
			this.dataType();
			this.state = 69;
			this.match(LacLangParser.IDENTIFIER);
			this.state = 70;
			this.match(LacLangParser.T__9);
			this.state = 71;
			this.identifier_or_literal();
			this.state = 72;
			this.match(LacLangParser.T__10);
			this.state = 73;
			this.match(LacLangParser.T__3);
			this.state = 75;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << LacLangParser.ADDRESS_LITERAL) | (1 << LacLangParser.BOOL_LITERAL) | (1 << LacLangParser.NUMBER_LITERAL) | (1 << LacLangParser.STRING_LITERAL) | (1 << LacLangParser.BYTES_LITERAL) | (1 << LacLangParser.IDENTIFIER))) !== 0)) {
				{
				this.state = 74;
				this.argumentsList();
				}
			}

			this.state = 77;
			this.match(LacLangParser.T__4);
			this.state = 84;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === LacLangParser.T__11) {
				{
				this.state = 78;
				this.match(LacLangParser.T__11);
				this.state = 79;
				this.match(LacLangParser.T__3);
				this.state = 81;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << LacLangParser.ADDRESS_LITERAL) | (1 << LacLangParser.BOOL_LITERAL) | (1 << LacLangParser.NUMBER_LITERAL) | (1 << LacLangParser.STRING_LITERAL) | (1 << LacLangParser.BYTES_LITERAL) | (1 << LacLangParser.IDENTIFIER))) !== 0)) {
					{
					this.state = 80;
					this.constantsList();
					}
				}

				this.state = 83;
				this.match(LacLangParser.T__4);
				}
			}

			this.state = 86;
			this.match(LacLangParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public evaluateStatement(): EvaluateStatementContext {
		let _localctx: EvaluateStatementContext = new EvaluateStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, LacLangParser.RULE_evaluateStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 88;
			this.match(LacLangParser.T__12);
			this.state = 89;
			this.match(LacLangParser.IDENTIFIER);
			this.state = 90;
			this.match(LacLangParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dataType(): DataTypeContext {
		let _localctx: DataTypeContext = new DataTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, LacLangParser.RULE_dataType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 92;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << LacLangParser.T__13) | (1 << LacLangParser.T__14) | (1 << LacLangParser.T__15) | (1 << LacLangParser.T__16) | (1 << LacLangParser.T__17))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constantsList(): ConstantsListContext {
		let _localctx: ConstantsListContext = new ConstantsListContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, LacLangParser.RULE_constantsList);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 94;
			this.argumentsList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public argumentsList(): ArgumentsListContext {
		let _localctx: ArgumentsListContext = new ArgumentsListContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, LacLangParser.RULE_argumentsList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 96;
			this.identifier_or_literal();
			this.state = 101;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === LacLangParser.T__18) {
				{
				{
				this.state = 97;
				this.match(LacLangParser.T__18);
				this.state = 98;
				this.identifier_or_literal();
				}
				}
				this.state = 103;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier_or_literal(): Identifier_or_literalContext {
		let _localctx: Identifier_or_literalContext = new Identifier_or_literalContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, LacLangParser.RULE_identifier_or_literal);
		try {
			this.state = 106;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case LacLangParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 104;
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
				this.state = 105;
				this.literal();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, LacLangParser.RULE_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 108;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << LacLangParser.ADDRESS_LITERAL) | (1 << LacLangParser.BOOL_LITERAL) | (1 << LacLangParser.NUMBER_LITERAL) | (1 << LacLangParser.STRING_LITERAL) | (1 << LacLangParser.BYTES_LITERAL))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x1Dq\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x03\x02\x07\x02\x1E\n\x02\f\x02\x0E\x02!\v\x02\x03\x02\x03" +
		"\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03*\n\x03\x03\x04\x03" +
		"\x04\x05\x04.\n\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03" +
		"\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b" +
		"\x03\b\x03\b\x03\b\x03\b\x03\b\x05\bN\n\b\x03\b\x03\b\x03\b\x03\b\x05" +
		"\bT\n\b\x03\b\x05\bW\n\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\n\x03" +
		"\n\x03\v\x03\v\x03\f\x03\f\x03\f\x07\ff\n\f\f\f\x0E\fi\v\f\x03\r\x03\r" +
		"\x05\rm\n\r\x03\x0E\x03\x0E\x03\x0E\x02\x02\x02\x0F\x02\x02\x04\x02\x06" +
		"\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02" +
		"\x1A\x02\x02\x04\x03\x02\x10\x14\x03\x02\x16\x1A\x02n\x02\x1F\x03\x02" +
		"\x02\x02\x04)\x03\x02\x02\x02\x06+\x03\x02\x02\x02\b3\x03\x02\x02\x02" +
		"\n8\x03\x02\x02\x02\f?\x03\x02\x02\x02\x0EE\x03\x02\x02\x02\x10Z\x03\x02" +
		"\x02\x02\x12^\x03\x02\x02\x02\x14`\x03\x02\x02\x02\x16b\x03\x02\x02\x02" +
		"\x18l\x03\x02\x02\x02\x1An\x03\x02\x02\x02\x1C\x1E\x05\x04\x03\x02\x1D" +
		"\x1C\x03\x02\x02\x02\x1E!\x03\x02\x02\x02\x1F\x1D\x03\x02\x02\x02\x1F" +
		" \x03\x02\x02\x02 \"\x03\x02\x02\x02!\x1F\x03\x02\x02\x02\"#\x07\x02\x02" +
		"\x03#\x03\x03\x02\x02\x02$*\x05\x06\x04\x02%*\x05\n\x06\x02&*\x05\f\x07" +
		"\x02\'*\x05\x0E\b\x02(*\x05\x10\t\x02)$\x03\x02\x02\x02)%\x03\x02\x02" +
		"\x02)&\x03\x02\x02\x02)\'\x03\x02\x02\x02)(\x03\x02\x02\x02*\x05\x03\x02" +
		"\x02\x02+-\x07\x03\x02\x02,.\x05\b\x05\x02-,\x03\x02\x02\x02-.\x03\x02" +
		"\x02\x02./\x03\x02\x02\x02/0\x05\x12\n\x0201\x07\x1B\x02\x0212\x07\x04" +
		"\x02\x022\x07\x03\x02\x02\x0234\x07\x05\x02\x0245\x07\x06\x02\x0256\x07" +
		"\x19\x02\x0267\x07\x07\x02\x027\t\x03\x02\x02\x0289\x07\b\x02\x029:\x05" +
		"\x12\n\x02:;\x07\x1B\x02\x02;<\x07\t\x02\x02<=\x05\x1A\x0E\x02=>\x07\x04" +
		"\x02\x02>\v\x03\x02\x02\x02?@\x07\n\x02\x02@A\x07\x1B\x02\x02AB\x07\t" +
		"\x02\x02BC\x07\x16\x02\x02CD\x07\x04\x02\x02D\r\x03\x02\x02\x02EF\x07" +
		"\v\x02\x02FG\x05\x12\n\x02GH\x07\x1B\x02\x02HI\x07\f\x02\x02IJ\x05\x18" +
		"\r\x02JK\x07\r\x02\x02KM\x07\x06\x02\x02LN\x05\x16\f\x02ML\x03\x02\x02" +
		"\x02MN\x03\x02\x02\x02NO\x03\x02\x02\x02OV\x07\x07\x02\x02PQ\x07\x0E\x02" +
		"\x02QS\x07\x06\x02\x02RT\x05\x14\v\x02SR\x03\x02\x02\x02ST\x03\x02\x02" +
		"\x02TU\x03\x02\x02\x02UW\x07\x07\x02\x02VP\x03\x02\x02\x02VW\x03\x02\x02" +
		"\x02WX\x03\x02\x02\x02XY\x07\x04\x02\x02Y\x0F\x03\x02\x02\x02Z[\x07\x0F" +
		"\x02\x02[\\\x07\x1B\x02\x02\\]\x07\x04\x02\x02]\x11\x03\x02\x02\x02^_" +
		"\t\x02\x02\x02_\x13\x03\x02\x02\x02`a\x05\x16\f\x02a\x15\x03\x02\x02\x02" +
		"bg\x05\x18\r\x02cd\x07\x15\x02\x02df\x05\x18\r\x02ec\x03\x02\x02\x02f" +
		"i\x03\x02\x02\x02ge\x03\x02\x02\x02gh\x03\x02\x02\x02h\x17\x03\x02\x02" +
		"\x02ig\x03\x02\x02\x02jm\x07\x1B\x02\x02km\x05\x1A\x0E\x02lj\x03\x02\x02" +
		"\x02lk\x03\x02\x02\x02m\x19\x03\x02\x02\x02no\t\x03\x02\x02o\x1B\x03\x02" +
		"\x02\x02\n\x1F)-MSVgl";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!LacLangParser.__ATN) {
			LacLangParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(LacLangParser._serializedATN));
		}

		return LacLangParser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(LacLangParser.EOF, 0); }
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
	public get ruleIndex(): number { return LacLangParser.RULE_program; }
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
	public get ruleIndex(): number { return LacLangParser.RULE_statement; }
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
	public IDENTIFIER(): TerminalNode { return this.getToken(LacLangParser.IDENTIFIER, 0); }
	public injectionModifier(): InjectionModifierContext | undefined {
		return this.tryGetRuleContext(0, InjectionModifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LacLangParser.RULE_varDeclaration; }
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
	public STRING_LITERAL(): TerminalNode { return this.getToken(LacLangParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LacLangParser.RULE_injectionModifier; }
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
	public IDENTIFIER(): TerminalNode { return this.getToken(LacLangParser.IDENTIFIER, 0); }
	public literal(): LiteralContext {
		return this.getRuleContext(0, LiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LacLangParser.RULE_constantDeclaration; }
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
	public IDENTIFIER(): TerminalNode { return this.getToken(LacLangParser.IDENTIFIER, 0); }
	public ADDRESS_LITERAL(): TerminalNode { return this.getToken(LacLangParser.ADDRESS_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LacLangParser.RULE_artifactDeclaration; }
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
	public IDENTIFIER(): TerminalNode { return this.getToken(LacLangParser.IDENTIFIER, 0); }
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
	public get ruleIndex(): number { return LacLangParser.RULE_instanceDeclaration; }
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
	public IDENTIFIER(): TerminalNode { return this.getToken(LacLangParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LacLangParser.RULE_evaluateStatement; }
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
	public get ruleIndex(): number { return LacLangParser.RULE_dataType; }
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
	public get ruleIndex(): number { return LacLangParser.RULE_constantsList; }
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
	public identifier_or_literal(i?: number): Identifier_or_literalContext | Identifier_or_literalContext[] {
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
	public get ruleIndex(): number { return LacLangParser.RULE_argumentsList; }
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
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(LacLangParser.IDENTIFIER, 0); }
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LacLangParser.RULE_identifier_or_literal; }
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
	public BOOL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(LacLangParser.BOOL_LITERAL, 0); }
	public NUMBER_LITERAL(): TerminalNode | undefined { return this.tryGetToken(LacLangParser.NUMBER_LITERAL, 0); }
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(LacLangParser.STRING_LITERAL, 0); }
	public BYTES_LITERAL(): TerminalNode | undefined { return this.tryGetToken(LacLangParser.BYTES_LITERAL, 0); }
	public ADDRESS_LITERAL(): TerminalNode | undefined { return this.tryGetToken(LacLangParser.ADDRESS_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LacLangParser.RULE_literal; }
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


