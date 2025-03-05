import { SolidityType } from '../base';
import { verifyAddress } from '../solidity-types-verification.helper';

// natively supported type in artifacts
export class SolidityAddressType extends SolidityType<string> {
  static create = (address: string) => {
    return this.build(address, verifyAddress);
  };

  public get address(): string {
    return this.verifiedValue;
  }
}
