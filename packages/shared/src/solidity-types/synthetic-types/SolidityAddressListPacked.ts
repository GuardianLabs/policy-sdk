import { solidityEncode } from '../../solidity-encode-decode';
import { SolidityBytesType } from '../native-types';
import { verifyAddressesList } from '../solidity-types-verification.helper';

// todo: refactor as done in 'SolidityUint24ListTypePacked'
export class SolidityAddressListPacked extends SolidityBytesType {
  static fromList = (list: Array<string>) => {
    const verifiedList = verifyAddressesList(list);
    const toBytes = solidityEncode(['address[]'], [verifiedList]);

    return this.create(toBytes);
  };
}
