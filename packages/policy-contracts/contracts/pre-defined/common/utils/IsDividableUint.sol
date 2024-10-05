//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ArtifactBase } from "../basis/ArtifactBase.sol";
import { BOOL, UINT } from "../constants/Export.sol";

contract IsDividableUint is ArtifactBase {
    function exec(bytes[] memory data) external pure override returns (bytes memory encodedResult) {
        uint256 argA = abi.decode(data[0], (uint256));
        uint256 argB = abi.decode(data[1], (uint256));

        encodedResult = abi.encode(argA % argB == 0);
    }

    function getExecDescriptor()
        external
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType)
    {
        argsNames = new string[](2);
        argsNames[0] = "argA";
        argsNames[1] = "argB";

        argsTypes = new string[](2);
        argsTypes[0] = UINT;
        argsTypes[1] = UINT;

        returnType = BOOL;
    }
}
