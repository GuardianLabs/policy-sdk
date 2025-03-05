import { solidityEncode } from '../../solidity-encode-decode';
import { SolidityBytesType } from '../native-types';
import { verifyBytes } from '../solidity-types-verification.helper';

// todo: refactor as done in 'SolidityUint24ListTypePacked'
export class SolidityBytes32TypePacked extends SolidityBytesType {
  static fromString = (bytes32Value: string) => {
    verifyBytes(bytes32Value);
    const toBytes = solidityEncode(['bytes32'], [bytes32Value]);

    return this.create(toBytes);
  };
}
