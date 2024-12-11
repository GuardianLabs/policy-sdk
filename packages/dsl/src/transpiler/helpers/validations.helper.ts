import { mapToArray } from '@guardian-network/shared/src/misc-utils/data-structure-transformation.helper';
import { findCycle } from '@guardian-network/shared/src/misc-utils/find-cycle-node.helper';
import { TypedValue } from '@guardian-network/shared/src/types/dsl.types';
import { ParserRuleContext } from 'antlr4ts';
import { ErrorFactory } from '../errors/ErrorFactory';
import { extractReferenceNodeIds, formatInstanceReference } from '../helpers';
import { InstancesById, InstancesByName } from '../state/types';

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

  const cycleFound = findCycle(nodesList);

  if (!!cycleFound) {
    const invokingNode = instancesByIdMap.get(cycleFound.parentNodeId)!;
    const referencedNode = instancesByIdMap.get(cycleFound.nodeId)!;

    throw ErrorFactory.cyclicReferenceDSL(
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
  const maybeSelfReference = execArguments.find(
    ({ substitution, value }) =>
      !!substitution && value == formatInstanceReference(instanceId),
  );

  if (!!maybeSelfReference) {
    throw ErrorFactory.selfReferenceDSL(instanceName, ctx);
  }
};
