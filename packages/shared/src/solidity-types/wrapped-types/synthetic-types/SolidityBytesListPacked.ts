import { solidityEncode } from '../../../solidity-encode-decode';
import { verifyBytesList } from '../../solidity-types-verification.helper';
import { SolidityBytesType } from '../SolidityBytesType';

export class SolidityBytesListPacked extends SolidityBytesType {
  static fromList = (list: Array<string>) => {
    verifyBytesList(list);
    const toBytes = solidityEncode(['bytes[]'], [list]);

    return this.create(toBytes);
  };
}
