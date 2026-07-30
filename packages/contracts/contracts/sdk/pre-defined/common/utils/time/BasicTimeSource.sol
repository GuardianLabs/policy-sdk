//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { StatelessArtifactBase } from "../../basis/StatelessArtifactBase.sol";
import { UINT } from "../../../constants/Export.sol";

contract BasicTimeSource is StatelessArtifactBase {
    function getExecDescriptor()
        external
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType)
    {
        (argsNames, argsTypes);
        returnType = UINT;
    }

    function description() external pure override returns (string memory desc) {
        desc = _makeDescription(
            "used to get current block timestamp. Returns uint256 representing current block timestamp in seconds."
        );
    }

    function _exec(bytes[] memory data) internal override returns (bytes memory) {
        super._exec(data);

        return abi.encode(block.timestamp);
    }
}
