import { solidityEncode } from '../../solidity-encode-decode';
import {
  verifyBytes,
  verifyUint24Array,
} from '../solidity-types-verification.helper';
import { SolidityType } from './SolidityType';

export class SolidityBytesType extends SolidityType<string> {
  // todo: inrotduce a bit more native approach
  static createUint24List = (list: number[]) => {
    const verifiedList = verifyUint24Array(list);
    const packedList = solidityEncode(['uint24[]'], [verifiedList]);

    return this.create(packedList);
  };

  static create = (bytes: string) => {
    return this.build(bytes, verifyBytes);
  };

  // 'SolidityBytesType' has to have at least one even private method that differs
  // from 'SolidityAddressType'; otherwise 'PreciseEncodedParamType' won't work properly
  public get bytes(): string {
    return this.verifiedValue;
  }
}
