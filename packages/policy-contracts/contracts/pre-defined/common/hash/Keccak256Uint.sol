//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ArtifactBase } from "../basis/ArtifactBase.sol";
import { UINT, BYTES32 } from "../constants/Export.sol";

contract Keccak256Uint is ArtifactBase {
    function exec(bytes[] memory data) external pure override returns (bytes memory) {
        uint256 argA = abi.decode(data[0], (uint256));

        return abi.encode(keccak256(abi.encodePacked(argA)));
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
        argsTypes[0] = UINT;

        returnType = BYTES32;
    }
}
