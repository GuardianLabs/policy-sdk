//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { SIGNATURE_IS_CONSUMED_ERR } from "../constants/Errors.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SigUsage {
    mapping(bytes32 signatureHash => bool isKnown) internal isUsed;

    function markSignatureConsumed(bytes memory signature) internal {
        bytes32 hashed = keccak256(signature);
        markSignatureConsumed(hashed);
    }

    function markSignatureConsumed(bytes32 signatureHash) internal {
        isUsed[signatureHash] = true;
    }

    function validateSignatureNotConsumed(bytes memory signature) internal view {
        bytes32 hashed = keccak256(signature);
        validateSignatureNotConsumed(hashed);
    }

    function validateSignatureNotConsumed(bytes32 signatureHash) internal view {
        require(isUsed[signatureHash] == false, SIGNATURE_IS_CONSUMED_ERR);
    }

    function recoverSignatory(
        bytes32 messageHash,
        bytes memory signature
    ) internal pure returns (address signatory) {
        signatory = ECDSA.recover(messageHash, signature);
    }
}
