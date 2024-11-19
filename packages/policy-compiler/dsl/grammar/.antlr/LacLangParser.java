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
		T__17=18, T__18=19, ADDRESS_LITERAL=20, BOOL_LITERAL=21, NUMBER_LITERAL=22, 
		STRING_LITERAL=23, BYTES_LITERAL=24, IDENTIFIER=25, WHITESPACE=26, COMMENT=27;
	public static final int
		RULE_program = 0, RULE_statement = 1, RULE_varDeclaration = 2, RULE_injectionModifier = 3, 
		RULE_constantDeclaration = 4, RULE_artifactDeclaration = 5, RULE_instanceDeclaration = 6, 
		RULE_evaluateStatement = 7, RULE_dataType = 8, RULE_constantsList = 9, 
		RULE_argumentsList = 10, RULE_identifier_or_literal = 11, RULE_literal = 12;
	private static String[] makeRuleNames() {
		return new String[] {
			"program", "statement", "varDeclaration", "injectionModifier", "constantDeclaration", 
			"artifactDeclaration", "instanceDeclaration", "evaluateStatement", "dataType", 
			"constantsList", "argumentsList", "identifier_or_literal", "literal"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'var'", "';'", "'inject'", "'('", "')'", "'constant'", "'='", 
			"'artifact'", "'instance'", "'of'", "'takes'", "'with'", "'evaluate'", 
			"'bool'", "'number'", "'string'", "'bytes'", "'address'", "','"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, "ADDRESS_LITERAL", "BOOL_LITERAL", 
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
			setState(29);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 9026L) != 0)) {
				{
				{
				setState(26);
				statement();
				}
				}
				setState(31);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(32);
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
			setState(39);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__0:
				enterOuterAlt(_localctx, 1);
				{
				setState(34);
				varDeclaration();
				}
				break;
			case T__5:
				enterOuterAlt(_localctx, 2);
				{
				setState(35);
				constantDeclaration();
				}
				break;
			case T__7:
				enterOuterAlt(_localctx, 3);
				{
				setState(36);
				artifactDeclaration();
				}
				break;
			case T__8:
				enterOuterAlt(_localctx, 4);
				{
				setState(37);
				instanceDeclaration();
				}
				break;
			case T__12:
				enterOuterAlt(_localctx, 5);
				{
				setState(38);
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
		public InjectionModifierContext injectionModifier() {
			return getRuleContext(InjectionModifierContext.class,0);
		}
		public VarDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_varDeclaration; }
	}

	public final VarDeclarationContext varDeclaration() throws RecognitionException {
		VarDeclarationContext _localctx = new VarDeclarationContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_varDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(41);
			match(T__0);
			setState(43);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__2) {
				{
				setState(42);
				injectionModifier();
				}
			}

			setState(45);
			dataType();
			setState(46);
			match(IDENTIFIER);
			setState(47);
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
	public static class InjectionModifierContext extends ParserRuleContext {
		public TerminalNode STRING_LITERAL() { return getToken(LacLangParser.STRING_LITERAL, 0); }
		public InjectionModifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_injectionModifier; }
	}

	public final InjectionModifierContext injectionModifier() throws RecognitionException {
		InjectionModifierContext _localctx = new InjectionModifierContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_injectionModifier);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(49);
			match(T__2);
			setState(50);
			match(T__3);
			setState(51);
			match(STRING_LITERAL);
			setState(52);
			match(T__4);
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
		enterRule(_localctx, 8, RULE_constantDeclaration);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(54);
			match(T__5);
			setState(55);
			dataType();
			setState(56);
			match(IDENTIFIER);
			setState(57);
			match(T__6);
			setState(58);
			literal();
			setState(59);
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
		enterRule(_localctx, 10, RULE_artifactDeclaration);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(61);
			match(T__7);
			setState(62);
			match(IDENTIFIER);
			setState(63);
			match(T__6);
			setState(64);
			match(ADDRESS_LITERAL);
			setState(65);
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
		enterRule(_localctx, 12, RULE_instanceDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(67);
			match(T__8);
			setState(68);
			dataType();
			setState(69);
			match(IDENTIFIER);
			setState(70);
			match(T__9);
			setState(71);
			identifier_or_literal();
			setState(72);
			match(T__10);
			setState(73);
			match(T__3);
			setState(75);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 66060288L) != 0)) {
				{
				setState(74);
				argumentsList();
				}
			}

			setState(77);
			match(T__4);
			setState(84);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__11) {
				{
				setState(78);
				match(T__11);
				setState(79);
				match(T__3);
				setState(81);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 66060288L) != 0)) {
					{
					setState(80);
					constantsList();
					}
				}

				setState(83);
				match(T__4);
				}
			}

			setState(86);
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
		enterRule(_localctx, 14, RULE_evaluateStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(88);
			match(T__12);
			setState(89);
			match(IDENTIFIER);
			setState(90);
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
		enterRule(_localctx, 16, RULE_dataType);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(92);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 507904L) != 0)) ) {
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
		enterRule(_localctx, 18, RULE_constantsList);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(94);
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
		enterRule(_localctx, 20, RULE_argumentsList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(96);
			identifier_or_literal();
			setState(101);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__18) {
				{
				{
				setState(97);
				match(T__18);
				setState(98);
				identifier_or_literal();
				}
				}
				setState(103);
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
		enterRule(_localctx, 22, RULE_identifier_or_literal);
		try {
			setState(106);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case IDENTIFIER:
				enterOuterAlt(_localctx, 1);
				{
				setState(104);
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
				setState(105);
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
		enterRule(_localctx, 24, RULE_literal);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(108);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 32505856L) != 0)) ) {
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
		"\u0004\u0001\u001bo\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007\u0002"+
		"\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b\u0002"+
		"\f\u0007\f\u0001\u0000\u0005\u0000\u001c\b\u0000\n\u0000\f\u0000\u001f"+
		"\t\u0000\u0001\u0000\u0001\u0000\u0001\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0001\u0001\u0001\u0003\u0001(\b\u0001\u0001\u0002\u0001\u0002\u0003"+
		"\u0002,\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0004\u0001"+
		"\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001"+
		"\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001"+
		"\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001"+
		"\u0006\u0001\u0006\u0003\u0006L\b\u0006\u0001\u0006\u0001\u0006\u0001"+
		"\u0006\u0001\u0006\u0003\u0006R\b\u0006\u0001\u0006\u0003\u0006U\b\u0006"+
		"\u0001\u0006\u0001\u0006\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007"+
		"\u0001\b\u0001\b\u0001\t\u0001\t\u0001\n\u0001\n\u0001\n\u0005\nd\b\n"+
		"\n\n\f\ng\t\n\u0001\u000b\u0001\u000b\u0003\u000bk\b\u000b\u0001\f\u0001"+
		"\f\u0001\f\u0000\u0000\r\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012"+
		"\u0014\u0016\u0018\u0000\u0002\u0001\u0000\u000e\u0012\u0001\u0000\u0014"+
		"\u0018l\u0000\u001d\u0001\u0000\u0000\u0000\u0002\'\u0001\u0000\u0000"+
		"\u0000\u0004)\u0001\u0000\u0000\u0000\u00061\u0001\u0000\u0000\u0000\b"+
		"6\u0001\u0000\u0000\u0000\n=\u0001\u0000\u0000\u0000\fC\u0001\u0000\u0000"+
		"\u0000\u000eX\u0001\u0000\u0000\u0000\u0010\\\u0001\u0000\u0000\u0000"+
		"\u0012^\u0001\u0000\u0000\u0000\u0014`\u0001\u0000\u0000\u0000\u0016j"+
		"\u0001\u0000\u0000\u0000\u0018l\u0001\u0000\u0000\u0000\u001a\u001c\u0003"+
		"\u0002\u0001\u0000\u001b\u001a\u0001\u0000\u0000\u0000\u001c\u001f\u0001"+
		"\u0000\u0000\u0000\u001d\u001b\u0001\u0000\u0000\u0000\u001d\u001e\u0001"+
		"\u0000\u0000\u0000\u001e \u0001\u0000\u0000\u0000\u001f\u001d\u0001\u0000"+
		"\u0000\u0000 !\u0005\u0000\u0000\u0001!\u0001\u0001\u0000\u0000\u0000"+
		"\"(\u0003\u0004\u0002\u0000#(\u0003\b\u0004\u0000$(\u0003\n\u0005\u0000"+
		"%(\u0003\f\u0006\u0000&(\u0003\u000e\u0007\u0000\'\"\u0001\u0000\u0000"+
		"\u0000\'#\u0001\u0000\u0000\u0000\'$\u0001\u0000\u0000\u0000\'%\u0001"+
		"\u0000\u0000\u0000\'&\u0001\u0000\u0000\u0000(\u0003\u0001\u0000\u0000"+
		"\u0000)+\u0005\u0001\u0000\u0000*,\u0003\u0006\u0003\u0000+*\u0001\u0000"+
		"\u0000\u0000+,\u0001\u0000\u0000\u0000,-\u0001\u0000\u0000\u0000-.\u0003"+
		"\u0010\b\u0000./\u0005\u0019\u0000\u0000/0\u0005\u0002\u0000\u00000\u0005"+
		"\u0001\u0000\u0000\u000012\u0005\u0003\u0000\u000023\u0005\u0004\u0000"+
		"\u000034\u0005\u0017\u0000\u000045\u0005\u0005\u0000\u00005\u0007\u0001"+
		"\u0000\u0000\u000067\u0005\u0006\u0000\u000078\u0003\u0010\b\u000089\u0005"+
		"\u0019\u0000\u00009:\u0005\u0007\u0000\u0000:;\u0003\u0018\f\u0000;<\u0005"+
		"\u0002\u0000\u0000<\t\u0001\u0000\u0000\u0000=>\u0005\b\u0000\u0000>?"+
		"\u0005\u0019\u0000\u0000?@\u0005\u0007\u0000\u0000@A\u0005\u0014\u0000"+
		"\u0000AB\u0005\u0002\u0000\u0000B\u000b\u0001\u0000\u0000\u0000CD\u0005"+
		"\t\u0000\u0000DE\u0003\u0010\b\u0000EF\u0005\u0019\u0000\u0000FG\u0005"+
		"\n\u0000\u0000GH\u0003\u0016\u000b\u0000HI\u0005\u000b\u0000\u0000IK\u0005"+
		"\u0004\u0000\u0000JL\u0003\u0014\n\u0000KJ\u0001\u0000\u0000\u0000KL\u0001"+
		"\u0000\u0000\u0000LM\u0001\u0000\u0000\u0000MT\u0005\u0005\u0000\u0000"+
		"NO\u0005\f\u0000\u0000OQ\u0005\u0004\u0000\u0000PR\u0003\u0012\t\u0000"+
		"QP\u0001\u0000\u0000\u0000QR\u0001\u0000\u0000\u0000RS\u0001\u0000\u0000"+
		"\u0000SU\u0005\u0005\u0000\u0000TN\u0001\u0000\u0000\u0000TU\u0001\u0000"+
		"\u0000\u0000UV\u0001\u0000\u0000\u0000VW\u0005\u0002\u0000\u0000W\r\u0001"+
		"\u0000\u0000\u0000XY\u0005\r\u0000\u0000YZ\u0005\u0019\u0000\u0000Z[\u0005"+
		"\u0002\u0000\u0000[\u000f\u0001\u0000\u0000\u0000\\]\u0007\u0000\u0000"+
		"\u0000]\u0011\u0001\u0000\u0000\u0000^_\u0003\u0014\n\u0000_\u0013\u0001"+
		"\u0000\u0000\u0000`e\u0003\u0016\u000b\u0000ab\u0005\u0013\u0000\u0000"+
		"bd\u0003\u0016\u000b\u0000ca\u0001\u0000\u0000\u0000dg\u0001\u0000\u0000"+
		"\u0000ec\u0001\u0000\u0000\u0000ef\u0001\u0000\u0000\u0000f\u0015\u0001"+
		"\u0000\u0000\u0000ge\u0001\u0000\u0000\u0000hk\u0005\u0019\u0000\u0000"+
		"ik\u0003\u0018\f\u0000jh\u0001\u0000\u0000\u0000ji\u0001\u0000\u0000\u0000"+
		"k\u0017\u0001\u0000\u0000\u0000lm\u0007\u0001\u0000\u0000m\u0019\u0001"+
		"\u0000\u0000\u0000\b\u001d\'+KQTej";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}