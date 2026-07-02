//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { NOW } from "../../artifacts-library/constants/ArtifactsAddresses.sol";
import {
    BasicArtifactReflection
} from "../../artifacts-library/inheritance/BasicArtifactReflection.sol";

contract Now1 is BasicArtifactReflection {
    constructor() BasicArtifactReflection(NOW) {}
}
