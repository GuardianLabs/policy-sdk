//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { TimezoneRecord } from "../types/Types.sol";
import {
    IChainlinkTimezoneOffsetSource,
    ITimezoneOffsetConsumer
} from "../../interfaces/Exports.sol";

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
