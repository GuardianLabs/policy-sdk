import { AbiCoder } from 'ethers';
export { solidityPackedKeccak256 as keccak256Hash } from 'ethers';
export * from './decode.helper';
export * from './encode.helper';

export const defaultAbiCoder = AbiCoder.defaultAbiCoder();
