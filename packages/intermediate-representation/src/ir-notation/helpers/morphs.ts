import { SupportedSolidityType } from '@guardian-network/shared/src/types/intermediate-representation.types';
import { getAddress, getBytes } from 'ethers';

export const strToBool = (str: string): boolean => {
  return str == 'true' ? true : false;
};

export const toTypedWithKnownType = (
  arg: string,
  type: SupportedSolidityType,
) => {
  switch (type) {
    case 'address':
      return getAddress(arg);
    case 'bool':
      return strToBool(arg);
    case 'string':
      return arg.replace(/^"(.*)"$/, '$1');
    case 'bytes':
      return getBytes(arg);
    case 'uint256':
      return BigInt(arg);
    default:
      throw new Error(`Unsupported constant value type: ${arg}: ${type}`);
  }
};
