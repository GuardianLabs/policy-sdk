import { InstanceConfig } from '@guardian-network/shared/src/types/dsl.types';
import { join, normalize } from 'node:path';
import {
  ArtifactDeclarationContext,
  ConstantDeclarationContext,
  DirectiveContext,
  EvaluateStatementContext,
  ImportStatementContext,
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
  fetchContent,
  isLocalRelativeUrl,
  isLocalUrl,
  TranspilerConfig,
} from './helpers';
import {
  findCycleAndThrow,
  findSelfReferenceAndThrow,
  lookupAndThrow,
  lookupOrThrow,
} from './helpers/validations.helper';
import { LatentState } from './state/LatentState';
import { Transpiler } from './Transpiler';

export class LacLangTranspiler implements LacLangListener {
  public latentState: LatentState = new LatentState();
  private config: TranspilerConfig;

  constructor(options: TranspilerConfig) {
    this.config = options;
  }

  enterDirective(ctx: DirectiveContext) {
    switch (true) {
      case !!ctx.directiveIndentifier().injectedOnlyDirective():
        this.latentState.setInjectionConstraint(false);
        break;
      default:
        throw ErrorFactory.unknownDirective(
          ctx.directiveIndentifier().text,
          ctx,
        );
    }
  }

  enterImportStatement(ctx: ImportStatementContext) {
    const url = ctx.STRING_LITERAL().text.replace(/^['"]|['"]$/g, '');
    const normalizedUrl =
      isLocalUrl(url) || isLocalRelativeUrl(url)
        ? normalize(join(this.config.sourcesDir, url))
        : url;

    const sources = fetchContent(normalizedUrl);

    const subTranspiler = Transpiler.create(sources, {
      partialSources: true,
      sourcesDir: this.config.sourcesDir,
    });
    subTranspiler.transpile();

    const subState = subTranspiler.getLatentState();
    this.latentState.merge(subState);
  }

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
      needsInitialization: !!initArguments,
      execArguments,
      initArguments: initArguments ?? [],
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
    if (!this.latentState.evaluateRelativeTo && !this.config.partialSources)
      throw ErrorFactory.noEvaluateStatement();
  }
}
