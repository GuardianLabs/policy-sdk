//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { StatelessArtifactBase } from "../basis/StatelessArtifactBase.sol";
import { BOOL } from "../../constants/Export.sol";

contract AND is StatelessArtifactBase {
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
        argsTypes[0] = BOOL;
        argsTypes[1] = BOOL;

        returnType = BOOL;
    }

    function _exec(bytes[] memory data) internal override returns (bytes memory encodedResult) {
        super._exec(data);

        bool argA = abi.decode(data[0], (bool));
        bool argB = abi.decode(data[1], (bool));

        bool result = and(argA, argB);
        encodedResult = abi.encode(result);
    }

    function and(bool argA, bool argB) internal pure returns (bool result) {
        result = argA && argB;
    }
}
