//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { IArbitraryDataArtifact } from "./interfaces/Export.sol";

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
        external
        pure
        virtual
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType);
}
