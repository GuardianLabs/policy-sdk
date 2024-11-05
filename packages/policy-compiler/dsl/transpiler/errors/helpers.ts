import { ParserRuleContext } from 'antlr4ts';
import {
  extractReferenceNodeIds,
  formatInstanceReference,
  mapToArray,
  TypedValue,
} from '../helpers';
import { Instances, InstancesById } from '../state';
import { findCycle } from '../validations';
import { CyclicReferenceError, SelfReferenceError } from './';

export const lookupOrThrow = (
  key: string,
  storage: Map<string, any>,
  error: Error,
) => {
  const item = storage.get(key);
  if (!item) throw error;

  return item;
};

export const lookupAndThrow = (
  key: string,
  storage: Map<string, any>,
  errorMorph: (item: any) => Error,
) => {
  const item = storage.get(key);
  if (item) throw errorMorph(item);
};

export const findCycleAndThrow = (
  instancesByNameMap: Instances,
  instancesByIdMap: InstancesById,
) => {
  const cycleFound = findCycle(
    mapToArray(instancesByNameMap).map(({ id, config }) => ({
      id,
      references: extractReferenceNodeIds(config),
    })),
  );

  if (cycleFound) {
    const invokingNode = instancesByIdMap.get(cycleFound.parentNodeId)!;
    const referencedNode = instancesByIdMap.get(cycleFound.nodeId)!;

    throw new CyclicReferenceError(
      invokingNode.name,
      referencedNode.name,
      invokingNode.ctx,
      referencedNode.ctx,
    );
  }
};

export const findSelfReferenceAndThrow = (
  instanceName: string,
  instanceId: string,
  execArguments: TypedValue[],
  ctx: ParserRuleContext,
) => {
  const selfReference = execArguments.find(
    (el) => el.substitution && el.value == formatInstanceReference(instanceId),
  );
  if (selfReference) throw new SelfReferenceError(instanceName, ctx);
};
