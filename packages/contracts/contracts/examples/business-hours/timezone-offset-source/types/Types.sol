//SPDX-License-Identifier: MIT
pragma solidity ^0.8.36;

struct TimezoneRecord {
    uint64 offsetValue; // important: value is in MINUTES
    bool isNegative;
    bool isInit;
}
