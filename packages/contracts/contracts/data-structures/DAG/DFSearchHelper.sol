// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { DFSHelper, VisitStatus } from "./types/Types.sol";

// note: only reason to keep it in a dedicated contract is
// a. to have cleaner codebase
// b. the need of DFSHelper variable currently available only through storage
contract DFSearchHelper {
    // todo: apply transient storage
    DFSHelper private dfs;

    function getDfsHelper(uint256[] memory nodeIds) internal returns (DFSHelper storage _dfs) {
        _cleanUpDfsHelper(nodeIds);
        _dfs = dfs;
    }

    function _cleanUpDfsHelper(uint256[] memory nodeIds) private {
        for (uint256 i; i < nodeIds.length; i++) {
            uint256 nodeId = nodeIds[i];
            dfs.visited[nodeId] = VisitStatus.Unvisited;
        }

        delete dfs.sorted;
    }
}
