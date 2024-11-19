import { ConstantDeclarationContext, VarDeclarationContext } from '../../antlr';
import {
  Artifacts,
  Constants,
  Evaluate,
  Instances,
  InstancesById,
  Variables,
} from './types';

export class LatentState {
  private constantsMap: Constants;

  private variablesMap: Variables;

  private artifactsMap: Artifacts;

  private instancesMap: Instances;

  private instancesByIdMap: InstancesById;

  private evaluateRelativeToInternal?: Evaluate;

  constructor() {
    this.constantsMap = new Map();

    this.variablesMap = new Map();

    this.artifactsMap = new Map();

    this.instancesMap = new Map();

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

  get instances() {
    return this.instancesMap;
  }

  get instancesById() {
    return this.instancesByIdMap;
  }

  get evaluateRelativeTo() {
    return this.evaluateRelativeToInternal;
  }
  set setEvaluateRelativeTo(value: Evaluate) {
    this.evaluateRelativeToInternal = value;
  }

  setVariables(ctx: VarDeclarationContext) {
    const { text: name } = ctx.IDENTIFIER();
    const { text: type } = ctx.dataType();

    this.variablesMap.set(name, { type, ctx });
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
