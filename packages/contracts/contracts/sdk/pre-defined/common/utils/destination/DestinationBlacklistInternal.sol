//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { AddressDestination } from "./types/Types.sol";
import { DestinationWhitelistInternal } from "./DestinationWhitelistInternal.sol";

contract DestinationBlacklistInternal is DestinationWhitelistInternal {
    function configureDestination(address receiverAddress) internal override {
        destinations[receiverAddress] = AddressDestination({
            isKnown: true,
            destination: receiverAddress,
            allowed: false // receiverAddress is not allowed in blacklist
        });
    }

    function checkDestination(
        address receiverAddress
    ) internal view override returns (bool result) {
        bool isDestinationKnown = destinations[receiverAddress].isKnown;
        result = isDestinationKnown && destinations[receiverAddress].allowed == false;
    }
}
