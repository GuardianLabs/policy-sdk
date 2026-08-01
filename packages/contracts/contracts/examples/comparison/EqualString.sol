//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { StatelessArtifactBase } from "../../sdk/erc-8006/StatelessArtifactBase.sol";
import { STRING, BOOL } from "../../sdk/erc-8006/constants/Export.sol";

contract EqualString is StatelessArtifactBase {
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
        argsTypes[0] = STRING;
        argsTypes[1] = STRING;

        returnType = BOOL;
    }

    function description() external pure override returns (string memory desc) {
        desc = _makeDescription(
            "used to compare two string values. First parameter - argA, second one - argB. Returns bool representing whether hashes of two string arguments are equal or not."
        );
    }

    function _exec(bytes[] memory data) internal override returns (bytes memory) {
        // note: trigger base validations
        super._exec(data);

        string memory argA = abi.decode(data[0], (string));
        string memory argB = abi.decode(data[1], (string));

        return abi.encode(compare(argA, argB));
    }

    function compare(string memory argA, string memory argB) internal pure returns (bool result) {
        result = keccak256(abi.encodePacked(argA)) == keccak256(abi.encodePacked(argB));
    }
}
