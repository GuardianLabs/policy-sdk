import { ConstantDeclarationContext, VarDeclarationContext } from '../../antlr';
import {
  Artifacts,
  Constants,
  Evaluating,
  InstancesById,
  InstancesByName,
  Variables,
} from './types';

export class LatentState {
  private constantsMap: Constants;

  private variablesMap: Variables;

  private artifactsMap: Artifacts;

  private instancesByNameMap: InstancesByName;

  private instancesByIdMap: InstancesById;

  private evaluateRelativeToInternal?: Evaluating;

  constructor() {
    this.constantsMap = new Map();

    this.variablesMap = new Map();

    this.artifactsMap = new Map();

    this.instancesByNameMap = new Map();

    this.instancesByIdMap = new Map();
  }

  get constants() {
    return this.constantsMap;
  }

  get variables() {
    return this.variablesMap;
  }

  get artifacts() {
    return this.artifactsMap;
  }

  get instancesByName() {
    return this.instancesByNameMap;
  }

  get instancesById() {
    return this.instancesByIdMap;
  }

  get evaluateRelativeTo() {
    return this.evaluateRelativeToInternal;
  }
  set setEvaluateRelativeTo(value: Evaluating) {
    this.evaluateRelativeToInternal = value;
  }

  setVariables(ctx: VarDeclarationContext) {
    const { text: name } = ctx.IDENTIFIER();
    const { text: type } = ctx.dataType();
    const injection = ctx.injectionModifier() ? ctx.injectionModifier()!.STRING_LITERAL().text : "";

    this.variablesMap.set(name, { type, ctx, injection });
  }

  setConstants(ctx: ConstantDeclarationContext) {
    const { text: name } = ctx.IDENTIFIER();
    const { text: value } = ctx.literal();
    const { text: type } = ctx.dataType();

    this.constantsMap.set(name, {
      value,
      type,
      ctx,
    });
  }
}
