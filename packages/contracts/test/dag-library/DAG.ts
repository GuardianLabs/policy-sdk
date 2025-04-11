enum Visited {
  UNVISITED = 0,
  VISITING = 1,
  VISITED = 2,
}

class SafeMap<K, V> extends Map<K, V> {
  private guardCondition(key: K): boolean {
    return this.has(key);
  }

  get(key: K): V {
    if (this.guardCondition(key)) {
      return super.get(key)!; // The exclamation mark asserts that the value exists
    } else {
      throw new Error(`Node '${String(key)}' does not exists`);
    }
  }
}

export class DAG<T> {
  private nodes: SafeMap<T, { children: Set<T>; parents: Set<T> }>;
  private nodeIds: Set<T>;

  constructor() {
    this.nodes = new SafeMap();
    this.nodeIds = new Set();
  }

  // note: add a new node to the graph
  addNode(nodeId: T): void {
    if (this.nodes.has(nodeId)) {
      throw new Error('Node already exists');
    }
    this.nodes.set(nodeId, { children: new Set(), parents: new Set() });
    this.nodeIds.add(nodeId);
  }

  // note: add nodes list to the graph
  addNodes(...nodeIds: T[]): void {
    for (let nodeId of nodeIds) {
      this.addNode(nodeId);
    }
  }

  // note: add a directed edge from parent to child
  addEdge(parentId: T, childId: T): void {
    const parentNode = this.nodes.get(parentId);
    const childNode = this.nodes.get(childId);

    parentNode.children.add(childId);
    childNode.parents.add(parentId);
  }

  // note: get the children of a node
  getChildren(nodeId: T): T[] {
    if (!this.nodes.has(nodeId)) {
      throw new Error('Node does not exist');
    }
    return Array.from(this.nodes.get(nodeId)!.children);
  }

  // note: get the parents of a node
  getParents(nodeId: T): T[] {
    if (!this.nodes.has(nodeId)) {
      throw new Error('Node does not exist');
    }
    return Array.from(this.nodes.get(nodeId)!.parents);
  }

  // note: check if a node exists
  nodeExists(nodeId: T): boolean {
    return this.nodes.has(nodeId);
  }

  // note: Topological Sort using DFS
  topologicalSort(): T[] {
    // 0 = unvisited, 1 = visiting, 2 = visited
    const visited: Map<T, Visited> = new Map();
    const sorted: T[] = [];

    const dfs = (nodeId: T): boolean => {
      if (visited.get(nodeId) === 1) {
        return true; // Cycle detected
      }
      if (visited.get(nodeId) === 2) {
        return false; // Already fully processed
      }

      visited.set(nodeId, 1); // Mark as visiting

      // note: Visit all the children
      for (const childId of this.getChildren(nodeId)) {
        if (dfs(childId)) {
          return true; // Cycle detected in DFS
        }
      }

      visited.set(nodeId, 2); // Mark as fully visited
      sorted.push(nodeId); // Add node to topological sort
      return false;
    };

    // note: Perform DFS for each unvisited node
    for (const nodeId of this.nodeIds) {
      if (visited.get(nodeId) === undefined) {
        if (dfs(nodeId)) {
          throw new Error('Graph contains a cycle');
        }
      }
    }

    return sorted.reverse(); // Return the topological sort in reverse order
  }

  // note: Check if the graph contains a cycle
  hasCycle(): boolean {
    const visited: Map<T, number> = new Map(); // 0 = unvisited, 1 = visiting, 2 = visited

    const dfs = (nodeId: T): boolean => {
      if (visited.get(nodeId) === 1) {
        return true; // Cycle detected
      }
      if (visited.get(nodeId) === 2) {
        return false; // Already fully processed
      }

      visited.set(nodeId, 1); // Mark as visiting

      // note: Visit all the children
      for (const childId of this.getChildren(nodeId)) {
        if (dfs(childId)) {
          return true; // Cycle detected in DFS
        }
      }

      visited.set(nodeId, 2); // Mark as fully visited
      return false;
    };

    // note: Check for a cycle in the graph
    for (const nodeId of this.nodeIds) {
      if (visited.get(nodeId) === undefined) {
        if (dfs(nodeId)) {
          return true; // Cycle detected
        }
      }
    }

    return false;
  }

  // note: Check if a node has any parents
  hasParents(childId: T): boolean {
    if (!this.nodes.has(childId)) {
      throw new Error('Child node does not exist');
    }
    return this.nodes.get(childId)!.parents.size > 0;
  }

  // note: Get all node ids in the graph
  getAllNodes(): T[] {
    return Array.from(this.nodeIds);
  }

  // note: Detect if there is a disconnected cluster
  hasDisconnectedCluster(startNode: T): boolean {
    const visited: Set<T> = new Set();

    // note: Helper function for DFS
    const dfs = (nodeId: T): void => {
      visited.add(nodeId);

      const neighborsNodes = [
        ...this.getChildren(nodeId),
        ...this.getParents(nodeId),
      ];
      // note: Visit all neighbors (children and parents)
      for (const neighbor of neighborsNodes) {
        const alreadyVisited = visited.has(neighbor);
        if (!alreadyVisited) {
          dfs(neighbor);
        }
      }
    };

    dfs(startNode);

    // note: After DFS, if all nodes are visited, the graph is connected. Otherwise, there's a disconnected cluster nodes.
    for (const nodeId of this.nodeIds) {
      const knownNode = visited.has(nodeId);
      if (!knownNode) {
        return true; // Found a disconnected node (from a clusetr with startNode ${startNode})
      }
    }

    return false; // No disconnected nodes found
  }
}
