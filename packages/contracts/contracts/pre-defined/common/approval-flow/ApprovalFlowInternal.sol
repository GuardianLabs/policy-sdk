//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ApprovalConfig } from "./types/Types.sol";
import { SigUsage } from "./inheritance/SigUsage.sol";
import {
    validateApprovers,
    validateQuorum,
    validateApprover,
    validateSignatures,
    validateSignatureLength
} from "./validation-tools.sol";

contract ApprovalFlowInternal is SigUsage {
    ApprovalConfig internal config;
    mapping(address approver => bool isKnown) internal knownApproversMap;

    event ApprovalFlowInited(bytes32 approversListHash, uint256 quorum);

    function _initializeApprovalConfig(address[] memory _approvers, uint256 _quorum) internal {
        validateApprovers(_approvers);
        for (uint256 i = 0; i < _approvers.length; i++) {
            address approver = _approvers[i];
            // note: avoid zero addresses and duplicates
            validateApprover(approver, isKnownApprover);

            // note: init known-approvers mapping
            knownApproversMap[approver] = true;
        }
        config.approvers = _approvers;

        validateQuorum(_quorum, config.approvers.length);
        config.quorum = _quorum;

        emit ApprovalFlowInited(keccak256(abi.encodePacked(_approvers)), _quorum);
    }

    function checkApprovals(
        bytes32 messageHash,
        bytes[] memory signatures
    ) internal returns (bool checked) {
        address[] memory unverifiedSignatories = getSignatories(signatures, messageHash);
        uint256 approvalsFound = 0;

        for (uint256 i = 0; i < config.approvers.length; i++) {
            // important: "config.approvers" list does not have duplicates and/or zero addreses
            address expectedApprover = config.approvers[i];

            for (uint256 j = 0; j < unverifiedSignatories.length; j++) {
                address signatory = unverifiedSignatories[j];

                if (expectedApprover == signatory) {
                    approvalsFound++;
                    break;
                }
            }
        }

        checked = approvalsFound >= config.quorum;
    }

    function getSignatories(
        bytes[] memory signatures,
        bytes32 messageHash
    ) internal returns (address[] memory signatoriesList) {
        validateSignatures(signatures, consensusRange);

        signatoriesList = new address[](signatures.length);

        for (uint256 i = 0; i < signatures.length; i++) {
            signatoriesList[i] = getSignatory(signatures[i], messageHash);
        }
    }

    function getSignatory(
        bytes memory signature,
        bytes32 messageHash
    ) internal returns (address signatory) {
        validateSignatureLength(signature);
        validateSignatureNotConsumed(signature);

        signatory = recoverSignatory(messageHash, signature);

        markSignatureConsumed(signature);
    }

    function consensusRange() internal view returns (uint256 min, uint256 max) {
        min = config.quorum;
        max = config.approvers.length;
    }

    function isKnownApprover(address maybeApproverAddress) internal view returns (bool) {
        return knownApproversMap[maybeApproverAddress];
    }
}
