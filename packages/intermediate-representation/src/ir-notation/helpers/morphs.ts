import { getAddress, getBytes } from 'ethers';
import { SupportedSolidityType } from '../parser/types';

export const strToBool = (str: string): boolean => {
  return str == 'true' ? true : false;
};

export const toTypedWithKnownType = (
  arg: string,
  type: SupportedSolidityType,
) => {
  switch (type) {
    case SupportedSolidityType.Address:
      return getAddress(arg);
    case SupportedSolidityType.Bool:
      return strToBool(arg);
    case SupportedSolidityType.String:
      return arg.replace(/^"(.*)"$/, '$1');
    case SupportedSolidityType.Bytes:
      return getBytes(arg);
    case SupportedSolidityType.Uint256:
      return BigInt(arg);
    default:
      throw new Error(`Unsupported constant value type: ${arg}: ${type}`);
  }
};
