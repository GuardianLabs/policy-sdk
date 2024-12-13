//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { IArbitraryDataArtifact } from "./interfaces/Export.sol";
import { INCORRECT_EXEC_ARGUMENTS_LIST_LENGTH_ERR } from "../../constants/Export.sol";

abstract contract ArtifactBase is IArbitraryDataArtifact {
    function init(bytes memory data) external virtual {
        _init(data);
    }

    function exec(bytes[] memory data) external virtual returns (bytes memory encodedResult) {
        return _exec(data);
    }

    // note: this provides a default return value to be re-used as is in stateful artifact
    function getInitDescriptor()
        external
        pure
        virtual
        returns (string[] memory argsNames, string[] memory argsTypes)
    {
        return (argsNames, argsTypes);
    }

    function getExecDescriptor()
        external
        pure
        virtual
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType);

    function _init(bytes memory data) internal virtual;

    function _exec(bytes[] memory data) internal virtual returns (bytes memory encodedResult);

    function validateExecArgumentsLength(bytes[] memory data) internal view {
        (string[] memory argsNames, , ) = this.getExecDescriptor();

        require(data.length == argsNames.length, INCORRECT_EXEC_ARGUMENTS_LIST_LENGTH_ERR);
    }
}
