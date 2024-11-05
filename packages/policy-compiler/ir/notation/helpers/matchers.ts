import { isAddress, isHexString } from 'ethers';

export const strIsBool = (str: string): boolean => {
  return str == 'true' || str == 'false';
};
export const strIsAddress = (str: string): boolean => {
  return isAddress(str);
};
export const strIsString = (str: string): boolean => {
  return /^".*"$/.test(str);
};
export const strIsBytes = (str: string): boolean => {
  return isHexString(str);
};
export const strIsUint256 = (str: string): boolean => {
  return /^\d+$/.test(str);
};

export const strIsVar = (str: string): boolean => {
  return /^var/.test(str);
};
export const strIsSubst = (str: string): boolean => {
  return str[0] == '|' && str[str.length - 1] == '|';
};

export const isConstant = (arg: string): boolean => {
  const regex = /^(?!var)(?!\|.*\|$).*/;

  return regex.test(arg);
};
