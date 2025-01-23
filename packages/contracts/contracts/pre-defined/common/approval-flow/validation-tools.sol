//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import {
    CONSENSUS_IS_ZERO_ERR,
    PROVIDED_APPROVER_ADDRESS_IS_DUPLICATE_ERR,
    CONSENSUS_IS_LOWER_THAN_MIN_CONSENSUS_ERR,
    CONSENSUS_IS_LARGER_THAN_MAX_CONSENSUS_ERR,
    SUPPLIED_TOO_FEW_APPROVERS_ERR,
    SUPPLIED_TOO_FEW_SIGNATURES_ERR,
    SUPPLIED_TOO_MANY_SIGNATURES_ERR,
    APPROVER_ADDRESS_IS_ZERO,
    INCORRECT_SIGNATURE_LENGTH_ERR
} from "./constants/Errors.sol";
import { SIGNATURE_LENGTH } from "./constants/Constants.sol";

function validateApprovers(address[] memory approversList) pure {
    require(approversList.length >= 3, SUPPLIED_TOO_FEW_APPROVERS_ERR);
}

function validateApprover(
    address approver,
    function(address) internal view returns (bool) isKnownApprover
) view {
    // avoid duplicates
    bool isApproverKnown = isKnownApprover(approver);
    require(isApproverKnown == false, PROVIDED_APPROVER_ADDRESS_IS_DUPLICATE_ERR);

    // avoid zero approver address
    require(approver != address(0), APPROVER_ADDRESS_IS_ZERO);
}

function validateQuorum(uint256 quorum, uint256 approversLength) pure {
    require(quorum != 0, CONSENSUS_IS_ZERO_ERR);

    uint256 maxAllowedConsensus = approversLength;
    require(quorum <= maxAllowedConsensus, CONSENSUS_IS_LARGER_THAN_MAX_CONSENSUS_ERR);

    uint256 minAllowedConsensus = maxAllowedConsensus / uint256(2) + 1; // example: 5 / 2 + 1 = 3
    require(quorum >= minAllowedConsensus, CONSENSUS_IS_LOWER_THAN_MIN_CONSENSUS_ERR);
}

function validateSignatures(
    bytes[] memory signatures,
    function() internal view returns (uint256, uint256) consensusRange
) view {
    (uint256 min, uint256 max) = consensusRange();
    require(signatures.length >= min, SUPPLIED_TOO_FEW_SIGNATURES_ERR);
    require(signatures.length <= max, SUPPLIED_TOO_MANY_SIGNATURES_ERR);
}

function validateSignatureLength(bytes memory signature) pure {
    require(signature.length == SIGNATURE_LENGTH, INCORRECT_SIGNATURE_LENGTH_ERR);
}
