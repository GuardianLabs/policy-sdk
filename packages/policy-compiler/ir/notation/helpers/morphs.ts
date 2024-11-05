import {
  hexToBytes,
  toChecksumAddress,
} from '@nomicfoundation/ethereumjs-util';
import { Type } from '../parser/types';
import {
  strIsAddress,
  strIsBool,
  strIsBytes,
  strIsString,
  strIsUint256,
} from './matchers';

export const strToBool = (str: string): boolean => {
  return str == 'true' ? true : false;
};

export const valueType = (arg: string): string => {
  if (strIsBool(arg)) {
    // bool
    return 'bool';
  } else if (strIsAddress(arg)) {
    // address
    return 'address';
  } else if (strIsUint256(arg)) {
    // uint
    return 'uint256';
  } else if (strIsString(arg)) {
    // string
    return 'string';
  } else if (strIsBytes(arg)) {
    // bytes
    return 'bytes';
  } else throw new Error('Unsupported constant value type');
};

export const toTyped = (arg: string): any => {
  if (strIsBool(arg)) {
    // bool
    return strToBool(arg);
  } else if (strIsAddress(arg)) {
    // address
    return toChecksumAddress(arg);
  } else if (strIsUint256(arg)) {
    // uint
    return BigInt(arg);
  } else if (strIsString(arg)) {
    // string
    return arg.replace(/^"(.*)"$/, '$1');
  } else if (strIsBytes(arg)) {
    // bytes
    return hexToBytes(arg);
  } else throw new Error('Unsupported constant value type');
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
      throw new Error('Unsupported constant value type');
  }
};
