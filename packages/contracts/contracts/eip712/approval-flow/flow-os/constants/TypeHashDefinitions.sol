// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

bytes32 constant DOMAIN_TYPE_HASH = keccak256(
    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
);

bytes32 constant APPROVE_TX_TYPEHASH = keccak256(
    "ApproveTx(uint256 nonce,bytes data,address asset,string destination,uint256 amount,bytes32 hashA,bytes32 hashB,bytes32 mandatoryTagHashed)"
);
