//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ERC165 } from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import { TimezoneRecord } from "./types/Types.sol";
import { IMinTimezoneOffsetSource, ITimezoneOffsetSource } from "../interfaces/Exports.sol";
import {
    NO_TIMEZONE_OFFSET_IN_CACHE_ERR,
    MUST_BE_IN_WHITELIST_ERR,
    MUST_BE_WHITELIST_ADMIN_ERR
} from "./constants/Errors.sol";

abstract contract BaseTimezoneOffsetSource is ITimezoneOffsetSource, ERC165 {
    /*
        an admin that may modify the timezoneOffsetRequestersWhitelist
    */
    address public timezoneAdmin;

    /*
        it is necessary to have a list of authorized-suppliers since requests may require funds (Link, etc.)
    */
    mapping(address => bool) public authorizedSupplier;

    /*
        stores the offset values obtained from the oracles
        to avoid making new call to get the same information
    */
    mapping(string => TimezoneRecord) public suppliedOffsets;

    event SuppliedOffset(
        string indexed timezoneId,
        uint64 indexed offsetValueInSeconds,
        bool indexed isNegative
    );

    modifier onlyAdmin() {
        require(msg.sender == timezoneAdmin, MUST_BE_WHITELIST_ADMIN_ERR);
        _;
    }

    modifier onlyPermittedCaller() {
        require(authorizedSupplier[msg.sender], MUST_BE_IN_WHITELIST_ERR);
        _;
    }

    constructor(address _admin) {
        timezoneAdmin = _admin;
        // making by default the admin an authorized supplier
        authorizedSupplier[timezoneAdmin] = true;
    }

    function changeAdmin(address newAdmin) external onlyAdmin {
        // deleted admin can not supply information anymore
        authorizedSupplier[timezoneAdmin] = false;
        timezoneAdmin = newAdmin;
        // new admin can supply timezone information
        authorizedSupplier[timezoneAdmin] = true;
    }

    function modifyPermittedCallersList(address supplier, bool allowed) public onlyAdmin {
        authorizedSupplier[supplier] = allowed;
    }

    // note: the authenticated way to supply timezone offset value and save it as cached value
    function supplyTimezoneOffset(
        string memory timezoneId,
        uint64 offsetValueInMinutes,
        bool isNegative
    ) public override onlyPermittedCaller {
        _supplyTimezoneOffset(timezoneId, offsetValueInMinutes, isNegative);
    }

    // note: timezone offsets may chage due to political decisions.
    // This method forces an update of the offset for a specific timezone
    function forceInitiateTimezoneOffsetUpdateReqeust(
        string memory timezoneId
    ) public override onlyPermittedCaller {
        makeRequest(timezoneId);
    }

    // note: takes timezone offset value from cache and adds it to current timestamp
    // if there is no cached value, then it throws an error
    function getTime(
        string memory timezone
    ) public view override returns (uint256 timeWithTimezoneOffsetAppliedInSeconds) {
        TimezoneRecord memory offsetStruct = getTimezoneOffsetUnsafe(timezone);
        // note: before returning the result convert the offset value from minutes to seconds
        // solhint-disable-next-line not-rely-on-time
        uint256 blockTime = block.timestamp;
        timeWithTimezoneOffsetAppliedInSeconds = offsetStruct.isNegative
            ? blockTime - offsetStruct.offsetValue * 60
            : blockTime + offsetStruct.offsetValue * 60;
    }

    // note: returns the offset value if it is in cache; othervise reverts
    function getTimezoneOffsetUnsafe(
        string memory timezoneId
    ) public view override returns (TimezoneRecord memory offset) {
        require(suppliedOffsets[timezoneId].isInit, NO_TIMEZONE_OFFSET_IN_CACHE_ERR);
        offset = suppliedOffsets[timezoneId];
    }

    // note: eip-165
    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return
            interfaceId == type(ITimezoneOffsetSource).interfaceId ||
            interfaceId == type(IMinTimezoneOffsetSource).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function _supplyTimezoneOffset(
        string memory timezoneId,
        uint64 offsetValueInMinutes,
        bool isNegative
    ) internal {
        TimezoneRecord storage record = suppliedOffsets[timezoneId];
        record.isInit = true;
        record.offsetValue = offsetValueInMinutes;
        record.isNegative = isNegative;

        emit SuppliedOffset(timezoneId, offsetValueInMinutes * 60, isNegative);
    }

    // note: the function is required to trigger somehow in child contract the
    // necessity of supply of a timezone offset value
    function makeRequest(string memory timezoneId) internal virtual;
}
