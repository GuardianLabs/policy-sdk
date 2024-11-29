import { defaultAbiCoder } from '.';

type SolidityDecodeReturnType = ReturnType<typeof defaultAbiCoder.decode>;
type SolidityDecodeInputParamsType = Parameters<typeof defaultAbiCoder.decode>;

type DecodedParamType = 'string' | 'bool' | 'uint256' | 'bytes32';

type PreciseDecodedParamType<T> = T extends 'string'
  ? string
  : T extends 'bool'
    ? boolean
    : T extends 'uint256'
      ? bigint
      : T extends 'bytes32'
        ? string
        : any;

export const solidityDecode = (
  ...params: SolidityDecodeInputParamsType
): SolidityDecodeReturnType => {
  return defaultAbiCoder.decode(...params);
};

export const solidityDecodeSingleParam = <T extends DecodedParamType>(
  type: T,
  data: string,
): PreciseDecodedParamType<T> => {
  const decodedArray = solidityDecode([type], data).toArray();

  if (decodedArray.length !== 1)
    throw new Error(
      'Decode: Solidity data contains more than single param value',
    );
  const [result] = decodedArray;

  const resultWithPropperType = inferAndPopulateWithTypescriptType(
    type,
    result,
  );
  return resultWithPropperType;
};

const inferAndPopulateWithTypescriptType = <T extends DecodedParamType>(
  type: T,
  value: any,
) => {
  if (type === 'string') {
    return value as PreciseDecodedParamType<T>;
  } else if (type === 'bool') {
    return value as PreciseDecodedParamType<T>;
  } else if (type === 'uint256') {
    return BigInt(value) as PreciseDecodedParamType<T>;
  } else if (type === 'bytes32') {
    return value as PreciseDecodedParamType<T>;
  }

  throw new Error('Decode: Not supported decoding type');
};
