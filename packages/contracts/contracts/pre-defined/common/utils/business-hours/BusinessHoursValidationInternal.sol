//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import { IMinTimezoneOffsetSource } from "./interfaces/Exports.sol";
import {
    CLOSING_SECOND_MAX_VALUE_ERR,
    TIME_SOURCE_INTERFACE_ERR,
    OPENING_SECONDS_GREATER_THAN_CLOSING_SECOND_ERR,
    INCORRECT_OPENNING_SECONDS_LIST_LENGTH_ERR,
    INCORRECT_CLOSING_SECONDS_LUST_LENGTH_ERR,
    OPENING_PERIOD_IS_LOWER_THAN_ONE_MINUTE_ERR
} from "./constants/Errors.sol";
import { BusinessDatDetails, DaysOfWeek } from "./types/Types.sol";

/// @title a contract that implements the BusinessHours
/// @author @vitaligrabovski based on extropy.io job
/// @notice You can use this contract to approve transactions outside of Business Hours
/// @dev All function calls have been tested without side effects
contract BusinessHoursValidationInternal {
    uint256 private constant DAY_IN_SECONDS = 86400;
    string private timezone;
    mapping(uint8 => BusinessDatDetails) private openingSeconds; // Opening Seconds storage
    IMinTimezoneOffsetSource private timeAggregator;

    event BusinessHoursInited(uint256 timestamp);

    /// @notice You are about to create a new contract based on the Business Hours condition
    /// @dev constructor(init method) for Bussiness-Hours
    /// @param _timezone timezone for this contract, given as following example 'Europe/Berlin'; represents hours different from UTC.
    /// @param openingSecondsList an Array of opening Seconds for each day of the week starting from Sunday
    /// @param closingSecondsList an Array of closing Seconds, outside business functioning, for each day of the week starting from Sunday
    function _initBusinessHours(
        string memory _timezone,
        address timezoneOffsetAggregator,
        uint24[] memory openingSecondsList,
        uint24[] memory closingSecondsList
    ) internal {
        timeAggregator = IMinTimezoneOffsetSource(
            verifyTimezoneOffsetSourceAddress(timezoneOffsetAggregator)
        );
        setTimezone(_timezone);
        require(closingSecondsList.length == 7, INCORRECT_CLOSING_SECONDS_LUST_LENGTH_ERR);
        require(openingSecondsList.length == 7, INCORRECT_OPENNING_SECONDS_LIST_LENGTH_ERR);
        for (uint8 i = 0; i < closingSecondsList.length; i++) {
            setOpeningSeconds(DaysOfWeek(i), openingSecondsList[i], closingSecondsList[i]);
        }

        /* solhint-disable-next-line not-rely-on-time */
        emit BusinessHoursInited(block.timestamp);
    }

    function checkBusinessHours() internal view returns (bool) {
        return isBusinessOpen(timeAggregator.getTime(timezone));
    }

    /// @dev Check whether the transaction occured during business hours
    ///      the times are currrently hard coded as per the spec
    /// @param _txProcessingTime time of transaction (block time)
    /// @return true if transaction occured during business hours
    function isBusinessOpen(uint256 _txProcessingTime) internal view returns (bool) {
        uint8 transactionDayOfWeek = weekdayFromSeconds(_txProcessingTime);
        // note: quick subtraction of all previous days
        uint32 secondsElapsed = uint32(_txProcessingTime % DAY_IN_SECONDS);
        return (secondsElapsed >= openingSeconds[transactionDayOfWeek].openingSecond &&
            secondsElapsed <= openingSeconds[transactionDayOfWeek].closingSecond);
    }

    /// @dev sets timezone for the contract
    /// @param _timezone number of hours ahead or behind UTC
    function setTimezone(string memory _timezone) private {
        timezone = _timezone;
    }

    /// @dev sets opening and closing seconds in contract
    /// @param _dayOfWeek index of weekday, 0 = Sunday
    /// @param _openSeconds Seconds from which store is open
    /// @param _closeSeconds Seconds from which store is closed
    function setOpeningSeconds(
        DaysOfWeek _dayOfWeek,
        uint24 _openSeconds,
        uint24 _closeSeconds
    ) private {
        verifyOpeningClosingSeconds(_openSeconds, _closeSeconds);

        if (_closeSeconds == 24 * 60 * 60) {
            _closeSeconds -= 1;
        }
        openingSeconds[uint8(_dayOfWeek)].openingSecond = uint32(_openSeconds);
        openingSeconds[uint8(_dayOfWeek)].closingSecond = uint32(_closeSeconds);
    }

    function verifyTimezoneOffsetSourceAddress(address target) private view returns (address) {
        require(
            IERC165(target).supportsInterface(type(IMinTimezoneOffsetSource).interfaceId),
            TIME_SOURCE_INTERFACE_ERR
        );
        return target;
    }

    function verifyOpeningClosingSeconds(uint24 _openSeconds, uint24 _closeSeconds) private pure {
        require(_closeSeconds <= DAY_IN_SECONDS, CLOSING_SECOND_MAX_VALUE_ERR);
        require(_closeSeconds >= _openSeconds, OPENING_SECONDS_GREATER_THAN_CLOSING_SECOND_ERR);

        // If not closed all day, then minimal opening-closing gap is 60sec;
        // this validates time to be passed in hours instead of seconds
        if (!isClosedAllDay(_openSeconds, _closeSeconds)) {
            require(
                _closeSeconds - _openSeconds >= 60,
                OPENING_PERIOD_IS_LOWER_THAN_ONE_MINUTE_ERR
            );
        }
    }

    function isClosedAllDay(uint24 _openSeconds, uint24 _closeSeconds) private pure returns (bool) {
        return _openSeconds == 0 && _closeSeconds == 0;
    }

    /// @dev returns weekday based on timestamp in seconds
    function weekdayFromSeconds(uint256 timestamp) private pure returns (uint8) {
        return uint8((timestamp / DAY_IN_SECONDS + 4) % 7);
    }
}
