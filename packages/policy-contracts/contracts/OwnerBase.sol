//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { AUTH_ADMIN_ERR } from "./Errors.sol";

contract OwnerBase {
    address private adminUser;

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    constructor(address _adminUser) {
        adminUser = _adminUser;
    }

    function admin() internal view returns (address adminAddress) {
        adminAddress = adminUser;
    }

    function _checkOwner() internal view virtual {
        if (admin() != msg.sender) {
            revert(AUTH_ADMIN_ERR);
        }
    }
}
