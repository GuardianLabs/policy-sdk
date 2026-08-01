//SPDX-License-Identifier: MIT
pragma solidity ^0.8.36;

import { StatelessArtifactBase } from "../../sdk/erc-8006/StatelessArtifactBase.sol";
import { ADDRESS, BOOL } from "../../sdk/erc-8006/constants/Export.sol";

contract EqualAddress is StatelessArtifactBase {
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
        argsTypes[0] = ADDRESS;
        argsTypes[1] = ADDRESS;

        returnType = BOOL;
    }

    function description() external pure override returns (string memory desc) {
        desc = _makeDescription(
            "used to compare two addresses. First address parameter - argA, second one - argB. Returns bool representing whether two address arguments are equal or not."
        );
    }

    function _exec(bytes[] memory data) internal override returns (bytes memory encodedResult) {
        // note: trigger base validations
        super._exec(data);

        address argA = abi.decode(data[0], (address));
        address argB = abi.decode(data[1], (address));

        encodedResult = abi.encode(argA == argB);
    }
}
