import { expect } from 'chai';

// todo: explicit bignumber comparison, not true !== false
type ComparingType = string | number | boolean | bigint;

export const check = <T extends ComparingType>(
  first: T,
  second: T,
  strict: boolean = false,
) => {
  if (typeof first === 'number' && typeof second === 'number') {
    expect(first).to.equal(second);
  } else if (typeof first === 'string' && typeof second === 'string') {
    if (!strict) {
      first = first.toLowerCase() as T;
      second = second.toLowerCase() as T;
    }
    expect(first).to.equal(second);
  } else if (typeof first === 'boolean' && typeof second === 'boolean') {
    expect(first).to.equal(second);
  } else if (typeof first === 'bigint' && typeof second === 'bigint') {
    expect(first).to.equal(second);
  } else {
    throw new Error('Supplied not supported comparison type');
  }
};

export const checkNotEqual = <T extends ComparingType>(
  first: T,
  second: T,
  strict: boolean = false,
) => {
  if (typeof first === 'number' && typeof second === 'number') {
    expect(first).not.to.equal(second);
  } else if (typeof first === 'string' && typeof second === 'string') {
    if (!strict) {
      first = first.toLowerCase() as T;
      second = second.toLowerCase() as T;
    }
    expect(first).not.to.equal(second);
  } else if (typeof first === 'boolean' && typeof second === 'boolean') {
    expect(first).not.to.equal(second);
  } else if (typeof first === 'bigint' && typeof second === 'bigint') {
    expect(first).not.to.equal(second);
  } else {
    throw new Error('Supplied not supported comparison type');
  }
};
