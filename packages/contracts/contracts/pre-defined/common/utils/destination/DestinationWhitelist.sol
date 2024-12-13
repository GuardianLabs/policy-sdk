//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { StatefulArtifactBase } from "../../basis/StatefulArtifactBase.sol";
import { ADDRESS, BOOL, BYTES } from "../../../constants/Export.sol";
import { DestinationWhitelistInternal } from "./DestinationWhitelistInternal.sol";

contract DestinationWhitelist is StatefulArtifactBase, DestinationWhitelistInternal {
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
        external
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

    function _init(bytes memory data) internal override {
        bytes memory serializedWhitelist = abi.decode(data, (bytes));

        address[] memory _whitelist = abi.decode(serializedWhitelist, (address[]));

        _initializeDestinationsMapping(_whitelist);

        // note: trigger base configuration & validations
        super._init(data);
    }

    function _exec(bytes[] memory data) internal override returns (bytes memory encodedResult) {
        // note: trigger base validations
        super._exec(data);

        address receiverAddress = abi.decode(data[0], (address));

        bool isWhitelisted = checkDestination(receiverAddress);
        encodedResult = abi.encode(isWhitelisted);
    }
}
