import { InstanceConfig } from '@guardian-network/shared/src/types/dsl.types';
import {
  ArtifactDeclarationContext,
  ConstantDeclarationContext,
  InstanceDeclarationContext,
  VarDeclarationContext,
} from '../../antlr';
import { ErrorFactory } from '../errors';
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

  private onlyInjectedVariables?: boolean;

  // note: value properties (not Map) must not have defaults because :196 constraint
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

    let injection = ctx.injectionModifier()?.STRING_LITERAL().text;

    if (!injection && this.onlyInjectedVariables)
      throw ErrorFactory.nonInjectedVariable(name, ctx);

    injection = injection ?? '';

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

  setArtifacts(ctx: ArtifactDeclarationContext) {
    const { text: name } = ctx.IDENTIFIER();
    const { text: address } = ctx.ADDRESS_LITERAL();

    this.artifactsMap.set(name, {
      address,
      ctx,
    });
  }

  setInstancesByName(
    ctx: InstanceDeclarationContext,
    nodeId: string,
    instanceConfig: InstanceConfig,
    instancesCount: number,
  ) {
    const { text: name } = ctx.IDENTIFIER();
    const { text: type } = ctx.dataType();

    this.instancesByNameMap.set(name, {
      id: nodeId,
      config: instanceConfig,
      type,
      index: instancesCount,
      ctx,
    });
  }

  setInstancesById(
    ctx: InstanceDeclarationContext,
    nodeId: string,
    instanceConfig: InstanceConfig,
    instancesCount: number,
  ) {
    const { text: name } = ctx.IDENTIFIER();
    const { text: type } = ctx.dataType();

    this.instancesByIdMap.set(nodeId, {
      name,
      config: instanceConfig,
      type,
      index: instancesCount,
      ctx,
    });
  }

  setInjectionConstraint(allowNonInjectedVariables: boolean) {
    this.onlyInjectedVariables = !allowNonInjectedVariables;
  }

  merge(subState: LatentState) {
    for (const property of Object.keys(this)) {
      const indexingProperty = <keyof LatentState>property;

      try {
        if (this[indexingProperty] instanceof Map) {
          this.concatMaps(
            <Map<string, any>>subState[indexingProperty],
            this[indexingProperty],
          );
        } else {
          this.moveValue(subState[indexingProperty], this[indexingProperty]);
        }
      } catch (e) {
        throw ErrorFactory.importAmbiguity(property, (<Error>e).message);
      }
    }
  }

  private concatMaps<T>(
    source: Map<string, T | T[]>,
    target: Map<string, T | T[]>,
  ) {
    for (const originalKey of source.keys()) {
      const originalValue = source.get(originalKey) as T;

      if (target.get(originalKey) != undefined) {
        if (Array.isArray(originalValue)) {
          target.set(
            originalKey,
            originalValue.concat(target.get(originalKey)).sort(),
          );
          return;
        }

        throw new Error(
          `Ambiguity while merging maps: target already has "${originalKey}" record`,
        );
      }

      target.set(originalKey, originalValue);
    }
  }

  private moveValue<T>(source: T, target: T) {
    if (!!target) {
      throw new Error(
        `Ambiguity while merging values: target already set to "${target}"`,
      );
    }

    target = source;
  }
}
