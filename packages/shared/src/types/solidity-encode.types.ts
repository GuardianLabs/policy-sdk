import {
  SolidityAddressType,
  SolidityBytesType,
  SolidityUint24ListType,
} from '../solidity-types/wrapped-types';

export type PrimitiveEncodeParamTypes = string | boolean | number;

export type ObjectEncodeParamTypes =
  | SolidityAddressType
  | SolidityBytesType
  | SolidityUint24ListType;

export type EncodedParamType =
  | PrimitiveEncodeParamTypes
  | ObjectEncodeParamTypes;
