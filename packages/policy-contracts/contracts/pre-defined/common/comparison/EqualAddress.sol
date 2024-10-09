//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ArtifactBase } from "../basis/ArtifactBase.sol";
import { ADDRESS, BOOL } from "../../constants/Export.sol";

contract EqualAddress is ArtifactBase {
    function exec(bytes[] memory data) external pure override returns (bytes memory encodedResult) {
        validateExecArgumentsLength(data);

        address argA = abi.decode(data[0], (address));
        address argB = abi.decode(data[1], (address));

        encodedResult = abi.encode(argA == argB);
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
        argsTypes[0] = ADDRESS;
        argsTypes[1] = ADDRESS;

        returnType = BOOL;
    }
}
