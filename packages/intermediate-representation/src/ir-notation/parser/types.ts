import { InstanceConfig } from '@guardian-network/policy-dsl/src';
import { TreeNodeInitParamsStruct } from '../types';

export enum SupportedSolidityType {
  Uint256 = 'uint256',
  String = 'string',
  Bool = 'bool',
  Bytes = 'bytes',
  Address = 'address',
}

export enum DSLType {
  Number = 'number',
  String = 'string',
  Bool = 'bool',
  Bytes = 'bytes',
  Address = 'address',
}

export const DSLTypesMapping = {
  [DSLType.Number]: SupportedSolidityType.Uint256,
  [DSLType.Address]: SupportedSolidityType.Address,
  [DSLType.Bool]: SupportedSolidityType.Bool,
  [DSLType.String]: SupportedSolidityType.String,
  [DSLType.Bytes]: SupportedSolidityType.Bytes,
};

export type ValidationMiddlware = {
  innerValidations: (
    artifactAddress: string,
    currentInstanceConfig: InstanceConfig,
  ) => Promise<void>;
  outerValidations: (output: ParsingResult[]) => Promise<void>;
};

export type ParsingResult = TreeNodeInitParamsStruct;
