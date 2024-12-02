//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ArtifactBase } from "../basis/ArtifactBase.sol";
import { STRING, BYTES32 } from "../../constants/Export.sol";

contract Keccak256String is ArtifactBase {
    function exec(bytes[] memory data) external pure override returns (bytes memory) {
        validateExecArgumentsLength(data);

        string memory argA = abi.decode(data[0], (string));

        return abi.encode(keccak256(abi.encodePacked(argA)));
    }

    function getExecDescriptor()
        public
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType)
    {
        uint256 argsLength = 1;

        argsNames = new string[](argsLength);
        argsNames[0] = "argA";

        argsTypes = new string[](argsLength);
        argsTypes[0] = STRING;

        returnType = BYTES32;
    }
}
