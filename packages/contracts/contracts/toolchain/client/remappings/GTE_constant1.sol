//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { GTE_CONSTANT } from "../../artifacts-library/constants/ArtifactsAddresses.sol";
import {
    BasicArtifactReflection
} from "../../artifacts-library/inheritance/BasicArtifactReflection.sol";
import { ConstantArgument, SubstitutionArgument } from "../../../Types.sol";

// note: artifact that compares if variable value (left-hand operand) is greater
// than or equal to constant value (right-hand operand)
contract GTE_constant1 is BasicArtifactReflection {
    constructor() BasicArtifactReflection(GTE_CONSTANT) {}

    // note: left-hand operand (supplied as substituion)
    // right-hand operand supplied as constant
    function takes(bytes32 substitutedArgId, uint256 constValue) public {
        addSubstitution(
            SubstitutionArgument({ supplierNodeId: substitutedArgId, index: uint256(0) })
        );
        addConstant(ConstantArgument({ value: abi.encode(constValue), index: uint256(1) }));
    }

    // function with(uint256 constValue) public {
    //     setInitData(abi.encode(constValue));
    // }
}
