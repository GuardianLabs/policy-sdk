//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { StatefulArtifactBase } from "../../basis/StatefulArtifactBase.sol";
import { BOOL, STRING, BYTES, ADDRESS } from "../../../constants/Export.sol";
import { BusinessHoursValidationInternal } from "./BusinessHoursValidationInternal.sol";

contract BusinessHoursValidation is StatefulArtifactBase, BusinessHoursValidationInternal {
    function getInitDescriptor()
        external
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes)
    {
        uint256 argsLength = 4;

        argsNames = new string[](argsLength);
        argsNames[0] = "init1";
        argsNames[1] = "init2";
        argsNames[2] = "init3";
        argsNames[3] = "init4";

        argsTypes = new string[](argsLength);
        argsTypes[0] = STRING;
        argsTypes[1] = ADDRESS;
        argsTypes[2] = BYTES;
        argsTypes[3] = BYTES;
    }

    function getExecDescriptor()
        external
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType)
    {
        (argsNames, argsTypes);

        returnType = BOOL;
    }

    function description() external pure override returns (string memory desc) {
        desc = _makeDescription(
            "used to validate if current time falls within configured business hours for a specific timezone. Returns bool representing whether current time is within business hours."
        );
    }

    function _init(bytes memory data) internal override {
        // note: trigger base configuration & validations
        super._init(data);

        (string memory init1, address init2, bytes memory init3, bytes memory init4) = abi.decode(
            data,
            (string, address, bytes, bytes)
        );

        string memory timezone = init1;
        address timezoneOffsetAggregator = init2;
        uint24[] memory openingSecondsList = abi.decode(init3, (uint24[])); // openingSecondsList packed as bytes
        uint24[] memory closingSecondsList = abi.decode(init4, (uint24[])); // closingSecondsList packed as bytes

        _initBusinessHours(
            timezone,
            timezoneOffsetAggregator,
            openingSecondsList,
            closingSecondsList
        );
    }

    function _exec(bytes[] memory data) internal override returns (bytes memory encodedResult) {
        // note: trigger base validations
        super._exec(data);

        bool isWorkingHours = checkBusinessHours();
        encodedResult = abi.encode(isWorkingHours);
    }
}
