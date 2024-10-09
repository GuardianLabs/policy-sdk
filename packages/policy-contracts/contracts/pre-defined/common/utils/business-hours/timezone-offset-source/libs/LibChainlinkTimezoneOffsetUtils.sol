//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { TimezoneRecord } from "../types/Types.sol";
import { SUPPLIED_TIMEZONE_VALUE_LENGTH_IS_INCORRECT_ERR } from "../constants/Errors.sol";

library LibChainlinkTimezoneOffsetUtils {
    bytes1 private constant MINUS_SYMBOL_AS_BYTES = bytes1("-");

    function parseISO8601TimeStringToTimezoneOffset(
        string memory value
    ) internal pure returns (TimezoneRecord memory offset) {
        bytes memory stringBytes = bytes(value);
        require(stringBytes.length == 6, SUPPLIED_TIMEZONE_VALUE_LENGTH_IS_INCORRECT_ERR);
        bytes1[2] memory hoursBytes = [stringBytes[1], stringBytes[2]];
        bytes1[2] memory minutesBytes = [stringBytes[4], stringBytes[5]];

        uint64 hoursParsed = convertNumberStringBytesToUint64(hoursBytes);
        uint64 minutesParsed = convertNumberStringBytesToUint64(minutesBytes);
        bool isNegative = convertSignCharacterStringBytesToBool(stringBytes[0]);

        offset = TimezoneRecord(hoursParsed * 60 + minutesParsed, isNegative, true);
    }

    function convertNumberStringBytesToUint64(
        bytes1[2] memory stringBytes
    ) internal pure returns (uint64) {
        uint64 val = 0;
        for (uint64 i = 0; i < stringBytes.length; i++) {
            uint64 exp = uint64(stringBytes.length) - i;
            bytes1 ival = stringBytes[i];
            uint8 uval = uint8(ival);
            uint256 jval = uval - uint256(0x30);

            val += (uint64(jval) * (uint64(10) ** (exp - 1)));
        }

        return val;
    }

    function convertSignCharacterStringBytesToBool(bytes1 value) internal pure returns (bool) {
        return value == MINUS_SYMBOL_AS_BYTES;
    }
}
