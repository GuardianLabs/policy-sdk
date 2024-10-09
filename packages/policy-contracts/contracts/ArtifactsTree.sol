//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import {
    INCORRECT_NODE_ARGUMENTS_NUMBER_IS_SUPPLIED_ERR,
    NODE_NOT_EXISTS_ERR,
    REFERENCE_TO_NODE_IS_MISSING_ERR
} from "./Errors.sol";
import { IArbitraryDataArtifact } from "./pre-defined/common/basis/interfaces/Export.sol";
import {
    BytesAndIndex,
    Bytes32AndIndex,
    Argument,
    NamedTypedVariables,
    Node,
    TreeNodeInitParams,
    Variables,
    CacheRecord
} from "./Types.sol";
import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";

contract ArtifactsTree {
    Node[] public nodes;
    mapping(bytes32 => uint256) public idToIndex;
    address private admin;

    constructor(address _admin) {
        admin = _admin;

        nodes.push();
        Node storage newNode = nodes[nodes.length - 1];
        newNode.id = bytes32(0);
    }

    // todo: only admin is permitted
    function addNode(TreeNodeInitParams memory params) public returns (uint256 index) {
        /* todo */
    }

    // todo: only admin is permitted
    // note: policy tree can not be too broad or cyclic cause of stack depth
    function evaluateRecursively(
        Node memory node,
        Variables[] memory variables,
        CacheRecord[] memory cache,
        uint256 lastCacheRecord
    ) public returns (bytes memory result) {
        /* todo */
    }

    function getNodesCount() public view returns (uint256) {
        return nodes.length;
    }

    function getNode(uint256 index) public view returns (Node memory) {
        require(index < nodes.length, NODE_NOT_EXISTS_ERR);
        return nodes[index];
    }

    function getVariables() public view returns (NamedTypedVariables[] memory vars) {
        /* todo */
    }

    function getNodeById(bytes32 _id) public view returns (Node memory) {
        /* todo */
    }
}
