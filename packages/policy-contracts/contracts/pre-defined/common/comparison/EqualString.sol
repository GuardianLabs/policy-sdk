//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ArtifactBase } from "../basis/ArtifactBase.sol";
import { STRING, BOOL } from "../../constants/Export.sol";

contract EqualString is ArtifactBase {
    function exec(bytes[] memory data) external pure override returns (bytes memory) {
        validateExecArgumentsLength(data);

        string memory argA = abi.decode(data[0], (string));
        string memory argB = abi.decode(data[1], (string));

        return abi.encode(compare(argA, argB));
    }

    function getExecDescriptor()
        public
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType)
    {
        uint256 argsLength = 2;

        argsNames = new string[](argsLength);
        argsNames[0] = "argA";
        argsNames[1] = "argB";

        argsTypes = new string[](argsLength);
        argsTypes[0] = STRING;
        argsTypes[1] = STRING;

        returnType = BOOL;
    }

    function compare(string memory argA, string memory argB) internal pure returns (bool result) {
        result = keccak256(abi.encodePacked(argA)) == keccak256(abi.encodePacked(argB));
    }
}
