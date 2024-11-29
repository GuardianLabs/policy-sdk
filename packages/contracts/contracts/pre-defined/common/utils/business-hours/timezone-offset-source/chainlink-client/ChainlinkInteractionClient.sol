//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { Chainlink, ChainlinkClient } from "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import {
    LinkTokenInterface
} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import { NOT_ENOUGH_ORACLE_TOKEN_ERR } from "../constants/Errors.sol";

contract ChainlinkInteractionClient is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    // the chainlinkFee amount to pay to the oracle for each request
    uint256 public chainlinkFee;
    // base path to the external api
    string public baseUrlPath;
    // stores the relations between the requestId and the corresponding time zone

    // the id of the required job of the oracle(specifies the request and callback signatures)
    bytes32 private constant JOB_ID = "7d80a6386ef543a3abb52817f6707e3b";

    // the path (to look for) located inside a returned object from a successfull 'get' API request
    string private constant RESPONNSE_OBJECT_PATH = "utc_offset";

    constructor(
        address chainlinkToken,
        address chainlinkOracle,
        uint256 _fee,
        string memory _baseUrlPath
    ) {
        _setChainlinkToken(chainlinkToken);
        _setChainlinkOracle(chainlinkOracle);
        chainlinkFee = _fee;
        baseUrlPath = _baseUrlPath;
    }

    function _prepareAndExecuteChainlinkCall(
        string memory timezoneId,
        bytes4 callbackSelector
    ) internal returns (bytes32) {
        LinkTokenInterface linkToken = LinkTokenInterface(_chainlinkTokenAddress());
        require(linkToken.balanceOf(address(this)) >= chainlinkFee, NOT_ENOUGH_ORACLE_TOKEN_ERR);

        Chainlink.Request memory req = _composeChainlinkRequest(timezoneId, callbackSelector);

        // Sending the request
        return _sendChainlinkRequest(req, chainlinkFee);
        // requestIdToTimezoneId[requestId] = timezoneId;
    }

    function _composeChainlinkRequest(
        string memory timezoneId,
        bytes4 callbackSelector
    ) private view returns (Chainlink.Request memory req) {
        req = _buildChainlinkRequest(JOB_ID, address(this), callbackSelector);

        // Set the URL to perform the GET request on
        req._add("get", string.concat(baseUrlPath, timezoneId));

        // Set the path to find the desired data in the API response
        req._add("path", RESPONNSE_OBJECT_PATH);
    }
}
