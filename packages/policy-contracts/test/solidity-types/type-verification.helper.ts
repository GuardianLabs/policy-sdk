import { getAddress, getBytes } from 'ethers';

export const verifyAddress = (value: string) => {
  // validates, normalizes and returns checksumed value
  const address = getAddress(value);
  return address;
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
  const tresholdMin = 0;
  const tresholdMax = Math.pow(2, 24);
  // validates each element fits into solidity uint24 type
  let isValid = list.every(
    (value) => value >= tresholdMin && value <= tresholdMax,
  );

  // validate: 'list.length' is equal to 'expectedLength'
  isValid = !!expectedLength
    ? isValid && list.length === expectedLength
    : isValid;

  if (!isValid) throw new Error(`Can not satisfy Uint24 array validations`);

  return list;
};
