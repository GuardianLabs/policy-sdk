//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ArtifactBase } from "./ArtifactBase.sol";
import { ARTIFACT_NOT_INITED_ERR, ARTIFACT_IS_INITED_ERR } from "../../constants/Export.sol";

abstract contract StatefulArtifactBase is ArtifactBase {
    bool internal isInited;

    function _init() internal virtual {
        validateArtifactNotInitalized();
        isInited = true;
    }

    function _exec(bytes[] memory data) internal view {
        validateExecArgumentsLength(data);
        validateIsInitalized();
    }

    function validateIsInitalized() internal view {
        require(isInited, ARTIFACT_NOT_INITED_ERR);
    }

    function validateArtifactNotInitalized() internal view {
        require(isInited == false, ARTIFACT_IS_INITED_ERR);
    }
}
