//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

interface IArbitraryDataArtifact {
    function exec(bytes[] memory data) external returns (bytes memory);

    function init(bytes memory data) external;

    // note: ONLY |uint256, bool, address, string, bytes32, bytes| ARE ALLOWED as argsTypes
    function getExecDescriptor()
        external
        pure
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType);

    function getInitDescriptor()
        external
        pure
        returns (string[] memory argsNames, string[] memory argsTypes);
}
