//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.36;

import { StatelessArtifactBase } from "../../sdk/erc-8006/StatelessArtifactBase.sol";
import { BOOL, UINT } from "../../sdk/erc-8006/constants/Export.sol";

contract IsDividableUint is StatelessArtifactBase {
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
            "used to check if first uint is evenly divisible by second uint. First parameter - argA, second one - argB. Returns bool representing whether argA % argB == 0."
        );
    }

    function _exec(bytes[] memory data) internal override returns (bytes memory encodedResult) {
        super._exec(data);
        // todo: argB != 0

        uint256 argA = abi.decode(data[0], (uint256));
        uint256 argB = abi.decode(data[1], (uint256));

        encodedResult = abi.encode(argA % argB == 0);
    }
}
