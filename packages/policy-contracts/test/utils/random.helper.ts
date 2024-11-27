import { faker } from '@faker-js/faker';
import { getAddress } from 'ethers';
import {
  EncodedParamType,
  PrimitiveEncodeParamTypes,
} from '../../src/solidity-encode-decode';

export const randomEthAddress = (): string => {
  return getAddress(faker.finance.ethereumAddress());
};

export const randomBoolean = (probability: number = 0.51): boolean => {
  const value = faker.datatype.boolean({ probability });
  return value;
};

export const randomHex = (length: number = 70): string => {
  const value = faker.string.hexadecimal({ length });
  return value;
};

export const randomString = (): string => {
  const value = faker.commerce.product();
  return value;
};

export const randomUint = (min: number = 10, max: number = 1e6): number => {
  return faker.number.int({ min, max });
};

export const randomValuesArray = <T extends PrimitiveEncodeParamTypes>(
  length: number,
  type: T,
): Array<T> => {
  const randomHelper = inferRandomFunction(type);

  const list = [...new Array<T>(length)].map(() => randomHelper());
  return list;
};

const inferRandomFunction = <T extends PrimitiveEncodeParamTypes>(
  type: T,
): (() => T) => {
  const typeName = typeof type;

  if (typeName === 'boolean') {
    return randomBoolean as () => T;
  }
  if (typeName === 'string') {
    return randomString as () => T;
  }
  if (typeName === 'number') {
    return randomUint as () => T;
  }

  throw new Error(`Not supported random type ${typeName}`);
};

export const duplicatedValuesArray = <T extends EncodedParamType>(
  length: number,
  value: T,
): Array<T> => {
  const list = new Array<T>(length).fill(value);
  return list;
};
