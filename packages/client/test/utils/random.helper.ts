import { faker } from '@faker-js/faker';
import { EncodedParamType } from '../types';

export const randomBoolean = (probability: number = 0.51): boolean => {
  const value = faker.datatype.boolean({ probability });
  return value;
};

export const duplicatedValuesArray = <T extends EncodedParamType>(
  length: number,
  value: T,
): Array<T> => {
  const list = new Array<T>(length).fill(value);
  return list;
};
