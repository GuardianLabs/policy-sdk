//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { InternalContainerDAG } from "./data-structures/DAG/Export.sol";
import { NodeInitData, Node } from "./Types.sol";
import { OwnerBase } from "./OwnerBase.sol";
import "./Validations.sol" as Validate;
import "./Utilities.sol" as Utils;

contract ArtifactNodesBase is InternalContainerDAG, OwnerBase {
    bytes32 internal rootNodeId;
    Node[] internal nodes;

    // mapping(uint256 => bytes32) internal indexToId; // nodeIndexToId
    mapping(bytes32 => uint256) internal idToIndex; // nodeIdToIndex

    constructor(address _adminUser) OwnerBase(_adminUser) {
        // note: the first node is always empty. its index: 0, its id: bytes32(0)
        bytes32 firstNodeId = bytes32(0);
        createEmptyNodeWithId(firstNodeId);
    }

    function addNodeInternal(
        NodeInitData memory nodeParams
    ) internal returns (uint256 newNodeIndex) {
        Node storage newNode;

        (newNode, newNodeIndex) = createEmptyNodeWithId(nodeParams.id);

        maybeCreateArtifactState(newNode, nodeParams);

        setNodeConstants(newNode, nodeParams);

        setNodeVariables(newNode, nodeParams);

        setNodeInjections(newNode, nodeParams);

        setNodeSubstibutions(newNode, nodeParams);

        // note: this has to be the final setter call in the method body; order matters
        setArgsCount(newNode, nodeParams);
    }

    function createEmptyNode() private returns (Node storage emptyNode, uint256 emptyNodeIndex) {
        // note: pushing new empty node, thereby making its storage accesible to write/reade
        nodes.push();

        // note: emptyNodeIndex = total_nodes_count - 1
        // the value of 0 is prevented in 'addNodeInternal' to be assigned to 'emptyNodeIndex' by pushing Empty Node in constructor
        emptyNodeIndex = nodes.length - 1;
        emptyNode = nodes[emptyNodeIndex];

        return (emptyNode, emptyNodeIndex);
    }

    function createEmptyNodeWithId(
        bytes32 nodeId
    ) private returns (Node storage emptyNode, uint256 emptyNodeIndex) {
        (Node storage node, uint256 index) = createEmptyNode();
        node.id = nodeId;
        idToIndex[nodeId] = index;

        return (node, index);
    }

    function maybeCreateArtifactState(Node storage node, NodeInitData memory nodeParams) private {
        // note: if this is an instance of IArbitraryDataArtifact it has to be erc165-compatible
        node.originalArtifact = Validate.validateAddressIsArtifact(nodeParams.artifactAddress);

        // note: when the artifact is STATELESS, it is ok to rely on shared (between other artifacts users) state
        node.clonedArtifact = node.originalArtifact;

        // note: when artifact is STATEFULL it means it must allocate/init/consume a new isolated state variables
        if (nodeParams.needsInitialization) {
            address newInstance = Utils.deployArtifact(node);
            Utils.toArtifactInstance(newInstance).init(nodeParams.initData);

            node.clonedArtifact = newInstance;
        }
    }

    function setNodeConstants(Node storage node, NodeInitData memory nodeParams) private {
        for (uint256 i = 0; i < nodeParams.constantExecArgs.length; i++) {
            node.constantExecArgs.push(nodeParams.constantExecArgs[i]);
        }
    }

    function setNodeVariables(Node storage node, NodeInitData memory nodeParams) private {
        for (uint256 i = 0; i < nodeParams.variableExecArgs.length; i++) {
            node.variableExecArgs.push(nodeParams.variableExecArgs[i]);
        }
    }

    function setNodeSubstibutions(Node storage node, NodeInitData memory nodeParams) private {
        // todo: validate (AT HIGHER LEVEL) artifact assigned to "nodeParams.substitutedExecArgs[i].supplierNodeId" returns the
        // desired type matches with "node.clonedArtifact.getExecDescriptor" type at the same index

        for (uint256 i = 0; i < nodeParams.substitutedExecArgs.length; i++) {
            node.substitutedExecArgs.push(nodeParams.substitutedExecArgs[i]);
        }
    }

    function setNodeInjections(Node storage node, NodeInitData memory nodeParams) private {
        for (uint256 i = 0; i < nodeParams.injections.length; i++) {
            node.injections.push(nodeParams.injections[i]);
        }
    }

    function setArgsCount(Node storage node, NodeInitData memory nodeParams) private {
        Validate.validateArgsCount(node, nodeParams.argsCount);
        node.argsCount = nodeParams.argsCount;
    }
}
