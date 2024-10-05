//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ArtifactBase } from "../basis/ArtifactBase.sol";
import { BOOL } from "../constants/Export.sol";

contract XOR is ArtifactBase {
    function exec(bytes[] memory data) external pure override returns (bytes memory encodedResult) {
        bool argA = abi.decode(data[0], (bool));
        bool argB = abi.decode(data[1], (bool));

        bool result = xor(argA, argB);
        encodedResult = abi.encode(result);
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
        argsTypes[0] = BOOL;
        argsTypes[1] = BOOL;

        returnType = BOOL;
    }

    function xor(bool argA, bool argB) internal pure returns (bool result) {
        result = (argA || argB) && !(argA && argB);
    }
}
