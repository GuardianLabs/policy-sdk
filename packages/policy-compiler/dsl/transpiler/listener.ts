import {
  ArtifactDeclarationContext,
  ConstantDeclarationContext,
  EvaluateStatementContext,
  InstanceDeclarationContext,
  LacLangListener,
  ProgramContext,
  VarDeclarationContext,
} from '../antlr';
import { nodeId } from '../transformer/helpers';
import {
  ArtifactAlreadyDefinedError,
  ConstantAlreadyDefinedError,
  EvaluateAlreadyDeclaredError,
  EvaluateTypeNotBoolError,
  findCycleAndThrow,
  findSelfReferenceAndThrow,
  InstanceAlreadyDefinedError,
  InstanceNotDefinedError,
  lookupAndThrow,
  lookupOrThrow,
  NoEvaluateStatementError,
  VariableAlreadyDefinedError,
} from './errors';
import {
  dereferenceArtifact,
  extractAndLookupExecArguments,
  extractAndLookupInitArguments,
} from './helpers';
import { LatentState } from './state/LatentState';

export class LacLangTranspiler implements LacLangListener {
  constructor(public readonly latentState: LatentState = new LatentState()) {}

  enterVarDeclaration(ctx: VarDeclarationContext): void {
    const name = ctx.IDENTIFIER().text;
    lookupAndThrow(
      name,
      this.latentState.variables,
      (declared) => new VariableAlreadyDefinedError(name, ctx, declared.ctx),
    );

    this.latentState.setVariables(ctx);
  }

  enterConstantDeclaration(ctx: ConstantDeclarationContext) {
    const name = ctx.IDENTIFIER().text;
    lookupAndThrow(
      name,
      this.latentState.constants,
      (declared) => new ConstantAlreadyDefinedError(name, ctx, declared.ctx),
    );

    this.latentState.setConstants(ctx);
  }

  enterArtifactDeclaration(ctx: ArtifactDeclarationContext) {
    const name = ctx.IDENTIFIER().text;
    lookupAndThrow(
      name,
      this.latentState.artifacts,
      (declared) => new ArtifactAlreadyDefinedError(name, ctx, declared.ctx),
    );

    this.latentState.artifacts.set(name, {
      address: ctx.ADDRESS_LITERAL().text,
      ctx,
    });
  }

  enterInstanceDeclaration(ctx: InstanceDeclarationContext) {
    const name = ctx.IDENTIFIER().text;
    lookupAndThrow(
      name,
      this.latentState.instancesByName,
      (declared) => new InstanceAlreadyDefinedError(name, ctx, declared.ctx),
    );

    const execArguments = extractAndLookupExecArguments(ctx, this.latentState);
    const initArguments = extractAndLookupInitArguments(ctx, this.latentState);

    let artifactDereferenced = dereferenceArtifact(
      ctx,
      this.latentState.artifacts,
    );

    const instanceConfig = {
      artifactAddress: artifactDereferenced,
      execArguments,
      initArguments,
    };

    const instancesCount = this.latentState.instancesByName.size;
    const id = nodeId(instanceConfig, instancesCount);

    findSelfReferenceAndThrow(name, id, execArguments, ctx); // note: may be redundant cause in this case instance will not be even defined yet

    this.latentState.instancesByName.set(name, {
      ctx,
      id,
      config: instanceConfig,
      type: ctx.dataType().text,
      index: instancesCount,
    });

    this.latentState.instancesById.set(id, {
      ctx,
      name,
      config: instanceConfig,
      type: ctx.dataType().text,
      index: instancesCount,
    });

    findCycleAndThrow(
      this.latentState.instancesByName,
      this.latentState.instancesById,
    ); // note: may be redundant due to linear declaration by design
  }

  enterEvaluateStatement(ctx: EvaluateStatementContext) {
    const previouslyDeclared = this.latentState.evaluateRelativeTo;
    if (previouslyDeclared)
      throw new EvaluateAlreadyDeclaredError(ctx, previouslyDeclared.ctx);

    const instName = ctx.IDENTIFIER().text;
    const refInst = lookupOrThrow(
      instName,
      this.latentState.instancesByName,
      new InstanceNotDefinedError(instName, ctx),
    );

    if (refInst.type != 'bool')
      throw new EvaluateTypeNotBoolError(instName, ctx, refInst.ctx);

    this.latentState.setEvaluateRelativeTo = {
      nodeId: refInst.id,
      ctx,
    };
  }

  exitProgram(ctx: ProgramContext) {
    if (!this.latentState.evaluateRelativeTo)
      throw new NoEvaluateStatementError();
  }
}
