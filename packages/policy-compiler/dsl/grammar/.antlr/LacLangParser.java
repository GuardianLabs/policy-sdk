// Generated from /Users/vladpriadko/AllData/Programming/Projects/Work/Lacero/policy-sdk/packages/policy-compiler/dsl/grammar/LacLang.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class LacLangParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		T__17=18, ADDRESS_LITERAL=19, BOOL_LITERAL=20, NUMBER_LITERAL=21, STRING_LITERAL=22, 
		BYTES_LITERAL=23, IDENTIFIER=24, WHITESPACE=25, COMMENT=26;
	public static final int
		RULE_program = 0, RULE_statement = 1, RULE_varDeclaration = 2, RULE_constantDeclaration = 3, 
		RULE_artifactDeclaration = 4, RULE_instanceDeclaration = 5, RULE_evaluateStatement = 6, 
		RULE_dataType = 7, RULE_constantsList = 8, RULE_argumentsList = 9, RULE_identifier_or_literal = 10, 
		RULE_literal = 11;
	private static String[] makeRuleNames() {
		return new String[] {
			"program", "statement", "varDeclaration", "constantDeclaration", "artifactDeclaration", 
			"instanceDeclaration", "evaluateStatement", "dataType", "constantsList", 
			"argumentsList", "identifier_or_literal", "literal"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'var'", "';'", "'constant'", "'='", "'artifact'", "'instance'", 
			"'of'", "'takes'", "'('", "')'", "'with'", "'evaluate'", "'bool'", "'number'", 
			"'string'", "'bytes'", "'address'", "','"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, "ADDRESS_LITERAL", "BOOL_LITERAL", 
			"NUMBER_LITERAL", "STRING_LITERAL", "BYTES_LITERAL", "IDENTIFIER", "WHITESPACE", 
			"COMMENT"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "LacLang.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public LacLangParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ProgramContext extends ParserRuleContext {
		public TerminalNode EOF() { return getToken(LacLangParser.EOF, 0); }
		public List<StatementContext> statement() {
			return getRuleContexts(StatementContext.class);
		}
		public StatementContext statement(int i) {
			return getRuleContext(StatementContext.class,i);
		}
		public ProgramContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_program; }
	}

	public final ProgramContext program() throws RecognitionException {
		ProgramContext _localctx = new ProgramContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_program);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(27);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4202L) != 0)) {
				{
				{
				setState(24);
				statement();
				}
				}
				setState(29);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(30);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class StatementContext extends ParserRuleContext {
		public VarDeclarationContext varDeclaration() {
			return getRuleContext(VarDeclarationContext.class,0);
		}
		public ConstantDeclarationContext constantDeclaration() {
			return getRuleContext(ConstantDeclarationContext.class,0);
		}
		public ArtifactDeclarationContext artifactDeclaration() {
			return getRuleContext(ArtifactDeclarationContext.class,0);
		}
		public InstanceDeclarationContext instanceDeclaration() {
			return getRuleContext(InstanceDeclarationContext.class,0);
		}
		public EvaluateStatementContext evaluateStatement() {
			return getRuleContext(EvaluateStatementContext.class,0);
		}
		public StatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statement; }
	}

	public final StatementContext statement() throws RecognitionException {
		StatementContext _localctx = new StatementContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_statement);
		try {
			setState(37);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__0:
				enterOuterAlt(_localctx, 1);
				{
				setState(32);
				varDeclaration();
				}
				break;
			case T__2:
				enterOuterAlt(_localctx, 2);
				{
				setState(33);
				constantDeclaration();
				}
				break;
			case T__4:
				enterOuterAlt(_localctx, 3);
				{
				setState(34);
				artifactDeclaration();
				}
				break;
			case T__5:
				enterOuterAlt(_localctx, 4);
				{
				setState(35);
				instanceDeclaration();
				}
				break;
			case T__11:
				enterOuterAlt(_localctx, 5);
				{
				setState(36);
				evaluateStatement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class VarDeclarationContext extends ParserRuleContext {
		public DataTypeContext dataType() {
			return getRuleContext(DataTypeContext.class,0);
		}
		public TerminalNode IDENTIFIER() { return getToken(LacLangParser.IDENTIFIER, 0); }
		public VarDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_varDeclaration; }
	}

	public final VarDeclarationContext varDeclaration() throws RecognitionException {
		VarDeclarationContext _localctx = new VarDeclarationContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_varDeclaration);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(39);
			match(T__0);
			setState(40);
			dataType();
			setState(41);
			match(IDENTIFIER);
			setState(42);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ConstantDeclarationContext extends ParserRuleContext {
		public DataTypeContext dataType() {
			return getRuleContext(DataTypeContext.class,0);
		}
		public TerminalNode IDENTIFIER() { return getToken(LacLangParser.IDENTIFIER, 0); }
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public ConstantDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constantDeclaration; }
	}

	public final ConstantDeclarationContext constantDeclaration() throws RecognitionException {
		ConstantDeclarationContext _localctx = new ConstantDeclarationContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_constantDeclaration);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(44);
			match(T__2);
			setState(45);
			dataType();
			setState(46);
			match(IDENTIFIER);
			setState(47);
			match(T__3);
			setState(48);
			literal();
			setState(49);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArtifactDeclarationContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(LacLangParser.IDENTIFIER, 0); }
		public TerminalNode ADDRESS_LITERAL() { return getToken(LacLangParser.ADDRESS_LITERAL, 0); }
		public ArtifactDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_artifactDeclaration; }
	}

	public final ArtifactDeclarationContext artifactDeclaration() throws RecognitionException {
		ArtifactDeclarationContext _localctx = new ArtifactDeclarationContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_artifactDeclaration);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(51);
			match(T__4);
			setState(52);
			match(IDENTIFIER);
			setState(53);
			match(T__3);
			setState(54);
			match(ADDRESS_LITERAL);
			setState(55);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class InstanceDeclarationContext extends ParserRuleContext {
		public DataTypeContext dataType() {
			return getRuleContext(DataTypeContext.class,0);
		}
		public TerminalNode IDENTIFIER() { return getToken(LacLangParser.IDENTIFIER, 0); }
		public Identifier_or_literalContext identifier_or_literal() {
			return getRuleContext(Identifier_or_literalContext.class,0);
		}
		public ArgumentsListContext argumentsList() {
			return getRuleContext(ArgumentsListContext.class,0);
		}
		public ConstantsListContext constantsList() {
			return getRuleContext(ConstantsListContext.class,0);
		}
		public InstanceDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_instanceDeclaration; }
	}

	public final InstanceDeclarationContext instanceDeclaration() throws RecognitionException {
		InstanceDeclarationContext _localctx = new InstanceDeclarationContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_instanceDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(57);
			match(T__5);
			setState(58);
			dataType();
			setState(59);
			match(IDENTIFIER);
			setState(60);
			match(T__6);
			setState(61);
			identifier_or_literal();
			setState(62);
			match(T__7);
			setState(63);
			match(T__8);
			setState(65);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 33030144L) != 0)) {
				{
				setState(64);
				argumentsList();
				}
			}

			setState(67);
			match(T__9);
			setState(74);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__10) {
				{
				setState(68);
				match(T__10);
				setState(69);
				match(T__8);
				setState(71);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 33030144L) != 0)) {
					{
					setState(70);
					constantsList();
					}
				}

				setState(73);
				match(T__9);
				}
			}

			setState(76);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class EvaluateStatementContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(LacLangParser.IDENTIFIER, 0); }
		public EvaluateStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_evaluateStatement; }
	}

	public final EvaluateStatementContext evaluateStatement() throws RecognitionException {
		EvaluateStatementContext _localctx = new EvaluateStatementContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_evaluateStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(78);
			match(T__11);
			setState(79);
			match(IDENTIFIER);
			setState(80);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DataTypeContext extends ParserRuleContext {
		public DataTypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dataType; }
	}

	public final DataTypeContext dataType() throws RecognitionException {
		DataTypeContext _localctx = new DataTypeContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_dataType);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(82);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 253952L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ConstantsListContext extends ParserRuleContext {
		public ArgumentsListContext argumentsList() {
			return getRuleContext(ArgumentsListContext.class,0);
		}
		public ConstantsListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_constantsList; }
	}

	public final ConstantsListContext constantsList() throws RecognitionException {
		ConstantsListContext _localctx = new ConstantsListContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_constantsList);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(84);
			argumentsList();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArgumentsListContext extends ParserRuleContext {
		public List<Identifier_or_literalContext> identifier_or_literal() {
			return getRuleContexts(Identifier_or_literalContext.class);
		}
		public Identifier_or_literalContext identifier_or_literal(int i) {
			return getRuleContext(Identifier_or_literalContext.class,i);
		}
		public ArgumentsListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_argumentsList; }
	}

	public final ArgumentsListContext argumentsList() throws RecognitionException {
		ArgumentsListContext _localctx = new ArgumentsListContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_argumentsList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(86);
			identifier_or_literal();
			setState(91);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__17) {
				{
				{
				setState(87);
				match(T__17);
				setState(88);
				identifier_or_literal();
				}
				}
				setState(93);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Identifier_or_literalContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(LacLangParser.IDENTIFIER, 0); }
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public Identifier_or_literalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifier_or_literal; }
	}

	public final Identifier_or_literalContext identifier_or_literal() throws RecognitionException {
		Identifier_or_literalContext _localctx = new Identifier_or_literalContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_identifier_or_literal);
		try {
			setState(96);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case IDENTIFIER:
				enterOuterAlt(_localctx, 1);
				{
				setState(94);
				match(IDENTIFIER);
				}
				break;
			case ADDRESS_LITERAL:
			case BOOL_LITERAL:
			case NUMBER_LITERAL:
			case STRING_LITERAL:
			case BYTES_LITERAL:
				enterOuterAlt(_localctx, 2);
				{
				setState(95);
				literal();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LiteralContext extends ParserRuleContext {
		public TerminalNode BOOL_LITERAL() { return getToken(LacLangParser.BOOL_LITERAL, 0); }
		public TerminalNode NUMBER_LITERAL() { return getToken(LacLangParser.NUMBER_LITERAL, 0); }
		public TerminalNode STRING_LITERAL() { return getToken(LacLangParser.STRING_LITERAL, 0); }
		public TerminalNode BYTES_LITERAL() { return getToken(LacLangParser.BYTES_LITERAL, 0); }
		public TerminalNode ADDRESS_LITERAL() { return getToken(LacLangParser.ADDRESS_LITERAL, 0); }
		public LiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literal; }
	}

	public final LiteralContext literal() throws RecognitionException {
		LiteralContext _localctx = new LiteralContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_literal);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(98);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 16252928L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\u0004\u0001\u001ae\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007\u0002"+
		"\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b\u0001"+
		"\u0000\u0005\u0000\u001a\b\u0000\n\u0000\f\u0000\u001d\t\u0000\u0001\u0000"+
		"\u0001\u0000\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0003\u0001&\b\u0001\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004"+
		"\u0001\u0004\u0001\u0004\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005"+
		"\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005B\b\u0005"+
		"\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005H\b\u0005"+
		"\u0001\u0005\u0003\u0005K\b\u0005\u0001\u0005\u0001\u0005\u0001\u0006"+
		"\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0007\u0001\u0007\u0001\b\u0001"+
		"\b\u0001\t\u0001\t\u0001\t\u0005\tZ\b\t\n\t\f\t]\t\t\u0001\n\u0001\n\u0003"+
		"\na\b\n\u0001\u000b\u0001\u000b\u0001\u000b\u0000\u0000\f\u0000\u0002"+
		"\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0000\u0002\u0001\u0000"+
		"\r\u0011\u0001\u0000\u0013\u0017b\u0000\u001b\u0001\u0000\u0000\u0000"+
		"\u0002%\u0001\u0000\u0000\u0000\u0004\'\u0001\u0000\u0000\u0000\u0006"+
		",\u0001\u0000\u0000\u0000\b3\u0001\u0000\u0000\u0000\n9\u0001\u0000\u0000"+
		"\u0000\fN\u0001\u0000\u0000\u0000\u000eR\u0001\u0000\u0000\u0000\u0010"+
		"T\u0001\u0000\u0000\u0000\u0012V\u0001\u0000\u0000\u0000\u0014`\u0001"+
		"\u0000\u0000\u0000\u0016b\u0001\u0000\u0000\u0000\u0018\u001a\u0003\u0002"+
		"\u0001\u0000\u0019\u0018\u0001\u0000\u0000\u0000\u001a\u001d\u0001\u0000"+
		"\u0000\u0000\u001b\u0019\u0001\u0000\u0000\u0000\u001b\u001c\u0001\u0000"+
		"\u0000\u0000\u001c\u001e\u0001\u0000\u0000\u0000\u001d\u001b\u0001\u0000"+
		"\u0000\u0000\u001e\u001f\u0005\u0000\u0000\u0001\u001f\u0001\u0001\u0000"+
		"\u0000\u0000 &\u0003\u0004\u0002\u0000!&\u0003\u0006\u0003\u0000\"&\u0003"+
		"\b\u0004\u0000#&\u0003\n\u0005\u0000$&\u0003\f\u0006\u0000% \u0001\u0000"+
		"\u0000\u0000%!\u0001\u0000\u0000\u0000%\"\u0001\u0000\u0000\u0000%#\u0001"+
		"\u0000\u0000\u0000%$\u0001\u0000\u0000\u0000&\u0003\u0001\u0000\u0000"+
		"\u0000\'(\u0005\u0001\u0000\u0000()\u0003\u000e\u0007\u0000)*\u0005\u0018"+
		"\u0000\u0000*+\u0005\u0002\u0000\u0000+\u0005\u0001\u0000\u0000\u0000"+
		",-\u0005\u0003\u0000\u0000-.\u0003\u000e\u0007\u0000./\u0005\u0018\u0000"+
		"\u0000/0\u0005\u0004\u0000\u000001\u0003\u0016\u000b\u000012\u0005\u0002"+
		"\u0000\u00002\u0007\u0001\u0000\u0000\u000034\u0005\u0005\u0000\u0000"+
		"45\u0005\u0018\u0000\u000056\u0005\u0004\u0000\u000067\u0005\u0013\u0000"+
		"\u000078\u0005\u0002\u0000\u00008\t\u0001\u0000\u0000\u00009:\u0005\u0006"+
		"\u0000\u0000:;\u0003\u000e\u0007\u0000;<\u0005\u0018\u0000\u0000<=\u0005"+
		"\u0007\u0000\u0000=>\u0003\u0014\n\u0000>?\u0005\b\u0000\u0000?A\u0005"+
		"\t\u0000\u0000@B\u0003\u0012\t\u0000A@\u0001\u0000\u0000\u0000AB\u0001"+
		"\u0000\u0000\u0000BC\u0001\u0000\u0000\u0000CJ\u0005\n\u0000\u0000DE\u0005"+
		"\u000b\u0000\u0000EG\u0005\t\u0000\u0000FH\u0003\u0010\b\u0000GF\u0001"+
		"\u0000\u0000\u0000GH\u0001\u0000\u0000\u0000HI\u0001\u0000\u0000\u0000"+
		"IK\u0005\n\u0000\u0000JD\u0001\u0000\u0000\u0000JK\u0001\u0000\u0000\u0000"+
		"KL\u0001\u0000\u0000\u0000LM\u0005\u0002\u0000\u0000M\u000b\u0001\u0000"+
		"\u0000\u0000NO\u0005\f\u0000\u0000OP\u0005\u0018\u0000\u0000PQ\u0005\u0002"+
		"\u0000\u0000Q\r\u0001\u0000\u0000\u0000RS\u0007\u0000\u0000\u0000S\u000f"+
		"\u0001\u0000\u0000\u0000TU\u0003\u0012\t\u0000U\u0011\u0001\u0000\u0000"+
		"\u0000V[\u0003\u0014\n\u0000WX\u0005\u0012\u0000\u0000XZ\u0003\u0014\n"+
		"\u0000YW\u0001\u0000\u0000\u0000Z]\u0001\u0000\u0000\u0000[Y\u0001\u0000"+
		"\u0000\u0000[\\\u0001\u0000\u0000\u0000\\\u0013\u0001\u0000\u0000\u0000"+
		"][\u0001\u0000\u0000\u0000^a\u0005\u0018\u0000\u0000_a\u0003\u0016\u000b"+
		"\u0000`^\u0001\u0000\u0000\u0000`_\u0001\u0000\u0000\u0000a\u0015\u0001"+
		"\u0000\u0000\u0000bc\u0007\u0001\u0000\u0000c\u0017\u0001\u0000\u0000"+
		"\u0000\u0007\u001b%AGJ[`";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}