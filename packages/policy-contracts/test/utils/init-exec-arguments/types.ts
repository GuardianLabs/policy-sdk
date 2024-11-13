import { EncodedParamType as NormalizedParamType } from '../solidity-encode-decode';
export { EncodedParamType as NormalizedParamType } from '../solidity-encode-decode';

export type ParamsConfig<T, K> = {
  paramsDescriptorValue?: T;
  params?: Array<K>;
};

export type Unnormalized = Array<number> | string | boolean | number;

export type UnnormalizedParamType = {
  param: Unnormalized;
};

export type UnnormalizedOrNormalizedParamType =
  | NormalizedParamType
  | UnnormalizedParamType;

export type MockecExecArgumentsConfig = {
  argsCount?: number;
  // when supplied, the list is created with length 'argsCount' and filled with 'defaultValue'
  defaultValue?: NormalizedParamType;
  // when supplied, and 'defaultValue' is undefined, the list is created with length 'argsCount' and filled with random values
  // type?: PrimitiveEncodeParamTypes;
};

// manual definition
export type InitParamsDescriptorValueTypeManual = {
  argsNames: string[];
  argsTypes: string[];
};
export type ExecParamsDescriptorValueTypeManual = {
  argsNames: string[];
  argsTypes: string[];
  returnType: string;
};
