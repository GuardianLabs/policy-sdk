//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ArtifactBase } from "../../basis/ArtifactBase.sol";
import {
    ARTIFACT_NOT_INITED_ERR,
    BOOL,
    STRING,
    UINT24_LIST,
    ADDRESS,
    ARTIFACT_IS_INITED_ERR
} from "../../../constants/Export.sol";
import { BusinessHoursValidationInternal } from "./BusinessHoursValidationInternal.sol";

contract BusinessHoursValidation is ArtifactBase, BusinessHoursValidationInternal {
    bool private isInited;

    function init(bytes memory data) external override {
        (string memory init1, address init2, uint24[] memory init3, uint24[] memory init4) = abi
            .decode(data, (string, address, uint24[], uint24[]));

        string memory timezone = init1;
        address timezoneOffsetAggregator = init2;
        uint24[] memory openingSecondsList = init3;
        uint24[] memory closingSecondsList = init4;

        _init(timezone, timezoneOffsetAggregator, openingSecondsList, closingSecondsList);
        validateArtifactNotInitalized();
        isInited = true;
    }

    function exec(bytes[] memory data) external view override returns (bytes memory encodedResult) {
        validateExecArgumentsLength(data);
        validateIsInitalized();

        bool result = checkBusinessHours();
        encodedResult = abi.encode(result);
    }

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
        argsTypes[2] = UINT24_LIST;
        argsTypes[3] = UINT24_LIST;
    }

    function getExecDescriptor()
        public
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType)
    {
        (argsNames, argsTypes);

        returnType = BOOL;
    }

    function validateIsInitalized() private view {
        require(isInited, ARTIFACT_NOT_INITED_ERR);
    }

    function validateArtifactNotInitalized() private view {
        require(isInited == false, ARTIFACT_IS_INITED_ERR);
    }
}
