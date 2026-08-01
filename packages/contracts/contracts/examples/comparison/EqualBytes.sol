//SPDX-License-Identifier: MIT
pragma solidity ^0.8.36;

import { StatelessArtifactBase } from "../../sdk/erc-8006/StatelessArtifactBase.sol";
import { BYTES, BOOL } from "../../sdk/erc-8006/constants/Export.sol";

contract EqualBytes is StatelessArtifactBase {
    function getExecDescriptor()
        external
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType)
    {
        uint256 argsLength = 2;

        argsNames = new string[](argsLength);
        argsNames[0] = "argA";
        argsNames[1] = "argB";

        argsTypes = new string[](argsLength);
        argsTypes[0] = BYTES;
        argsTypes[1] = BYTES;

        returnType = BOOL;
    }

    function description() external pure override returns (string memory desc) {
        desc = _makeDescription(
            "used to compare two bytes values. First address parameter - argA, second one - argB. Returns bool representing whether hashes of two bytes arguments are equal or not."
        );
    }

    function _exec(bytes[] memory data) internal override returns (bytes memory encodedResult) {
        super._exec(data);

        bytes memory argA = abi.decode(data[0], (bytes));
        bytes memory argB = abi.decode(data[1], (bytes));

        encodedResult = abi.encode(keccak256(argA) == keccak256(argB));
    }

    function compare(bytes memory argA, bytes memory argB) internal pure returns (bool result) {
        result = keccak256(abi.encodePacked(argA)) == keccak256(abi.encodePacked(argB));
    }
}
