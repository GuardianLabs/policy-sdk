import { getAddress, getBytes } from 'ethers';

export const verifyAddress = (value: string) => {
  // validates, normalizes and returns checksumed value
  const address = getAddress(value);
  return address;
};

export const verifyAddressesList = (list: Array<string>) => {
  const verifiedList = list.map((v) => verifyAddress(v));

  return verifiedList;
};

export const verifyBytesList = (list: Array<string>) => {
  const verifiedList = list.map((v) => verifyBytes(v));

  return verifiedList;
};

export const verifyBytes = (value: string) => {
  // just a validation; no need to return as Uint8Array
  getBytes(value);
  return value;
};

export const verifyUint24Array = (
  list: Array<number>,
  expectedLength?: number,
) => {
  // validates each element fits into solidity uint24 type
  const isValidTreshold = (value: number): boolean => {
    const tresholdMin = 0;
    const tresholdMax = Math.pow(2, 24);

    const result = value >= tresholdMin && value <= tresholdMax;
    return result;
  };

  let isValid =
    Array.isArray(list) &&
    list.every((value) => typeof value === 'number' && isValidTreshold(value));

  // validate: 'list.length' is equal to 'expectedLength'
  isValid = !!expectedLength
    ? isValid && list.length === expectedLength
    : isValid;

  if (!isValid) throw new Error(`Can not satisfy Uint24 array validations`);

  return list;
};
