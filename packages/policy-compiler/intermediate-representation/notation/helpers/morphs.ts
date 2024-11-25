import { getAddress, getBytes } from 'ethers';
import { Type } from '../parser/types';

export const strToBool = (str: string): boolean => {
  return str == 'true' ? true : false;
};

export const toTypedWithKnownType = (arg: string, type: Type) => {
  switch (type) {
    case Type.Address:
      return getAddress(arg);
    case Type.Bool:
      return strToBool(arg);
    case Type.String:
      return arg.replace(/^"(.*)"$/, '$1');
    case Type.Bytes:
      return getBytes(arg);
    case Type.Uint256:
      return BigInt(arg);
    default:
      throw new Error(`Unsupported constant value type: ${arg}: ${type}`);
  }
};
