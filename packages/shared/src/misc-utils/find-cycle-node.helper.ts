import { DslNode, NodeWithReference } from '../types/dsl.types';

export const findCycle = (nodes: DslNode[]): NodeWithReference | null => {
  const nodeMap = new Map<string, DslNode>();
  nodes.forEach((node) => nodeMap.set(node.id, node));

  const visited = new Set<string>();
  const explored = new Set<string>();

  const hasCycle = (
    nodeId: string,
    parentNodeId: string,
  ): [/* isCyclic:  */ boolean, NodeWithReference?] => {
    if (visited.has(nodeId)) {
      return [true, { nodeId, parentNodeId }];
    }

    if (explored.has(nodeId)) {
      return [false];
    }

    const node = nodeMap.get(nodeId);
    if (!node) {
      throw new Error(`Node ${nodeId} not found in graph`);
    }

    visited.add(nodeId);

    for (const referenceId of node.references) {
      const recTest = hasCycle(referenceId, nodeId);

      if (recTest[0]) {
        return recTest;
      }
    }

    visited.delete(nodeId);
    explored.add(nodeId);

    return [false];
  };

  for (const node of nodes) {
    const cycleTestResult = hasCycle(node.id, '0');
    if (!explored.has(node.id) && cycleTestResult[0]) {
      return cycleTestResult[1]!;
    }
  }

  return null;
};
