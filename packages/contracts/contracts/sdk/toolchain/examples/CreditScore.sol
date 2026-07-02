//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { SimplePolicy } from "../client/SimplePolicy.sol";

/* Consumer contract */
contract CreditScore {
    uint256 private constant DEFAULT_SCORE = 9999; // 9.999 * 10^3
    mapping(address userAddress => uint256 score) private usersScore;
    SimplePolicy internal policy;

    constructor() {
        _initPolicy();
    }

    function retrieveUserScore(
        address userAddress,
        uint256 comparingTime
    ) public returns (uint256 score) {
        // note: enforce policy
        _enforcePolicy(comparingTime);

        // note: return score if policy enforce
        score = _retrieveUserScore(userAddress);
    }

    function _initPolicy() internal {
        policy = new SimplePolicy();
        policy.create();
    }

    function _enforcePolicy(uint256 comparingTime) internal {
        bool secondVariable = _preparePolicyArgs(comparingTime);
        policy.assignExecVariables(secondVariable);
        policy.enforce();
    }

    function _preparePolicyArgs(uint256 comparingTime) internal pure returns (bool result) {
        (comparingTime);
        /* result = comparingTime > block.timestamp; */
        result = true;
    }

    function _retrieveUserScore(address userAddress) private view returns (uint256 score) {
        score = usersScore[userAddress];

        if (score == 0) {
            score = DEFAULT_SCORE;
        }
    }
}
