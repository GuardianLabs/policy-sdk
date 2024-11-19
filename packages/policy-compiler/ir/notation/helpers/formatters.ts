import { toTypedWithKnownType } from '.';
import { DSLType, DSLTypesMapping, Type } from '../parser/types';

import { AbiCoder } from 'ethers';

const defaultAbiCoder = AbiCoder.defaultAbiCoder();

export const bytesEncodeArgs = (args: string[], types: Type[]) => {
  const typedArgs = args.map((arg, index) =>
    toTypedWithKnownType(arg, types[index]),
  );

  return defaultAbiCoder.encode(types, typedArgs);
};

export const indexConstants = (
  parameters: { value: string; index: number }[],
  argsTypes: Type[],
) =>
  parameters.map((arg, index) => ({
    value: defaultAbiCoder.encode(
      [argsTypes[index]],
      [toTypedWithKnownType(arg.value, argsTypes[index])],
    ),
    index: arg.index,
  }));

export function extractComponents(input: string) {
  const regex = /\{([^}]+)\}\s*\(([^)]*)\)\s*<([^>]*)>/;
  const match = input.match(regex);

  if (match && match.length === 4) {
    const [, addressClause, paramsClause, initClause] = match;
    return { addressClause, paramsClause, initClause };
  }

  throw new Error('Input string does not match the expected format.');
}

export function extractArguments(input: string): string[] {
  if (input.trim() === '') {
    return [];
  }

  return input.split(',').map((value) => value.trim());
}

export const DSLTypesToIRTypes = (el: string) => {
  // un safw
  const typed = DSLTypesMapping[el as DSLType];
  return typed;
};
