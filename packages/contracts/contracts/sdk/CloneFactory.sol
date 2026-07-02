//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { cloneContract } from "./Utilities.sol";

contract CloneFactory {
    event Cloned(address indexed clonedInstance);

    function clone(address implementation) public returns (address) {
        address cloneInstance = cloneContract(implementation);
        emit Cloned(cloneInstance);
        return cloneInstance;
    }
}
