import { solidityEncode } from '../../solidity-encode-decode';
import { SolidityBytesType } from '../native-types';
import { verifyBytesList } from '../solidity-types-verification.helper';

// todo: refactor as done in 'SolidityUint24ListTypePacked'
export class SolidityBytesListPacked extends SolidityBytesType {
  static fromList = (list: Array<string>) => {
    verifyBytesList(list);
    const toBytes = solidityEncode(['bytes[]'], [list]);

    return this.create(toBytes);
  };
}
