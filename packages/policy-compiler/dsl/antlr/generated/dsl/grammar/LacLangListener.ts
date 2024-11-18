// Generated from ./dsl/grammar/LacLang.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { ProgramContext } from "./LacLangParser";
import { StatementContext } from "./LacLangParser";
import { VarDeclarationContext } from "./LacLangParser";
import { InjectionModifierContext } from "./LacLangParser";
import { ConstantDeclarationContext } from "./LacLangParser";
import { ArtifactDeclarationContext } from "./LacLangParser";
import { InstanceDeclarationContext } from "./LacLangParser";
import { EvaluateStatementContext } from "./LacLangParser";
import { DataTypeContext } from "./LacLangParser";
import { ConstantsListContext } from "./LacLangParser";
import { ArgumentsListContext } from "./LacLangParser";
import { Identifier_or_literalContext } from "./LacLangParser";
import { LiteralContext } from "./LacLangParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `LacLangParser`.
 */
export interface LacLangListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `LacLangParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `LacLangParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `LacLangParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `LacLangParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `LacLangParser.varDeclaration`.
	 * @param ctx the parse tree
	 */
	enterVarDeclaration?: (ctx: VarDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `LacLangParser.varDeclaration`.
	 * @param ctx the parse tree
	 */
	exitVarDeclaration?: (ctx: VarDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `LacLangParser.injectionModifier`.
	 * @param ctx the parse tree
	 */
	enterInjectionModifier?: (ctx: InjectionModifierContext) => void;
	/**
	 * Exit a parse tree produced by `LacLangParser.injectionModifier`.
	 * @param ctx the parse tree
	 */
	exitInjectionModifier?: (ctx: InjectionModifierContext) => void;

	/**
	 * Enter a parse tree produced by `LacLangParser.constantDeclaration`.
	 * @param ctx the parse tree
	 */
	enterConstantDeclaration?: (ctx: ConstantDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `LacLangParser.constantDeclaration`.
	 * @param ctx the parse tree
	 */
	exitConstantDeclaration?: (ctx: ConstantDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `LacLangParser.artifactDeclaration`.
	 * @param ctx the parse tree
	 */
	enterArtifactDeclaration?: (ctx: ArtifactDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `LacLangParser.artifactDeclaration`.
	 * @param ctx the parse tree
	 */
	exitArtifactDeclaration?: (ctx: ArtifactDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `LacLangParser.instanceDeclaration`.
	 * @param ctx the parse tree
	 */
	enterInstanceDeclaration?: (ctx: InstanceDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `LacLangParser.instanceDeclaration`.
	 * @param ctx the parse tree
	 */
	exitInstanceDeclaration?: (ctx: InstanceDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `LacLangParser.evaluateStatement`.
	 * @param ctx the parse tree
	 */
	enterEvaluateStatement?: (ctx: EvaluateStatementContext) => void;
	/**
	 * Exit a parse tree produced by `LacLangParser.evaluateStatement`.
	 * @param ctx the parse tree
	 */
	exitEvaluateStatement?: (ctx: EvaluateStatementContext) => void;

	/**
	 * Enter a parse tree produced by `LacLangParser.dataType`.
	 * @param ctx the parse tree
	 */
	enterDataType?: (ctx: DataTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LacLangParser.dataType`.
	 * @param ctx the parse tree
	 */
	exitDataType?: (ctx: DataTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LacLangParser.constantsList`.
	 * @param ctx the parse tree
	 */
	enterConstantsList?: (ctx: ConstantsListContext) => void;
	/**
	 * Exit a parse tree produced by `LacLangParser.constantsList`.
	 * @param ctx the parse tree
	 */
	exitConstantsList?: (ctx: ConstantsListContext) => void;

	/**
	 * Enter a parse tree produced by `LacLangParser.argumentsList`.
	 * @param ctx the parse tree
	 */
	enterArgumentsList?: (ctx: ArgumentsListContext) => void;
	/**
	 * Exit a parse tree produced by `LacLangParser.argumentsList`.
	 * @param ctx the parse tree
	 */
	exitArgumentsList?: (ctx: ArgumentsListContext) => void;

	/**
	 * Enter a parse tree produced by `LacLangParser.identifier_or_literal`.
	 * @param ctx the parse tree
	 */
	enterIdentifier_or_literal?: (ctx: Identifier_or_literalContext) => void;
	/**
	 * Exit a parse tree produced by `LacLangParser.identifier_or_literal`.
	 * @param ctx the parse tree
	 */
	exitIdentifier_or_literal?: (ctx: Identifier_or_literalContext) => void;

	/**
	 * Enter a parse tree produced by `LacLangParser.literal`.
	 * @param ctx the parse tree
	 */
	enterLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Exit a parse tree produced by `LacLangParser.literal`.
	 * @param ctx the parse tree
	 */
	exitLiteral?: (ctx: LiteralContext) => void;
}

