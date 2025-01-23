// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

struct ApproveTransactionPayload {
    uint256 nonce;
    bytes data;
    address asset;
    string destination;
    uint256 amount;
    bytes32 hashA;
    bytes32 hashB;
    bytes32 mandatoryTagHashed;
}
