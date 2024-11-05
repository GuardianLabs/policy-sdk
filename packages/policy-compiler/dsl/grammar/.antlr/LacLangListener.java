// Generated from /Users/vladpriadko/AllData/Programming/Projects/Work/Lacero/policy-sdk/packages/policy-compiler/dsl/grammar/LacLang.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link LacLangParser}.
 */
public interface LacLangListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link LacLangParser#program}.
	 * @param ctx the parse tree
	 */
	void enterProgram(LacLangParser.ProgramContext ctx);
	/**
	 * Exit a parse tree produced by {@link LacLangParser#program}.
	 * @param ctx the parse tree
	 */
	void exitProgram(LacLangParser.ProgramContext ctx);
	/**
	 * Enter a parse tree produced by {@link LacLangParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterStatement(LacLangParser.StatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link LacLangParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitStatement(LacLangParser.StatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link LacLangParser#varDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterVarDeclaration(LacLangParser.VarDeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link LacLangParser#varDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitVarDeclaration(LacLangParser.VarDeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link LacLangParser#constantDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterConstantDeclaration(LacLangParser.ConstantDeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link LacLangParser#constantDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitConstantDeclaration(LacLangParser.ConstantDeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link LacLangParser#artifactDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterArtifactDeclaration(LacLangParser.ArtifactDeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link LacLangParser#artifactDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitArtifactDeclaration(LacLangParser.ArtifactDeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link LacLangParser#instanceDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterInstanceDeclaration(LacLangParser.InstanceDeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link LacLangParser#instanceDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitInstanceDeclaration(LacLangParser.InstanceDeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link LacLangParser#evaluateStatement}.
	 * @param ctx the parse tree
	 */
	void enterEvaluateStatement(LacLangParser.EvaluateStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link LacLangParser#evaluateStatement}.
	 * @param ctx the parse tree
	 */
	void exitEvaluateStatement(LacLangParser.EvaluateStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link LacLangParser#dataType}.
	 * @param ctx the parse tree
	 */
	void enterDataType(LacLangParser.DataTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link LacLangParser#dataType}.
	 * @param ctx the parse tree
	 */
	void exitDataType(LacLangParser.DataTypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link LacLangParser#constantsList}.
	 * @param ctx the parse tree
	 */
	void enterConstantsList(LacLangParser.ConstantsListContext ctx);
	/**
	 * Exit a parse tree produced by {@link LacLangParser#constantsList}.
	 * @param ctx the parse tree
	 */
	void exitConstantsList(LacLangParser.ConstantsListContext ctx);
	/**
	 * Enter a parse tree produced by {@link LacLangParser#argumentsList}.
	 * @param ctx the parse tree
	 */
	void enterArgumentsList(LacLangParser.ArgumentsListContext ctx);
	/**
	 * Exit a parse tree produced by {@link LacLangParser#argumentsList}.
	 * @param ctx the parse tree
	 */
	void exitArgumentsList(LacLangParser.ArgumentsListContext ctx);
	/**
	 * Enter a parse tree produced by {@link LacLangParser#identifier_or_literal}.
	 * @param ctx the parse tree
	 */
	void enterIdentifier_or_literal(LacLangParser.Identifier_or_literalContext ctx);
	/**
	 * Exit a parse tree produced by {@link LacLangParser#identifier_or_literal}.
	 * @param ctx the parse tree
	 */
	void exitIdentifier_or_literal(LacLangParser.Identifier_or_literalContext ctx);
	/**
	 * Enter a parse tree produced by {@link LacLangParser#literal}.
	 * @param ctx the parse tree
	 */
	void enterLiteral(LacLangParser.LiteralContext ctx);
	/**
	 * Exit a parse tree produced by {@link LacLangParser#literal}.
	 * @param ctx the parse tree
	 */
	void exitLiteral(LacLangParser.LiteralContext ctx);
}