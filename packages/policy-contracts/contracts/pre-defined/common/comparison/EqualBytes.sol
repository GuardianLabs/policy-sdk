//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ArtifactBase } from "../basis/ArtifactBase.sol";
import { BYTES, BOOL } from "../constants/Export.sol";

contract EqualBytes is ArtifactBase {
    function exec(bytes[] memory data) external pure override returns (bytes memory encodedResult) {
        bytes memory argA = abi.decode(data[0], (bytes));
        bytes memory argB = abi.decode(data[1], (bytes));

        encodedResult = abi.encode(keccak256(argA) == keccak256(argB));
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
        argsTypes[0] = BYTES;
        argsTypes[1] = BYTES;

        returnType = BOOL;
    }

    function compare(bytes memory argA, bytes memory argB) internal pure returns (bool result) {
        result = keccak256(abi.encodePacked(argA)) == keccak256(abi.encodePacked(argB));
    }
}
