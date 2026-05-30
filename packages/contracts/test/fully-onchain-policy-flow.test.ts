import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { CreditScore } from '../src/typechain';

describe.only('Fully onchain policy interaction (create + initialization and enforcement)', () => {
  let admin: SignerWithAddress;
  let user: SignerWithAddress;
  let creditScore: CreditScore;

  before(async () => {
    [admin, user] = await ethers.getSigners();

    const CreditScoreFactory = await ethers.getContractFactory('CreditScore');
    creditScore = await CreditScoreFactory.deploy();
  });

  it('should successfully retrieve user score when policy is enforced', async () => {
    // The policy attached to "retrieveUserScore" requires block.timestamp >= 1780093595 (May 29 2026)
    // Since the current date is May 30 2026, the policy should be enforced successfully.
    
    // Call retrieveUserScore via tx
    await creditScore.retrieveUserScore(user.address, 0)
    const tx = creditScore.retrieveUserScore(user.address, 0);
    await expect(tx).to.be.not.reverted;

    // Call retrieveUserScore via staticCall
    const score = await creditScore.retrieveUserScore.staticCall(user.address, 0);
    expect(score).to.equal(9999n); // DEFAULT_SCORE
  });
});
