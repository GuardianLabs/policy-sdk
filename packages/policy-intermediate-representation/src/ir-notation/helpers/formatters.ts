import { toTypedWithKnownType } from '.';
import {
  DSLType,
  DSLTypesMapping,
  SupportedSolidityType,
} from '../parser/types';

import { AbiCoder } from 'ethers/abi';

const defaultAbiCoder = AbiCoder.defaultAbiCoder();

export const bytesEncodeArgs = (
  args: string[],
  types: SupportedSolidityType[],
) => {
  const typedArgs = args.map((arg, index) =>
    toTypedWithKnownType(arg, types[index]),
  );

  return defaultAbiCoder.encode(types, typedArgs);
};

export const indexConstants = (
  parameters: { value: string; index: number }[],
  argsTypes: SupportedSolidityType[],
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

export function extractInjection(inputString: string): string {
  const matcher = /\$"([^"]*)"$/;
  const matched = inputString.match(matcher);

  return matched ? matched[1] : '';
}

export const DSLTypesToIRTypes = (el: string) => {
  // un safw
  const typed = DSLTypesMapping[el as DSLType];
  return typed;
};
