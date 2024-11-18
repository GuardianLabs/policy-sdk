import {
  hexToBytes,
  toChecksumAddress,
} from '@nomicfoundation/ethereumjs-util';
import { Type } from '../parser/types';

export const strToBool = (str: string): boolean => {
  return str == 'true' ? true : false;
};

export const toTypedWithKnownType = (arg: string, type: Type): any => {
  switch (type) {
    case Type.Address:
      return toChecksumAddress(arg);
    case Type.Bool:
      return strToBool(arg);
    case Type.String:
      return arg.replace(/^"(.*)"$/, '$1');
    case Type.Bytes:
      return hexToBytes(arg);
    case Type.Uint256:
      return BigInt(arg);
    default:
      throw new Error(`Unsupported constant value type: ${arg}: ${type}`);
  }
};
