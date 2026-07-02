//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { TimezoneRecord } from "../timezone-offset-source/types/Types.sol";

interface ITimezoneOffsetConsumer {
    function onTimezoneDelayedResult(TimezoneRecord memory offset) external;
}
