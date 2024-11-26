export interface Node {
  id: string;
  references: string[];
}

type NodeAndReference = {
  nodeId: string;
  parentNodeId: string;
};

export function findCycle(nodes: Node[]): NodeAndReference | null {
  const nodeMap = new Map<string, Node>();
  nodes.forEach((node) => nodeMap.set(node.id, node));

  const visited = new Set<string>();
  const explored = new Set<string>();

  const hasCycle = (
    nodeId: string,
    parentNodeId: string,
  ): [isCyclic: boolean, NodeAndReference?] => {
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

    for (const refId of node.references) {
      const recTest = hasCycle(refId, nodeId);

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
}
