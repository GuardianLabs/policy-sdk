// import { BigNumberish } from 'ethers';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers } from 'hardhat';

describe('', () => {
  let signer1: SignerWithAddress;

  before(async () => {
    [signer1] = await ethers.getSigners();
  });
});
