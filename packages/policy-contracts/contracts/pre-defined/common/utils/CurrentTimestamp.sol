//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ArtifactBase } from "../basis/ArtifactBase.sol";
import { UINT } from "../constants/Export.sol";

contract CurrentTimestamp is ArtifactBase {
    function exec(bytes[] memory data) external view override returns (bytes memory) {
        (data);

        return abi.encode(block.timestamp);
    }

    function getExecDescriptor()
        external
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType)
    {
        (argsNames, argsTypes);
        returnType = UINT;
    }
}
