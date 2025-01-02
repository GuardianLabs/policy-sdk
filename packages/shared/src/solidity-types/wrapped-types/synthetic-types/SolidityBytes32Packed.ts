import { solidityEncode } from '../../../solidity-encode-decode';
import { verifyBytes } from '../../solidity-types-verification.helper';
import { SolidityBytesType } from '../SolidityBytesType';

export class SolidityBytes32Type extends SolidityBytesType {
  static fromString = (bytes32Value: string) => {
    verifyBytes(bytes32Value);
    const toBytes = solidityEncode(['bytes32'], [bytes32Value]);

    return this.create(toBytes);
  };
}
