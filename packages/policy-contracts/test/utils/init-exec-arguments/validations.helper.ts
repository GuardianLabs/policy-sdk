import {
  ALLOWED_SOLIDITY_REFERENCE_TYPES,
  ALLOWED_SOLIDITY_VALUE_TYPES,
  SOLIDITY_ADDRESS,
  SOLIDITY_BOOL,
  SOLIDITY_BYTES,
  SOLIDITY_BYTES32,
  SOLIDITY_STRING,
  SOLIDITY_UINT256,
  SolidityAddressType,
  SolidityBytesType,
  SolidityUint24ListType,
  SOLIIDTY_UINT24_LIST,
} from '../../solidity-types';
import { EncodedParamType, inferSolidityType } from '../solidity-encode-decode';
import {
  NormalizedParamType,
  Unnormalized,
  UnnormalizedParamType,
} from './types';

export const validateAppendedParamsCount = (
  expectedLength: number,
  existingLength: number,
  suppliedLength: number,
): void => {
  if (suppliedLength + existingLength > expectedLength) {
    throw new Error(`Supplied params length (${suppliedLength}) will overflow an expected params
      length (${expectedLength}). Previously provided params length (${existingLength})`);
  }
};

export const validateParamsCount = (
  expectedLength: number,
  existingLength: number,
): void => {
  if (existingLength !== expectedLength) {
    throw new Error(
      `Existing params length (${existingLength}) do not match expected params length (${expectedLength})`,
    );
  }
};

export const validateSupportedArgTypeValues = (argTypes: string[]): void => {
  if (argTypes.length === 0) return;

  const allowedTypes = [
    ...ALLOWED_SOLIDITY_VALUE_TYPES,
    ...ALLOWED_SOLIDITY_REFERENCE_TYPES,
  ];

  const isSupported = argTypes.every((value) => allowedTypes.includes(value));

  if (!isSupported) {
    throw new Error(`At least one of the Descriptor-defined Solidity
      types [${argTypes}] is not supported. You may be using obsolete package version`);
  }
};

export const validateParamTypes = (
  expectedTypesList: string[],
  existingParamsListLength: number,
  params: Array<EncodedParamType>,
): void => {
  for (const [index, param] of params.entries()) {
    const newParamExpectedIndex = existingParamsListLength + index;
    const newParamExpectedTypename = expectedTypesList[newParamExpectedIndex];

    const { typename: newParamTypename } = inferSolidityType(param);
    if (newParamExpectedTypename !== newParamTypename) {
      throw new Error(`Provided type (${newParamTypename}) of Param value does
        not match the Descriptor-defined type (${newParamExpectedTypename}) of Param value`);
    }
  }
};

export const normalizeParams = (
  expectedTypesList: string[],
  existingParamsListLength: number,
  params: Array<Unnormalized>,
): Array<NormalizedParamType> => {
  const normalizedParams = params.map((value, index) => {
    const nextParamIndex = existingParamsListLength + index;
    const nextParamExpectedTypename = expectedTypesList[nextParamIndex];

    return tryNormalizeType(nextParamExpectedTypename, value);
  });

  return normalizedParams;
};

const tryNormalizeType = (
  solidityTypename: string,
  value: Unnormalized,
): NormalizedParamType => {
  const typename = solidityTypename;
  if (typename === SOLIIDTY_UINT24_LIST && Array.isArray(value)) {
    return SolidityUint24ListType.create(value);
  }

  if (typename === SOLIDITY_ADDRESS && typeof value === 'string') {
    return SolidityAddressType.create(value);
  }

  if (typename === SOLIDITY_BYTES && typeof value === 'string') {
    return SolidityBytesType.create(value);
  }

  if (typename === SOLIDITY_STRING && typeof value === 'string') {
    return value;
  }

  if (typename === SOLIDITY_BYTES32 && typeof value === 'string') {
    return value;
  }

  if (typename === SOLIDITY_UINT256 && typeof value === 'number') {
    return value;
  }

  if (typename === SOLIDITY_BOOL && typeof value === 'boolean') {
    return value;
  }

  throw new Error(
    `Normalization failed: Supplied incorrect typename/value pair (${solidityTypename}/${value})`,
  );
};

export const wrapUnnormalized = (
  list: Array<Unnormalized>,
): Array<UnnormalizedParamType> => {
  return list.map((v) => ({ param: v }));
};

export const unwrapUnnormalized = (
  list: Array<UnnormalizedParamType>,
): Array<Unnormalized> => {
  return list.map((v) => v.param);
};
