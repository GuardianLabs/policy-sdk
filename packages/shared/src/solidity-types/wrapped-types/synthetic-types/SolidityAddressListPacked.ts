import { solidityEncode } from '../../../solidity-encode-decode';
import { verifyAddressesList } from '../../solidity-types-verification.helper';
import { SolidityBytesType } from '../SolidityBytesType';

export class SolidityAddressListPacked extends SolidityBytesType {
  static fromList = (list: Array<string>) => {
    const verifiedList = verifyAddressesList(list);
    const toBytes = solidityEncode(['address[]'], [verifiedList]);

    return this.create(toBytes);
  };
}
