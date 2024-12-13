//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { StatelessArtifactBase } from "../basis/StatelessArtifactBase.sol";
import { ADDRESS, BOOL } from "../../constants/Export.sol";

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

    function _exec(bytes[] memory data) internal override returns (bytes memory encodedResult) {
        // note: trigger base validations
        super._exec(data);

        address argA = abi.decode(data[0], (address));
        address argB = abi.decode(data[1], (address));

        encodedResult = abi.encode(argA == argB);
    }
}
