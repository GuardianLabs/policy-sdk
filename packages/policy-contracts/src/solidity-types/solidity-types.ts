import { verifyAddress, verifyBytes, verifyUint24Array } from './';

type Verifier<T> = (value: T) => T;

class SolidityType<T> {
  static build<T, R>(
    this: new (param: T) => R,
    nonVerifiedValue: T,
    verifier: Verifier<T>,
  ): R {
    const verified = verifier(nonVerifiedValue);

    return new this(verified);
  }

  constructor(protected verifiedValue: T) {}

  public get value(): T {
    return this.verifiedValue;
  }
}

export class SolidityAddressType extends SolidityType<string> {
  static create = (address: string) => {
    return this.build(address, verifyAddress);
  };

  public get address(): string {
    return this.verifiedValue;
  }
}

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

// implicitness
export class SolidityUint24ListType extends SolidityType<Array<number>> {
  static create = (uintList: Array<number>) => {
    return this.build([...uintList], verifyUint24Array);
  };

  public get uintArray(): Array<number> {
    return this.verifiedValue;
  }
}
