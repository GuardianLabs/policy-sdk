//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { StatelessArtifactBase } from "../basis/StatelessArtifactBase.sol";
import { UINT, BOOL } from "../../constants/Export.sol";

contract LteUint is StatelessArtifactBase {
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
        argsTypes[0] = UINT;
        argsTypes[1] = UINT;

        returnType = BOOL;
    }

    function description() external pure override returns (string memory desc) {
        desc = _makeDescription(
            "used to check if first uint is less than or equal to second uint. First parameter - argA, second one - argB. Returns bool representing whether argA <= argB."
        );
    }

    function _exec(bytes[] memory data) internal override returns (bytes memory encodedResult) {
        super._exec(data);

        uint256 argA = abi.decode(data[0], (uint256));
        uint256 argB = abi.decode(data[1], (uint256));

        encodedResult = abi.encode(argA <= argB);
    }
}
