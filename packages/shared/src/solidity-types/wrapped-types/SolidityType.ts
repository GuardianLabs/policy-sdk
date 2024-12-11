type Verifier<T> = (value: T) => T;

export abstract class SolidityType<T> {
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
