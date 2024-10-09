//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { DUPLICATED_ROOT_NODE_ERR, MISSING_ROOT_NODE_ERR } from "./Errors.sol";
import { Node, Variables, GraphInitParams, CacheRecord } from "./Types.sol";
import { ArtifactsTree } from "./ArtifactsTree.sol";
import { TreeGatewayBase } from "./TreeGatewayBase.sol";

contract TreeGateway is TreeGatewayBase {
    // todo: design to support ArtifactsTree[] list;
    ArtifactsTree private graph;
    bytes32 private rootNodeId;

    constructor(address _adminUser) TreeGatewayBase(_adminUser) {}

    // todo: consider the scenario when explicit constructor is skipped
    // function init (address _adminUser) public {
    //     require(!isInited, "ERROR");
    //     adminUser = _adminUser;
    //     graph = new ArtifactsTree(adminUser);
    //     isInited = true;
    // }

    // todo: verify the following:
    // initGraph' is a way to add more than one graph??
    function initGraph(GraphInitParams memory params) public onlyOwner {
        graph = new ArtifactsTree(admin());

        uint256 rootNodeIncludeCount;

        for (uint256 i = 0; i < params.nodes.length; i++) {
            graph.addNode(params.nodes[i]);

            if (params.rootNode == params.nodes[i].id) {
                rootNodeIncludeCount++;
            }
        }

        require(rootNodeIncludeCount != 0, MISSING_ROOT_NODE_ERR);
        require(rootNodeIncludeCount == 1, DUPLICATED_ROOT_NODE_ERR);
        // add the way to validate graph.node[params.rootNode] evaluates as bool
        rootNodeId = params.rootNode;
    }

    function evaluateTree(Variables[] memory variables) public onlyOwner returns (bool result) {
        Node memory rootNode = graph.getNodeById(rootNodeId);

        uint256 lastCacheRecord = 0;
        CacheRecord[] memory cache = new CacheRecord[](graph.getNodesCount());

        bytes memory encodedResult = graph.evaluateRecursively(
            rootNode,
            variables,
            cache,
            lastCacheRecord
        );

        // implicitness
        bool decodedResult = abi.decode(encodedResult, (bool));
        result = decodedResult;
    }
}
