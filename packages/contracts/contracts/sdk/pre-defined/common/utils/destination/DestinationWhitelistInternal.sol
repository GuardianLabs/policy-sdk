//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { RECEIVER_ADDRESS_IS_ZERO_ERR } from "./constants/Errors.sol";
import { AddressDestination } from "./types/Types.sol";

contract DestinationWhitelistInternal {
    mapping(address receiver => AddressDestination destinationRule) internal destinations;

    function configureDestination(address receiverAddress) internal virtual {
        destinations[receiverAddress] = AddressDestination({
            isKnown: true,
            destination: receiverAddress,
            allowed: true
        });
    }

    function _initializeDestinationsMapping(address[] memory list) internal {
        for (uint256 i = 0; i < list.length; i++) {
            address receiver = list[i];

            require(receiver != address(0), RECEIVER_ADDRESS_IS_ZERO_ERR);

            configureDestination(receiver);
        }
    }

    function checkDestination(address receiverAddress) internal view virtual returns (bool result) {
        result = destinations[receiverAddress].allowed == true;
    }
}
