//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { StatefulArtifactBase } from "../../basis/StatefulArtifactBase.sol";
import { ADDRESS, BOOL, BYTES } from "../../../constants/Export.sol";
import { DestinationWhitelistInternal } from "./DestinationWhitelistInternal.sol";

contract DestinationWhitelist is StatefulArtifactBase, DestinationWhitelistInternal {
    function init(bytes memory data) external override {
        bytes memory serializedWhitelist = abi.decode(data, (bytes));

        address[] memory _whitelist = abi.decode(serializedWhitelist, (address[]));

        _initializeDestinationsMapping(_whitelist);

        _init();
    }

    function exec(bytes[] memory data) external view override returns (bytes memory encodedResult) {
        _exec(data);

        address receiverAddress = abi.decode(data[0], (address));

        bool isWhitelisted = checkDestination(receiverAddress);
        encodedResult = abi.encode(isWhitelisted);
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
}
