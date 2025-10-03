import { faker } from '@faker-js/faker';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { setBalance } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import {
  getAddress,
  parseUnits,
  solidityPackedKeccak256,
  Wallet,
} from 'ethers';
import { ethers } from 'hardhat';

export const getNonce = () => {
  return randomBytes(64);
};

export const getId = () => {
  return getNonce();
};

export const getSalt = () => {
  return solidityPackedKeccak256(['string'], [faker.string.uuid()]);
};

export const randomUint = (
  config: { min?: number; max?: number } = { min: 1, max: 1_000_000 },
) => {
  return faker.number.int({ ...config });
};

export const randomEthAddress = (): string => {
  return getAddress(faker.finance.ethereumAddress());
};

export const randomEthAddressList = (length: number = 2): string[] => {
  const list = new Array<string>(length).fill('').map(() => randomEthAddress());
  return list;
};

// note: resulting signer does not support calling 'signTypedData'
export const randomEthSigner = async (
  signerAddress: string = randomEthAddress(),
): Promise<SignerWithAddress> => {
  const signer = await ethers.getImpersonatedSigner(signerAddress);
  await setBalance(signer.address, parseUnits('167', 'ether'));

  return signer;
};

export const randomBytes = (length: number = 64) => {
  return faker.string.hexadecimal({
    length,
  });
};

export const random32Bytes = () => {
  return randomBytes(64);
};

export const mockedSignature = (): string => {
  const mockedSigner = Wallet.createRandom();
  const signature = mockedSigner.signMessageSync('message1');

  return signature;
};
