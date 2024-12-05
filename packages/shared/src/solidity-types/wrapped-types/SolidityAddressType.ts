import { verifyAddress } from '../solidity-types-verification.helper';
import { SolidityType } from './SolidityType';

export class SolidityAddressType extends SolidityType<string> {
  static create = (address: string) => {
    return this.build(address, verifyAddress);
  };

  public get address(): string {
    return this.verifiedValue;
  }
}
