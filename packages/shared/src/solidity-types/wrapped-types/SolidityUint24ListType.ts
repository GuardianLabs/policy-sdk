import { verifyUint24Array } from '../solidity-types-verification.helper';
import { SolidityType } from './SolidityType';

// implicitness
export class SolidityUint24ListType extends SolidityType<Array<number>> {
  static create = (uintList: Array<number>) => {
    return this.build([...uintList], verifyUint24Array);
  };

  public get uintArray(): Array<number> {
    return this.verifiedValue;
  }
}
