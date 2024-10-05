import { AbiCoder } from 'ethers';

const defaultAbiCoder = AbiCoder.defaultAbiCoder();

type SolidityEncodeReturnType = ReturnType<typeof defaultAbiCoder.encode>;
type SolidityEncodeInputParamsType = Parameters<typeof defaultAbiCoder.encode>;

export const solidityEncode = (
  ...params: SolidityEncodeInputParamsType
): SolidityEncodeReturnType => {
  return defaultAbiCoder.encode(...params);
};
