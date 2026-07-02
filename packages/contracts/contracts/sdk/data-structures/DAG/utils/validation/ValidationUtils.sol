// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { DAG, DAGNode as Node } from "../../types/Types.sol";

function _isEdgeExists(Node storage node, uint256 _childNodeId) view returns (bool isEdge) {
    isEdge = node.edges[_childNodeId];
}

// note: check if a node exists
function _isNodeExists(DAG storage self, uint256 _nodeId) view returns (bool exists) {
    exists = self.nodes[_nodeId].id != 0;
}
