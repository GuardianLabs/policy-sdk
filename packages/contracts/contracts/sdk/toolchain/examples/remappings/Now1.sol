//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { NOW } from "../../constants/DeployedArtifacts.sol";
import { ArtifactReflectionCore } from "../../client/ArtifactReflectionCore.sol";

contract Now1 is ArtifactReflectionCore {
    constructor() ArtifactReflectionCore(NOW) {}
}
