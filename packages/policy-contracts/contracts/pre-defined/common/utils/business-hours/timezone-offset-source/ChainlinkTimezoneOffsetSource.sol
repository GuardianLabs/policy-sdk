//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { TimezoneRecord } from "./types/Types.sol";
import {
    LibChainlinkTimezoneOffsetUtils as OffsetResponseParser
} from "./libs/LibChainlinkTimezoneOffsetUtils.sol";
import { BaseTimezoneOffsetSource } from "./BaseTimezoneOffsetSource.sol";
import { ITimezoneOffsetConsumer } from "../interfaces/Exports.sol";
import { ChainlinkInteractionClient } from "./chainlink-client/ChainlinkInteractionClient.sol";

contract ChainlinkTimezoneOffsetSource is BaseTimezoneOffsetSource, ChainlinkInteractionClient {
    /*
        if there is no information about the timezone offset in the suppliedOffsets,
        we store the address of the requesting contract in order to provide the result
        after it is obtained from the offchain source
    */
    // todo: use iterable mapping
    mapping(string => ITimezoneOffsetConsumer[]) internal pendingRequesters;

    mapping(bytes32 => string) private requestIdToTimezoneId;

    event SuppliedOffsetFromChainlink(
        string indexed timezoneId,
        uint64 indexed offsetValueInSeconds,
        bool indexed isNegative,
        bytes32 chainlinkRequestId
    );

    constructor(
        address _admin,
        address chainlinkToken,
        address chainlinkOracle,
        uint256 _fee,
        string memory _baseUrlPath
    )
        BaseTimezoneOffsetSource(_admin)
        ChainlinkInteractionClient(chainlinkToken, chainlinkOracle, _fee, _baseUrlPath)
    {}

    // note: receives the response from the oracle-service
    function onTimezoneOffsetReceive(
        bytes32 requestId,
        string memory volume
    ) external recordChainlinkFulfillment(requestId) {
        string memory timezoneId = requestIdToTimezoneId[requestId];
        TimezoneRecord memory offset = OffsetResponseParser.parseISO8601TimeStringToTimezoneOffset(
            volume
        );

        _supplyTimezoneOffset(timezoneId, offset.offsetValue, offset.isNegative);
        provideResponseToPendingRequesters(timezoneId, offset);

        emit SuppliedOffsetFromChainlink(
            timezoneId,
            offset.offsetValue * 60,
            offset.isNegative,
            requestId
        );
    }

    // note: must return the timezone offset (saved in minutes) from cache, or make a supply request to oracle-service
    function getOrRequestTimezoneOffset(string memory timezoneId) public onlyPermittedCaller {
        // note: return to caller immediatelly with a cached timezone offset value
        if (suppliedOffsets[timezoneId].isInit) {
            TimezoneRecord memory offset = suppliedOffsets[timezoneId];
            ITimezoneOffsetConsumer(msg.sender).onTimezoneDelayedResult(offset);
            // note: otherwise make a request with a delayed response to oracle-service
        } else {
            if (pendingRequesters[timezoneId].length == 0) {
                pendingRequesters[timezoneId].push(ITimezoneOffsetConsumer(msg.sender));
                makeRequest(timezoneId);
            }
        }
    }

    // note: must be invoked by the inheriting contract when they receive the offset from an offchain source
    function provideResponseToPendingRequesters(
        string memory timezoneId,
        TimezoneRecord memory offset
    ) internal {
        // todo: refactor to achieve certan optimisation level
        ITimezoneOffsetConsumer[] storage pendingRequestersForCurrentTimeZone = pendingRequesters[
            timezoneId
        ];
        for (uint256 i = pendingRequestersForCurrentTimeZone.length; i > 0; i--) {
            pendingRequestersForCurrentTimeZone[i - 1].onTimezoneDelayedResult(offset);
            pendingRequestersForCurrentTimeZone.pop();
        }
    }

    function makeRequest(string memory timezoneId) internal override {
        bytes32 requestId = _prepareAndExecuteChainlinkCall(
            timezoneId,
            this.onTimezoneOffsetReceive.selector
        );
        requestIdToTimezoneId[requestId] = timezoneId;
    }
}
