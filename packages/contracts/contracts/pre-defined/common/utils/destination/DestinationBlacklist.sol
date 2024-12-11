//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ArtifactBase } from "../../basis/ArtifactBase.sol";
import {
    ARTIFACT_NOT_INITED_ERR,
    ADDRESS,
    BOOL,
    BYTES,
    ARTIFACT_IS_INITED_ERR
} from "../../../constants/Export.sol";
import { DestinationBlacklistInternal } from "./DestinationBlacklistInternal.sol";

contract DestinationBlacklist is ArtifactBase, DestinationBlacklistInternal {
    bool private isInited;

    function init(bytes memory data) external override {
        bytes memory serializedWhitelist = abi.decode(data, (bytes));

        address[] memory _whitelist = abi.decode(serializedWhitelist, (address[]));

        _initializeDestinationsMapping(_whitelist);

        validateArtifactNotInitalized();
        isInited = true;
    }

    function exec(bytes[] memory data) external view override returns (bytes memory encodedResult) {
        validateExecArgumentsLength(data);
        validateIsInitalized();

        address receiverAddress = abi.decode(data[0], (address));

        bool isBlacklisted = checkDestination(receiverAddress);
        encodedResult = abi.encode(isBlacklisted);
    }

    function getInitDescriptor()
        external
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes)
    {
        uint256 argsLength = 1;

        argsNames = new string[](argsLength);
        argsNames[0] = "serializedWhitelist";

        argsTypes = new string[](argsLength);
        argsTypes[0] = BYTES;
    }

    function getExecDescriptor()
        public
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType)
    {
        uint256 argsLength = 1;

        argsNames = new string[](argsLength);
        argsNames[0] = "receiver";

        argsTypes = new string[](argsLength);
        argsTypes[0] = ADDRESS;
        returnType = BOOL;
    }

    function validateIsInitalized() private view {
        require(isInited, ARTIFACT_NOT_INITED_ERR);
    }

    function validateArtifactNotInitalized() private view {
        require(isInited == false, ARTIFACT_IS_INITED_ERR);
    }
}
