import { ParserRuleContext } from 'antlr4ts';
import {
  extractReferenceNodeIds,
  formatInstanceReference,
  mapToArray,
  TypedValue,
} from '../helpers';
import { InstancesById, InstancesByName } from '../state/types';
import { findCycle } from '../validations';
import { CyclicReferenceError, SelfReferenceError } from './';

export const lookupOrThrow = <T>(
  key: string,
  storage: Map<string, T>,
  error: Error,
) => {
  const item = storage.get(key);

  if (!item) throw error;

  return item;
};

export const lookupAndThrow = <T>(
  key: string,
  storage: Map<string, T>,
  errorMorph: (item: T) => Error,
) => {
  const item = storage.get(key);

  if (!!item) throw errorMorph(item);
};

export const findCycleAndThrow = (
  instancesByNameMap: InstancesByName,
  instancesByIdMap: InstancesById,
) => {
  const instancesList = mapToArray(instancesByNameMap);

  const nodesList = instancesList.map((instance) => ({
    id: instance.id,
    references: extractReferenceNodeIds(instance.config),
  }));

  const cycle = findCycle(nodesList);

  if (!!cycle) {
    const invokingNode = instancesByIdMap.get(cycle.parentNodeId)!;
    const referencedNode = instancesByIdMap.get(cycle.nodeId)!;

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
  instanceId: string, // same as nodeId
  execArguments: TypedValue[],
  ctx: ParserRuleContext,
) => {
  const selfReference = execArguments.find(
    (el) => el.substitution && el.value == formatInstanceReference(instanceId),
  );
  if (selfReference) throw new SelfReferenceError(instanceName, ctx);
};
