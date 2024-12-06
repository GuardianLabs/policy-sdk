import { NodeTreeInitData } from '@guardian-network/shared/src/types/contracts.types';
import { InstanceConfig } from '@guardian-network/shared/src/types/dsl.types';
import {
  DSLType,
  SupportedSolidityType,
} from '@guardian-network/shared/src/types/intermediate-representation.types';

export type ParsingResult = NodeTreeInitData;

export type DslTypeToSolidityType = Record<DSLType, SupportedSolidityType>;

export const DSLTypesMapping: DslTypeToSolidityType = {
  // SAFE KEYS
  // UNSAFE VALUES
  number: 'uint256',
  address: 'address',
  bool: 'bool',
  string: 'string',
  bytes: 'bytes',
};

export type ValidationMiddlware = {
  innerValidations: (
    artifactAddress: string,
    currentInstanceConfig: InstanceConfig,
  ) => Promise<void>;
  outerValidations: (output: NodeTreeInitData[]) => Promise<void>;
};
