//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { StatelessArtifactBase } from "../../sdk/erc-8006/StatelessArtifactBase.sol";
import { STRING, BYTES } from "../../sdk/erc-8006/constants/Export.sol";

contract Keccak256String is StatelessArtifactBase {
    function getExecDescriptor()
        external
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType)
    {
        uint256 argsLength = 1;

        argsNames = new string[](argsLength);
        argsNames[0] = "argA";

        argsTypes = new string[](argsLength);
        argsTypes[0] = STRING;

        returnType = BYTES;
    }

    function description() external pure override returns (string memory desc) {
        desc = _makeDescription(
            "used to compute keccak256 hash of a string value. Parameter - string value to hash. Returns bytes representing the computed hash."
        );
    }

    function _exec(bytes[] memory data) internal override returns (bytes memory) {
        super._exec(data);

        string memory argA = abi.decode(data[0], (string));

        bytes32 hashedValue = keccak256(abi.encodePacked(argA));
        return abi.encode(abi.encode(hashedValue));
    }
}
