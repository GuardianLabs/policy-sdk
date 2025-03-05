type Verifier<T> = (value: T) => T;

export abstract class SolidityType<T> {
  static build<T, R>(
    this: new (param: T, verifierMethod: Verifier<T>) => R,
    nonVerifiedValue: T,
    verifier: Verifier<T>,
  ): R {
    const verified = verifier(nonVerifiedValue);

    return new this(verified, verifier);
  }

  constructor(
    protected verifiedValue: T,
    protected verifierMethod: Verifier<T>,
  ) {}

  public get value(): T {
    return this.verifiedValue;
  }

  protected setValue(value: T) {
    this.verifiedValue = this.verifierMethod(value);
  }
}
