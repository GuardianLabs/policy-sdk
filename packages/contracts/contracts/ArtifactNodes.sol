//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import {
    SUPPLIED_VARIABLES_LIST_LENGTH_NOT_MATCHES_EXPECTED_LENGTH_ERR,
    NODE_ID_IS_ALREADY_EXISTS_ERR,
    SUPPLIED_NODE_ID_IS_NIL_ERR,
    NODE_NOT_EXISTS_ERR,
    NODE_INDEX_NOT_EXISTS_ERR,
    PROVIDED_NODE_REFERENCE_IS_NIL_ERR
} from "./Errors.sol";
import { IArbitraryDataArtifact } from "./pre-defined/common/basis/interfaces/Export.sol";
import {
    Node,
    ConstantArgument,
    SubstitutionArgument,
    NodeInitData,
    ExecVariables
} from "./Types.sol";
import { ArtifactNodesBase } from "./ArtifactNodesBase.sol";
import "./Utilities.sol" as Utils;

contract ArtifactNodes is ArtifactNodesBase {
    constructor(address _adminUser) ArtifactNodesBase(_adminUser) {}

    function addNode(NodeInitData memory params) public onlyOwner returns (uint256 newNodeIndex) {
        require(params.id != bytes32(0), SUPPLIED_NODE_ID_IS_NIL_ERR);
        require(idToIndex[params.id] == 0, NODE_ID_IS_ALREADY_EXISTS_ERR);

        newNodeIndex = addNodeInternal(params);
    }

    function setRootNode(bytes32 _rootNodeId) public onlyOwner {
        // note: _rootNodeId != bytes32(0) is implicitly validated at higher level

        // todo: add the way to validate graph.node[params.rootNode] evaluates as bool
        // 1. getNodeById
        // 2. node.toArtifact
        // 3. artifact.getExecDescriptor
        // 4. returnType == "bool"
        rootNodeId = _rootNodeId;
    }

    // note: policy tree can not be too broad or
    // cyclic, because of stack depth (see: PolicyHandler.set)
    function evaluateRecursively(
        Node memory node,
        ExecVariables[] memory variableValuesList // vars for each node
    ) public onlyOwner returns (bytes memory result) {
        // note: general list containing the all values of Node
        // (known constants, applied substitutions, run-time supplied variable-values)
        bytes[] memory generalArgumentsList = new bytes[](node.argsCount);

        fillVariableArguments(node, generalArgumentsList, variableValuesList);

        fillConstantArguments(node, generalArgumentsList);

        fillSubstitutedArguments(node, generalArgumentsList, variableValuesList);

        IArbitraryDataArtifact instance = Utils.toArtifactInstance(node);
        result = instance.exec(generalArgumentsList);
    }

    function getRootNode() public view onlyOwner returns (Node memory result) {
        result = getNodeById(rootNodeId);
    }

    // get node by unique ID
    function getNodeById(bytes32 uniqueNodeIdentifier) public view returns (Node memory node) {
        require(uniqueNodeIdentifier != bytes32(0), PROVIDED_NODE_REFERENCE_IS_NIL_ERR);

        uint256 nodeIndex = idToIndex[uniqueNodeIdentifier];
        require(nodeIndex > 0, NODE_NOT_EXISTS_ERR);

        node = getNodeByIndex(nodeIndex);
    }

    // get node by index in nodes list
    function getNodeByIndex(uint256 index) public view returns (Node memory node) {
        require(index < nodes.length, NODE_INDEX_NOT_EXISTS_ERR);

        node = nodes[index];
    }

    function getNodes() public view returns (Node[] memory) {
        return nodes;
    }

    function fillSubstitutedArguments(
        Node memory node,
        bytes[] memory argsList,
        ExecVariables[] memory variableValuesList
    ) private {
        /* note about caching: cache has to be avoided since some artifatcs may have sensitive state 
            to incoming exec calls, therefore, if there are at least two calls for the same artifact instance during the
            recursion, then cache becomes invalide and its purpose fails */

        // note: writting evaluation results of each child node as exec arguments of the currently processed one
        for (uint256 i = 0; i < node.substitutedExecArgs.length; i++) {
            SubstitutionArgument memory substituting = node.substitutedExecArgs[i];

            Node memory childNode = getNodeById(substituting.supplierNodeId);

            bytes memory childNodeExecResult = evaluateRecursively(childNode, variableValuesList);

            argsList[substituting.index] = childNodeExecResult;
        }
    }

    function fillVariableArguments(
        Node memory node,
        bytes[] memory argsList,
        ExecVariables[] memory variableValuesList
    ) private pure {
        bytes[] memory nodeVars = Utils.filterSpecificNodeVariables(variableValuesList, node.id);

        // note: this validates 'variableValuesList' eventually contains all run-time required vars for a given node-id
        require(
            node.variableExecArgs.length == nodeVars.length,
            SUPPLIED_VARIABLES_LIST_LENGTH_NOT_MATCHES_EXPECTED_LENGTH_ERR
        );

        // note: writing run-time supplied variables to exec arguments
        for (uint256 i = 0; i < node.variableExecArgs.length; i++) {
            uint256 pos = node.variableExecArgs[i];
            argsList[pos] = nodeVars[i];
        }
    }

    function fillConstantArguments(Node memory node, bytes[] memory argsList) private pure {
        // note: writing constans to exec arguments
        for (uint256 i = 0; i < node.constantExecArgs.length; i++) {
            ConstantArgument memory arg = node.constantExecArgs[i];
            uint256 pos = arg.index;
            argsList[pos] = arg.value;
        }
    }
}
