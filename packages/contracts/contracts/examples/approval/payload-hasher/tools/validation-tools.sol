//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import {
    SUPPLIED_ZERO_ADDRESS_VALUE_ERR,
    SUPPLIED_ZERO_BYTES32_VALUE_ERR,
    SUPPLIED_ZERO_STRING_VALUE_ERR,
    SUPPLIED_ZERO_UINT256_VALUE_ERR
} from "../constants/Errors.sol";

function validateAddressValue(address value) pure {
    require(value != address(0), SUPPLIED_ZERO_ADDRESS_VALUE_ERR);
}

function validateStringValue(string memory value) pure {
    // note: keccak256(abi.encodePacked("")) = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470
    bytes32 emptyString = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;
    require(keccak256(abi.encodePacked(value)) != emptyString, SUPPLIED_ZERO_STRING_VALUE_ERR);
}

function validateUint256Value(uint256 value) pure {
    require(value != uint256(0), SUPPLIED_ZERO_UINT256_VALUE_ERR);
}

function validateBytes32Value(bytes32 value) pure {
    require(value != bytes32(0), SUPPLIED_ZERO_BYTES32_VALUE_ERR);
}
