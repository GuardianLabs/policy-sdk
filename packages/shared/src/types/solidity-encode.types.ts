import {
  SolidityAddressType,
  SolidityBytesType,
} from '../solidity-types/native-types';

export type PrimitiveEncodeParamTypes = string | boolean | number;

// note: each children of SolidityBytesType is SolidityBytesType as well
export type ObjectEncodeParamTypes = SolidityAddressType | SolidityBytesType;
// | SolidityUint24ListType;

export type EncodedParamType =
  | PrimitiveEncodeParamTypes
  | ObjectEncodeParamTypes;
