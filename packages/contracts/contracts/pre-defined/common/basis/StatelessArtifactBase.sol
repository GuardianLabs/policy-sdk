//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ArtifactBase } from "./ArtifactBase.sol";

abstract contract StatelessArtifactBase is ArtifactBase {
    function _init(bytes memory data) internal virtual override {
        (data);
    }

    function _exec(
        bytes[] memory data
    ) internal virtual override returns (bytes memory encodedResult) {
        (encodedResult);
        validateExecArgumentsLength(data);
    }
}
