import { ethers } from 'ethers';

export const hashMessage = (payload: string) => {
  return ethers.hexlify(ethers.hashMessage(payload));
};
