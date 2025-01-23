// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { DOMAIN_TYPE_HASH } from "../constants/TypeHashDefinitions.sol";
import { MessageHashUtils } from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

library Eip712UtilsLib {
    function buildDomainSeparator(
        string memory domainName,
        string memory version,
        address verifyingContract
    ) internal view returns (bytes32) {
        bytes32 hashedDomainName = keccak256(bytes(domainName));
        bytes32 hashedVersion = keccak256(bytes(version));

        return
            keccak256(
                abi.encode(
                    DOMAIN_TYPE_HASH,
                    hashedDomainName,
                    hashedVersion,
                    block.chainid,
                    verifyingContract
                )
            );
    }

    function hashTypedDataV4(
        bytes32 domainSeparator,
        bytes32 structHash
    ) internal pure returns (bytes32) {
        return MessageHashUtils.toTypedDataHash(domainSeparator, structHash);
    }

    /* function hashAndRecover(
        bytes32 structHash,
        bytes memory signature,
        bytes32 domainSeparator
    ) internal pure returns (address originalSigner) {
        bytes32 hash = hashTypedDataV4(structHash, domainSeparator);
        originalSigner = ECDSA.recover(hash, signature);
    } */
}
