//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { BaseTimezoneOffsetSource } from "./BaseTimezoneOffsetSource.sol";

contract TrustedTimezoneOffsetSource is BaseTimezoneOffsetSource {
    // required for "TrustedTimezoneOffsetSource" only
    event TimezoneOffsetRequest(string indexed timezoneId);

    constructor(address _admin) BaseTimezoneOffsetSource(_admin) {}

    // note: leave it also here in case we want to trigger an external processor to supply
    // the value to the instance of "TrustedTimezoneOffsetSource"
    function makeRequest(string memory timezoneId) internal override {
        emit TimezoneOffsetRequest(timezoneId);
    }
}
