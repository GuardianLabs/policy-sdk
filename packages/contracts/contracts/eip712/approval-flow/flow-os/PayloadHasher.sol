//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { StatefulArtifactBase } from "../../../pre-defined/common/basis/StatefulArtifactBase.sol";
import { ADDRESS, BYTES } from "../../../pre-defined/constants/Export.sol";
import { PayloadHasherInternal } from "./PayloadHasherInternal.sol";
import { ApproveTransactionPayload } from "./types/PayloadTypes.sol";

contract PayloadHasher is StatefulArtifactBase, PayloadHasherInternal {
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

        ApproveTransactionPayload memory payload = abi.decode(
            messagePacked,
            (ApproveTransactionPayload)
        );

        bytes32 eip712Hash = eip712PayloadHash(payload);
        // packs from bytes32 to bytes; then packs bytes to bytes
        encodedResult = abi.encode(abi.encode(eip712Hash));
    }
}
