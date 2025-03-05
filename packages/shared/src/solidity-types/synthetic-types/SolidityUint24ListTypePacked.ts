import { solidityDecode } from '../../solidity-encode-decode';
import { SOLIIDTY_UINT24_LIST } from '../constants';
import { SolidityBytesType } from '../native-types';
import { packAndVerifyUint24List } from '../solidity-types-packing.helper';
import { verifyBytes } from '../solidity-types-verification.helper';

export class SolidityUint24ListTypePacked extends SolidityBytesType {
  static fromUint24List = (list: number[]) => {
    const bytesPackedList = packAndVerifyUint24List(list);

    return this.build(bytesPackedList, verifyBytes);
  };

  public get uintArray(): Array<bigint> {
    const [decoded] = solidityDecode(
      [SOLIIDTY_UINT24_LIST],
      this.verifiedValue,
    );
    const result = [...(decoded as Array<bigint>)];
    return result;
  }

  setValueAtPos = (pos: number, value: number) => {
    const toNumbersList = this.uintArray.map((v) => Number(v)); // should be safe since it is in range of uint24
    toNumbersList[pos] = value;

    const bytesPackedList = packAndVerifyUint24List(toNumbersList);

    this.setValue(bytesPackedList);
  };
}
