//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { StatelessArtifactBase } from "../basis/StatelessArtifactBase.sol";
import { STRING, BYTES32 } from "../../constants/Export.sol";

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

        returnType = BYTES32;
    }

    function _exec(bytes[] memory data) internal override returns (bytes memory) {
        super._exec(data);

        string memory argA = abi.decode(data[0], (string));

        return abi.encode(keccak256(abi.encodePacked(argA)));
    }
}
