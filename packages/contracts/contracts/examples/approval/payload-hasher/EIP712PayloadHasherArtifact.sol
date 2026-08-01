//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { StatefulArtifactBase } from "../../../sdk/erc-8006/StatefulArtifactBase.sol";
import { ADDRESS, BYTES } from "../../../sdk/erc-8006/constants/Export.sol";
import { PayloadHasherInternal } from "./PayloadHasherInternal.sol";
import { ApprovePayload } from "./types/PayloadTypes.sol";

/* 
Q: Why is PayloadHasherArtifact required, and why is it separated from ApprovalFlow?
A: The existence of PayloadHasherArtifact makes it possible to introduce a generic ApprovalFlow artifact.
Instead of processing the payload itself (decoding the signed payload, validating it, and hashing it according to the EIP-712 scheme),
ApprovalFlow delegates these responsibilities to PayloadHasherArtifact. It is expected that both artifacts are configured
together in a policy, where ApprovalFlow consumes the hash produced by PayloadHasherArtifact.
PayloadHasherArtifact must be customized for each payload type.
 */
contract EIP712PayloadHasherArtifact is StatefulArtifactBase, PayloadHasherInternal {
    function getInitDescriptor()
        external
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes)
    {
        uint256 argsLength = 1;

        argsNames = new string[](argsLength);
        argsNames[0] = "verifyingContract";

        argsTypes = new string[](argsLength);
        argsTypes[0] = ADDRESS;
    }

    function getExecDescriptor()
        external
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType)
    {
        uint256 argsLength = 1;

        argsNames = new string[](argsLength);
        argsNames[0] = "messagePacked";

        argsTypes = new string[](argsLength);
        argsTypes[0] = BYTES;

        returnType = BYTES;
    }

    function description() external pure override returns (string memory desc) {
        desc = _makeDescription(
            "used to calculate/be source of respective hash for the Approval-flow artifact"
        );
    }

    function _init(bytes memory data) internal override {
        // note: trigger base configuration & validations
        super._init(data);

        address veryfingContract = abi.decode(data, (address));

        _initialize(veryfingContract);
    }

    function _exec(bytes[] memory data) internal override returns (bytes memory encodedResult) {
        // note: trigger base validations
        super._exec(data);

        bytes memory messagePacked = abi.decode(data[0], (bytes));

        ApprovePayload memory payload = abi.decode(messagePacked, (ApprovePayload));

        bytes32 eip712Hash = eip712PayloadHash(payload);
        // packs from bytes32 to bytes;
        // then packs bytes to bytes as required in `getExecDescriptor()`
        encodedResult = abi.encode(abi.encode(eip712Hash));
    }
}
