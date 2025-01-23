// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { APPROVE_TX_TYPEHASH } from "./constants/TypeHashDefinitions.sol";
import { ApproveTransactionPayload } from "./types/PayloadTypes.sol";
import { Eip712UtilsLib as Util } from "./tools/Eip712UtilsLib.sol";
import { DOMAIN_NAME, DOMAIN_VERSION } from "./constants/Domain.sol";
import {
    validateAddressValue,
    validateBytes32Value,
    validateStringValue,
    validateUint256Value
} from "./tools/validation-tools.sol";

contract PayloadHasherInternal {
    address internal verifyingContract;

    event PayloadHasherInited(address indexed verifyingContract);

    function _initialize(address _verifyingContract) internal {
        validateAddressValue(_verifyingContract);
        verifyingContract = _verifyingContract;

        emit PayloadHasherInited(verifyingContract);
    }

    // todo: set visibility to internal; public is required to generate typechain version of ApproveTransactionPayload
    function eip712PayloadHash(
        ApproveTransactionPayload memory message
    ) public view returns (bytes32 eip712Hash) {
        doPayloadValidations(message);

        bytes32 hashedPayload = keccak256(_encodeApproveTxParameters(message));
        bytes32 domainSeparator = _buildDomainSeparator();

        eip712Hash = Util.hashTypedDataV4(domainSeparator, hashedPayload);
    }

    function _buildDomainSeparator() internal view returns (bytes32) {
        return Util.buildDomainSeparator(DOMAIN_NAME, DOMAIN_VERSION, verifyingContract);
    }

    function _encodeApproveTxParameters(
        ApproveTransactionPayload memory message
    ) internal pure returns (bytes memory) {
        return
            abi.encode(
                APPROVE_TX_TYPEHASH,
                message.nonce,
                keccak256(message.data),
                message.asset,
                keccak256(bytes(message.destination)),
                message.amount,
                message.hashA,
                message.hashB,
                message.mandatoryTagHashed
            );
    }

    function doPayloadValidations(ApproveTransactionPayload memory message) internal pure {
        validateAddressValue(message.asset);

        validateBytes32Value(message.mandatoryTagHashed);
        validateBytes32Value(message.hashA);
        validateBytes32Value(message.hashB);

        validateStringValue(message.destination);

        validateUint256Value(message.amount);
        validateUint256Value(message.nonce);
    }
}
