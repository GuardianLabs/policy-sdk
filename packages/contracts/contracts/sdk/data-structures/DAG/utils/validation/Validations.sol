// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { _isNodeExists, _isEdgeExists } from "./ValidationUtils.sol";
import { DAG, DAGNode } from "../../types/Types.sol";
import {
    NODE_ID_IS_NIL_ERR,
    EDDGE_ALREADY_EXISTS_ERR,
    CYCLIC_EDGE_IS_PROHIBITED_ERR,
    NODE_DOES_NOT_EXIST_ERR,
    NODE_ALREADY_EXISTS_ERR
} from "../../constants/Errors.sol";

function edgeNotExists(DAGNode storage node, uint256 _childNodeId) view {
    require(!_isEdgeExists(node, _childNodeId), EDDGE_ALREADY_EXISTS_ERR);
}

function edgeNotCyclic(uint256 nodeIdA, uint256 nodeIdB) pure {
    require(nodeIdA != nodeIdB, CYCLIC_EDGE_IS_PROHIBITED_ERR);
}

function nodeExists(DAG storage self, uint256 _nodeId) view {
    require(_isNodeExists(self, _nodeId), NODE_DOES_NOT_EXIST_ERR);
}

function nodeNotExist(DAG storage self, uint256 _nodeId) view {
    require(!_isNodeExists(self, _nodeId), NODE_ALREADY_EXISTS_ERR);
}

function nodeIdIsNotNill(uint256 _nodeId) pure {
    require(_nodeId != uint256(0), NODE_ID_IS_NIL_ERR);
}

function boolIsFalsyWithErr(bool value, string memory errorDescription) pure {
    require(value == false, errorDescription);
}
