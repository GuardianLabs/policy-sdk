import { assert, expect } from 'chai';

type ComparingType = string | number | boolean | bigint;

type ComparingMethod<T extends ComparingType> = (first: T, second: T) => void;

class Check {
  static check = <T extends ComparingType>(
    first: T,
    second: T,
    strict: boolean,
  ) => {
    const comparingHelper: ComparingMethod<ComparingType> = (
      first: ComparingType,
      second: ComparingType,
    ) => {
      expect(first).to.equal(second);
    };

    return this.compare(first, second, strict, comparingHelper);
  };

  static notCheck = <T extends ComparingType>(
    first: T,
    second: T,
    strict: boolean,
  ) => {
    const comparingHelper: ComparingMethod<ComparingType> = (
      first: ComparingType,
      second: ComparingType,
    ) => {
      expect(first).not.to.equal(second);
    };

    return this.compare(first, second, strict, comparingHelper);
  };

  static compare = <T extends ComparingType>(
    first: T,
    second: T,
    strict: boolean,
    comparingHelper: ComparingMethod<T>,
  ) => {
    assert(
      typeof first === typeof second,
      'Supplied types are not equal types',
    );

    assert(
      validateComparingType(first),
      "Supplied value is not 'ComparingType' value",
    );

    if (validateStringType(first) && validateStringType(second) && !strict) {
      first = first.toLowerCase() as T;
      second = second.toLowerCase() as T;
    }

    comparingHelper(first, second);
  };
}

const validateComparingType = (
  value: ComparingType,
): value is ComparingType => {
  const valueType = typeof value;
  const supportedTypes: Array<string> = [
    'string',
    'number',
    'boolean',
    'bigint',
  ];

  return supportedTypes.includes(valueType);
};

const validateStringType = (value: ComparingType): value is string => {
  return typeof value === 'string';
};

export const check = <T extends ComparingType>(
  first: T,
  second: T,
  strict: boolean = false,
) => {
  return Check.check(first, second, strict);
};

export const checkNotEqual = <T extends ComparingType>(
  first: T,
  second: T,
  strict: boolean = false,
) => {
  return Check.notCheck(first, second, strict);
};
