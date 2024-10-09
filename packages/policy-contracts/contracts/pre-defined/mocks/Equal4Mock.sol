//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { ArtifactBase } from "../common/basis/ArtifactBase.sol";
import { BOOL } from "../constants/Export.sol";

/* solhint-disable var-name-mixedcase */
contract Equal4Mock is ArtifactBase {
    function exec(bytes[] memory data) external pure override returns (bytes memory) {
        validateExecArgumentsLength(data);

        bool numA_radix0 = abi.decode(data[0], (bool));
        bool numA_radix1 = abi.decode(data[1], (bool));
        bool numA_radix2 = abi.decode(data[2], (bool));
        bool numA_radix3 = abi.decode(data[3], (bool));
        bool numB_radix0 = abi.decode(data[4], (bool));
        bool numB_radix1 = abi.decode(data[5], (bool));
        bool numB_radix2 = abi.decode(data[6], (bool));
        bool numB_radix3 = abi.decode(data[7], (bool));

        return
            abi.encode(
                numA_radix0 == numB_radix0 &&
                    numA_radix1 == numB_radix1 &&
                    numA_radix2 == numB_radix2 &&
                    numA_radix3 == numB_radix3
            );
    }

    function getExecDescriptor()
        public
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType)
    {
        uint256 argsLength = 8;

        argsNames = new string[](argsLength);
        argsNames[0] = "numARadix0";
        argsNames[1] = "numARadix1";
        argsNames[2] = "numARadix2";
        argsNames[3] = "numARadix3";
        argsNames[4] = "numBRadix0";
        argsNames[5] = "numBRadix1";
        argsNames[6] = "numBRadix2";
        argsNames[7] = "numBRadix3";

        argsTypes = new string[](argsLength);
        argsTypes[0] = BOOL;
        argsTypes[1] = BOOL;
        argsTypes[2] = BOOL;
        argsTypes[3] = BOOL;
        argsTypes[4] = BOOL;
        argsTypes[5] = BOOL;
        argsTypes[6] = BOOL;
        argsTypes[7] = BOOL;

        returnType = BOOL;
    }
}
