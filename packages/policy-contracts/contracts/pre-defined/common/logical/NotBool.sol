//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ArtifactBase } from "../basis/ArtifactBase.sol";
import { BOOL } from "../constants/Export.sol";

contract NOT is ArtifactBase {
    function exec(bytes[] memory data) external pure override returns (bytes memory) {
        bool argA = abi.decode(data[0], (bool));

        return abi.encode(!argA);
    }

    function getExecDescriptor()
        external
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType)
    {
        argsNames = new string[](1);
        argsNames[0] = "argA";

        argsTypes = new string[](1);
        argsTypes[0] = BOOL;

        returnType = BOOL;
    }
}
