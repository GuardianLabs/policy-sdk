//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { TimezoneRecord } from "../timezone-offset-source/types/Types.sol";

interface ITimezoneOffsetConsumer {
    function onTimezoneDelayedResult(TimezoneRecord memory offset) external;
}

interface IMinTimezoneOffsetSource {
    // note: applies timezone-offset value to current block timestamp, then return the result
    function getTime(string memory timezone) external view returns (uint256);
}

interface ITimezoneOffsetSource is IMinTimezoneOffsetSource {
    // note: must make a supply request to oracle-service
    function forceInitiateTimezoneOffsetUpdateReqeust(string memory timezoneId) external;

    // note: should receive and write the timezone offset value; has to be allowed for authorized users only
    function supplyTimezoneOffset(
        string memory timezoneId,
        uint64 offsetValue,
        bool isNegative
    ) external;

    // note: must return the timeone offset in minutes
    function getTimezoneOffsetUnsafe(
        string memory timezoneId
    ) external returns (TimezoneRecord memory offset);
}
