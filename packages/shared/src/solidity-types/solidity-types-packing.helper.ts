import { solidityEncode } from '../solidity-encode-decode';
import { SOLIIDTY_UINT24_LIST } from './constants';
import { verifyUint24Array } from './solidity-types-verification.helper';

export const packAndVerifyUint24List = (list: number[]) => {
  const verifiedList = verifyUint24Array(list);
  const bytesPackedList = solidityEncode(
    [SOLIIDTY_UINT24_LIST],
    [verifiedList],
  );

  return bytesPackedList;
};
