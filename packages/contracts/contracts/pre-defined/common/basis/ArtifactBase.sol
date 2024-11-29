//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { IArbitraryDataArtifact } from "./interfaces/Export.sol";
import { INCORRECT_EXEC_ARGUMENTS_LIST_LENGTH_ERR } from "../../constants/Export.sol";

abstract contract ArtifactBase is IArbitraryDataArtifact {
    function init(bytes memory data) external virtual {
        (data);
    }

    function exec(bytes[] memory data) external virtual returns (bytes memory encodedResult);

    function getInitDescriptor()
        external
        pure
        virtual
        returns (string[] memory argsNames, string[] memory argsTypes)
    {
        return (argsNames, argsTypes);
    }

    function getExecDescriptor()
        public
        pure
        virtual
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType);

    function validateExecArgumentsLength(bytes[] memory data) internal pure {
        (
            string[] memory argsNames,
            string[] memory argsTypes,
            string memory returnType
        ) = getExecDescriptor();
        (argsTypes, returnType);

        require(data.length == argsNames.length, INCORRECT_EXEC_ARGUMENTS_LIST_LENGTH_ERR);
    }
}
