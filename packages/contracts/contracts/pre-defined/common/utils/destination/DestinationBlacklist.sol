//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { StatefulArtifactBase } from "../../basis/StatefulArtifactBase.sol";
import { ADDRESS, BOOL, BYTES } from "../../../constants/Export.sol";
import { DestinationBlacklistInternal } from "./DestinationBlacklistInternal.sol";

contract DestinationBlacklist is StatefulArtifactBase, DestinationBlacklistInternal {
    function init(bytes memory data) external override {
        bytes memory serializedWhitelist = abi.decode(data, (bytes));

        address[] memory _whitelist = abi.decode(serializedWhitelist, (address[]));

        _initializeDestinationsMapping(_whitelist);

        _init();
    }

    function exec(bytes[] memory data) external view override returns (bytes memory encodedResult) {
        _exec(data);

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
        argsNames[0] = "serializedBlacklist";

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
}
