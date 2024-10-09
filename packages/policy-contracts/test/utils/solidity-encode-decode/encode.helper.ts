import { defaultAbiCoder } from '.';
import {
  SolidityAddressType,
  SolidityBytesType,
  SolidityUint24ListType,
} from '../../solidity-types';

type SolidityEncodeReturnType = ReturnType<typeof defaultAbiCoder.encode>;
type SolidityEncodeInputParamsType = Parameters<typeof defaultAbiCoder.encode>;

export type PrimitiveEncodeParamTypes = string | boolean | number;

type ObjectEncodeParamTypes =
  | SolidityAddressType
  | SolidityBytesType
  | SolidityUint24ListType;

export type EncodedParamType =
  | PrimitiveEncodeParamTypes
  | ObjectEncodeParamTypes;

type PreciseEncodedParamType<T extends EncodedParamType> = T extends string
  ? 'string'
  : T extends boolean
    ? 'bool'
    : T extends number
      ? 'uint256'
      : T extends SolidityAddressType
        ? 'address'
        : T extends SolidityBytesType
          ? 'bytes'
          : T extends SolidityUint24ListType
            ? 'uint24[]'
            : any;

export const solidityEncode = (
  ...params: SolidityEncodeInputParamsType
): SolidityEncodeReturnType => {
  return defaultAbiCoder.encode(...params);
};

// note: this encode string, number, bool into respective Solidity presentation; type will pick automatically
// unless ObjectEncodeParamTypes is apllied, this will fail with proper encoding when raw string-bytes or string-address supplied
export const solidityEncodeSingleParam = <T extends EncodedParamType>(
  primitiveTypeOrObject: T,
): SolidityEncodeReturnType => {
  const { typename, value: unpackedValue } = inferSolidityType(
    primitiveTypeOrObject,
  );

  const encodedResult = solidityEncode([typename], [unpackedValue]);
  return encodedResult;
};

export const solidityEncodeMultipleParams = <T extends Array<EncodedParamType>>(
  ...primitiveTypeOrObjectList: T
): SolidityEncodeReturnType => {
  const typesAndValues = primitiveTypeOrObjectList.map((v) =>
    inferSolidityType(v),
  );

  const encodedResult = solidityEncode(
    typesAndValues.map((v) => v.typename),
    typesAndValues.map((v) => v.value),
  );
  return encodedResult;
};

const inferSolidityType = <T extends EncodedParamType>(
  primitiveTypeOrObject: T,
) => {
  if (isPrimitiveType(primitiveTypeOrObject)) {
    return inferPirimitiveType(primitiveTypeOrObject);
  } else if (isObjectType(primitiveTypeOrObject)) {
    return inferObjectType(primitiveTypeOrObject);
  } else
    throw new Error(
      `Encode: Provide with not supported encoding type ${primitiveTypeOrObject}`,
    );
};

const inferPirimitiveType = <T extends PrimitiveEncodeParamTypes>(
  primitiveTypeOrObject: T,
) => {
  let typename: PreciseEncodedParamType<T>;
  let value = primitiveTypeOrObject;

  const type = typeof primitiveTypeOrObject;
  if (type === 'boolean') {
    typename = 'bool' as PreciseEncodedParamType<T>;
  } else if (type === 'string') {
    typename = 'string' as PreciseEncodedParamType<T>;
  } else if (type === 'number') {
    typename = 'uint256' as PreciseEncodedParamType<T>;
  } else
    throw new Error(
      `Encode: Not supported encoding type for primitive-type ${type}`,
    );

  return { typename, value };
};

const inferObjectType = <T extends ObjectEncodeParamTypes>(
  primitiveTypeOrObject: T,
) => {
  let typename: PreciseEncodedParamType<T>;
  const value = primitiveTypeOrObject.value;

  if (primitiveTypeOrObject instanceof SolidityAddressType) {
    typename = 'address' as PreciseEncodedParamType<T>;
  } else if (primitiveTypeOrObject instanceof SolidityBytesType) {
    typename = 'bytes' as PreciseEncodedParamType<T>;
  } else if (primitiveTypeOrObject instanceof SolidityUint24ListType) {
    typename = 'uint24[]' as PreciseEncodedParamType<T>;
  } else
    throw new Error(
      `Encode: Not supported encoding type for object: ${primitiveTypeOrObject}`,
    );
  return { typename, value };
};

// guards
const isPrimitiveType = (
  value: EncodedParamType,
): value is PrimitiveEncodeParamTypes => {
  const type = typeof value;
  return type === 'string' || type === 'boolean' || type === 'number';
};

const isObjectType = (
  value: EncodedParamType,
): value is ObjectEncodeParamTypes => {
  const type = typeof value;
  return (
    type === 'object' &&
    (value instanceof SolidityAddressType ||
      value instanceof SolidityBytesType ||
      value instanceof SolidityUint24ListType)
  );
};
