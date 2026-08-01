//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.36;

import { TimezoneRecord } from "../types/Types.sol";
import { ITimezoneOffsetSource, ITimezoneOffsetConsumer } from "../../interfaces/Interfaces.sol";

contract MockTimezoneOffsetConsumer is ITimezoneOffsetConsumer {
    ITimezoneOffsetSource public timezoneOffsetSource;

    event DelayedTimezoneOffsetReceive(TimezoneRecord offset);

    constructor(ITimezoneOffsetSource _timezoneOffsetSource) {
        timezoneOffsetSource = _timezoneOffsetSource;
    }

    function onTimezoneDelayedResult(TimezoneRecord memory offset) external override {
        emit DelayedTimezoneOffsetReceive(offset);
    }

    function getTimezoneOffsetSafe(string memory timezoneId) external {
        timezoneOffsetSource.forceInitiateTimezoneOffsetUpdateReqeust(timezoneId);
    }
}
