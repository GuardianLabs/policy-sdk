//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { PolicyHandler } from "@guardian-network/policy-contracts/contracts/PolicyHandler.sol";
import { GraphInitParams } from "@guardian-network/policy-contracts/contracts/Types.sol";

contract PolicyFactory {
    event PolicyDeployed(address indexed instanceAddress);

    function deploy(address policyAdmin) public returns (PolicyHandler policyInstance) {
        policyInstance = _deployPolicy(policyAdmin);

        _emitDeployedEvent(address(policyInstance));
    }

    function deployAndConfigure(
        address policyAdmin,
        GraphInitParams memory params
    ) public returns (PolicyHandler policyInstance) {
        address configurationAdmin = address(this); // factory is tmp policy-admin

        policyInstance = _deployPolicy(configurationAdmin);
        _configurePolicy(policyInstance, params);

        policyInstance.setOwner(policyAdmin);

        _emitDeployedEvent(address(policyInstance));
    }

    function _deployPolicy(address policyAdmin) private returns (PolicyHandler policyInstance) {
        policyInstance = new PolicyHandler(policyAdmin);
    }

    function _configurePolicy(PolicyHandler policyInstance, GraphInitParams memory params) private {
        policyInstance.set(params);
    }

    function _emitDeployedEvent(address policyAddress) private {
        emit PolicyDeployed(policyAddress);
    }
}
