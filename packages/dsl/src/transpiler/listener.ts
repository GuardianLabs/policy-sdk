import { InstanceConfig } from '@guardian-network/shared/src/types/dsl.types';
import {
  ArtifactDeclarationContext,
  ConstantDeclarationContext,
  EvaluateStatementContext,
  InstanceDeclarationContext,
  LacLangListener,
  ProgramContext,
  VarDeclarationContext,
} from '../antlr';
import { nodeIdFromDeclaration as calculateNodeId } from '../ir-generation';
import { ErrorFactory } from './errors/ErrorFactory';
import {
  dereferenceArtifact,
  extractAndLookupExecArguments,
  extractAndLookupInitArguments,
} from './helpers';
import {
  findCycleAndThrow,
  findSelfReferenceAndThrow,
  lookupAndThrow,
  lookupOrThrow,
} from './helpers/validations.helper';
import { LatentState } from './state/LatentState';

export class LacLangTranspiler implements LacLangListener {
  constructor(public readonly latentState: LatentState = new LatentState()) {}

  enterVarDeclaration(ctx: VarDeclarationContext): void {
    const name = ctx.IDENTIFIER().text;

    lookupAndThrow(name, this.latentState.variables, (declared) =>
      ErrorFactory.variableAlreadyDefined(name, ctx, declared.ctx),
    );

    this.latentState.setVariables(ctx);
  }

  enterConstantDeclaration(ctx: ConstantDeclarationContext) {
    const name = ctx.IDENTIFIER().text;

    lookupAndThrow(name, this.latentState.constants, (declared) =>
      ErrorFactory.constantIsAlreadyDefined(name, ctx, declared.ctx),
    );

    this.latentState.setConstants(ctx);
  }

  enterArtifactDeclaration(ctx: ArtifactDeclarationContext) {
    const name = ctx.IDENTIFIER().text;

    lookupAndThrow(name, this.latentState.artifacts, (declared) =>
      ErrorFactory.artifactAlreadyDefined(name, ctx, declared.ctx),
    );

    this.latentState.setArtifacts(ctx);
  }

  enterInstanceDeclaration(ctx: InstanceDeclarationContext) {
    const name = ctx.IDENTIFIER().text;

    lookupAndThrow(name, this.latentState.instancesByName, (declared) =>
      ErrorFactory.instanceAlreadyDefined(name, ctx, declared.ctx),
    );

    const execArguments = extractAndLookupExecArguments(ctx, this.latentState);
    const initArguments = extractAndLookupInitArguments(ctx, this.latentState);

    const artifactDereferenced = dereferenceArtifact(
      ctx,
      this.latentState.artifacts,
    );

    const instanceConfig: InstanceConfig = {
      artifactAddress: artifactDereferenced,
      execArguments,
      initArguments,
    };

    const instancesCount = this.latentState.instancesByName.size;
    const nodeId = calculateNodeId(instanceConfig, instancesCount);

    // note: may be redundant cause in this case instance will not be even defined yet
    findSelfReferenceAndThrow(name, nodeId, execArguments, ctx);

    this.latentState.setInstancesByName(
      ctx,
      nodeId,
      instanceConfig,
      instancesCount,
    );

    this.latentState.setInstancesById(
      ctx,
      nodeId,
      instanceConfig,
      instancesCount,
    );

    // note: may be redundant due to linear declaration by design
    findCycleAndThrow(
      this.latentState.instancesByName,
      this.latentState.instancesById,
    );
  }

  enterEvaluateStatement(ctx: EvaluateStatementContext) {
    const previouslyDeclared = this.latentState.evaluateRelativeTo;
    if (!!previouslyDeclared) {
      throw ErrorFactory.evaluateAlreadyDeclared(ctx, previouslyDeclared.ctx);
    }

    const instanceName = ctx.IDENTIFIER().text;
    const refInst = lookupOrThrow(
      instanceName,
      this.latentState.instancesByName,
      ErrorFactory.instanceNotDefined(instanceName, ctx),
    );

    if (refInst.type != 'bool')
      throw ErrorFactory.evaluateTypeNotBool(instanceName, ctx, refInst.ctx);

    this.latentState.setEvaluateRelativeTo = {
      nodeId: refInst.id,
      ctx,
    };
  }

  exitProgram(ctx: ProgramContext) {
    if (!this.latentState.evaluateRelativeTo)
      throw ErrorFactory.noEvaluateStatement();
  }
}
