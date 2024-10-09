//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

enum DaysOfWeek {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}

struct BusinessDatDetails {
    uint32 openingSecond;
    uint32 closingSecond;
}
