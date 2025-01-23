//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { StatefulArtifactBase } from "../basis/StatefulArtifactBase.sol";
import { BOOL, BYTES, UINT } from "../../constants/Export.sol";
import { ApprovalFlowInternal } from "./ApprovalFlowInternal.sol";

contract ApprovalFlow is StatefulArtifactBase, ApprovalFlowInternal {
    function getInitDescriptor()
        external
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes)
    {
        uint256 argsLength = 2;

        argsNames = new string[](argsLength);
        argsNames[0] = "serializedApproversList";
        argsNames[1] = "quorum";

        argsTypes = new string[](argsLength);
        argsTypes[0] = BYTES;
        argsTypes[1] = UINT;
    }

    function getExecDescriptor()
        external
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType)
    {
        uint256 argsLength = 2;

        argsNames = new string[](argsLength);
        argsNames[0] = "messageHashPacked";
        argsNames[1] = "signaturesPacked";

        argsTypes = new string[](argsLength);
        argsTypes[0] = BYTES;
        argsTypes[1] = BYTES;
        returnType = BOOL;
    }

    function _init(bytes memory data) internal override {
        // note: trigger base configuration & validations
        super._init(data);

        (bytes memory serializedApproversList, uint256 quorum) = abi.decode(data, (bytes, uint256));

        address[] memory approversList = abi.decode(serializedApproversList, (address[]));

        _initializeApprovalConfig(approversList, quorum);
    }

    function _exec(bytes[] memory data) internal override returns (bytes memory encodedResult) {
        // note: trigger base validations
        super._exec(data);

        bytes memory messageHashPacked = abi.decode(data[0], (bytes));
        bytes memory signaturesPacked = abi.decode(data[1], (bytes));

        bytes32 messageHash = abi.decode(messageHashPacked, (bytes32));
        bytes[] memory signatures = abi.decode(signaturesPacked, (bytes[]));

        bool isApproved = checkApprovals(messageHash, signatures);
        encodedResult = abi.encode(isApproved);
    }
}
