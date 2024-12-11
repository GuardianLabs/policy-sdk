import { verifyBytes } from '../solidity-types-verification.helper';
import { SolidityType } from './SolidityType';

export class SolidityBytesType extends SolidityType<string> {
  static create = (bytes: string) => {
    return this.build(bytes, verifyBytes);
  };

  // 'SolidityBytesType' has to have at least one even private method that differs
  // from 'SolidityAddressType'; otherwise 'PreciseEncodedParamType' won't work properly
  public get bytes(): string {
    return this.verifiedValue;
  }
}
