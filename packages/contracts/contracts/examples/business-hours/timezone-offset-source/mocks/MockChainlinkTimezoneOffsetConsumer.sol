//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.36;

import { TimezoneRecord } from "../types/Types.sol";
import { ITimezoneOffsetSource, ITimezoneOffsetConsumer } from "../../interfaces/Interfaces.sol";

interface IChainlinkTimezoneOffsetSource is ITimezoneOffsetSource {
    // extending chainlink with a special method with produces a delayed resposne
    // note: must return the timezone offset from cache, or make a supply request to oracle-service
    function getOrRequestTimezoneOffset(string memory timezoneId) external;
}

contract MockChainlinkTimezoneOffsetConsumer is ITimezoneOffsetConsumer {
    IChainlinkTimezoneOffsetSource public chainlinkTimezoneOffsetSource;

    event DelayedTimezoneOffsetReceive(TimezoneRecord offset);

    constructor(IChainlinkTimezoneOffsetSource _timezoneOffsetSource) {
        chainlinkTimezoneOffsetSource = _timezoneOffsetSource;
    }

    function onTimezoneDelayedResult(TimezoneRecord memory offset) external override {
        emit DelayedTimezoneOffsetReceive(offset);
    }

    function getTimezoneOffsetSafe(string memory timezoneId) external {
        chainlinkTimezoneOffsetSource.getOrRequestTimezoneOffset(timezoneId);
    }
}
