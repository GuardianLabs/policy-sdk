//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

string constant TIME_SOURCE_INTERFACE_ERR = "BH-001";
// Closing Seconds array length should match count of days of the week
string constant INCORRECT_OPENNING_SECONDS_LIST_LENGTH_ERR = "BH-002";
// Openning Seconds array length should match count of days of the week
string constant INCORRECT_CLOSING_SECONDS_LUST_LENGTH_ERR = "BH-003";
// Closing time max value has to be equal or less than count of seconds in a full day
string constant CLOSING_SECOND_MAX_VALUE_ERR = "BH-004";
// Closing time seems to be later or even than opening time
string constant OPENING_SECONDS_GREATER_THAN_CLOSING_SECOND_ERR = "BH-005";
string constant OPENING_PERIOD_IS_LOWER_THAN_ONE_MINUTE_ERR = "BH-006";
