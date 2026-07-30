import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { CreditScore } from '../src/typechain';
import { deployCreditScore } from './utils';

describe('Purely onchain policy flow (create + initialization + enforcement)', () => {
  let admin: SignerWithAddress;
  let user: SignerWithAddress;
  let creditScore: CreditScore;

  before(async () => {
    [admin, user] = await ethers.getSigners();

    creditScore = await deployCreditScore(admin);
  });

  it('should successfully retrieve user score when policy is enforced', async () => {
    // The policy attached to "retrieveUserScore" requires block.timestamp >= 1780093595 (May 29 2026)
    // Since the current date is May 30 2026, the policy should be enforced successfully.

    // Call retrieveUserScore via tx
    await creditScore.retrieveUserScore(user.address, 0);
    const tx = creditScore.retrieveUserScore(user.address, 0);
    await expect(tx).to.be.not.reverted;

    // Call retrieveUserScore via staticCall
    const score = await creditScore.retrieveUserScore.staticCall(
      user.address,
      0,
    );
    expect(score).to.equal(9999n); // DEFAULT_SCORE
  });
});
