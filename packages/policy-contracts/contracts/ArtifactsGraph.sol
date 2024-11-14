//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import {
    DUPLICATED_ROOT_NODE_ERR,
    MISSING_ROOT_NODE_ERR,
    INIT_NODES_LIST_IS_LARGER_THAN_MAX_LENGTH_ERR
} from "./Errors.sol";
import { Node, Variables, GraphInitParams, CacheRecord } from "./Types.sol";
import { ArtifactNodes } from "./ArtifactNodes.sol";
import { OwnerBase } from "./OwnerBase.sol";
import { MAX_NODES_LENGTH } from "./Constants.sol";

contract ArtifactsGraph is OwnerBase {
    // todo: design to support ArtifactNodes[] list;
    ArtifactNodes private graph;
    bytes32 private rootNodeId;

    event Evaluated(bool indexed result, bytes32 indexed rootNode);

    constructor(address _adminUser) OwnerBase(_adminUser) {}

    // todo: consider the scenario when explicit constructor is skipped
    // function init (address _adminUser) public {
    //     require(!isInited, "ERROR");
    //     adminUser = _adminUser;
    //     graph = new ArtifactNodes(adminUser);
    //     isInited = true;
    // }

    // todo: verify the following:
    // initGraph' is a way to add more than one graph??
    function initGraph(GraphInitParams memory params) public onlyOwner returns(address) {
        // note: solves https://ethereum.stackexchange.com/questions/142102/solidity-1024-call-stack-depth as ad-hoc
        // todo: bring instead sophisticated check
        require(
            params.nodes.length <= MAX_NODES_LENGTH,
            INIT_NODES_LIST_IS_LARGER_THAN_MAX_LENGTH_ERR
        );
        graph = new ArtifactNodes(address(this));

        uint256 rootNodeIncludeCount;

        for (uint256 i = 0; i < params.nodes.length; i++) {
            graph.addNode(params.nodes[i]);

            if (params.rootNode == params.nodes[i].id) {
                rootNodeIncludeCount++;
            }
        }

        require(rootNodeIncludeCount != 0, MISSING_ROOT_NODE_ERR);
        require(rootNodeIncludeCount == 1, DUPLICATED_ROOT_NODE_ERR);

        // todo: add the way to validate graph.node[params.rootNode] evaluates as bool
        rootNodeId = params.rootNode;

        return address(graph);
    }

    function evaluateGraph(Variables[] memory variables) public onlyOwner returns (bool result) {
        Node memory rootNode = graph.getNodeById(rootNodeId);

        uint256 lastCacheRecord = 0;
        CacheRecord[] memory cache = new CacheRecord[](graph.nodesCount());

        bytes memory encodedResult = graph.evaluateRecursively(
            rootNode,
            variables,
            cache,
            lastCacheRecord
        );

        // note: implicitness
        bool decodedResult = abi.decode(encodedResult, (bool));

        result = decodedResult;

        emit Evaluated(result, rootNodeId);
    }
}
