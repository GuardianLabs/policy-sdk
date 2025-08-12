import {
  DSLType,
  InstanceConfig,
  NodeTreeInitData,
  SupportedSolidityType,
} from '@guardian-network/shared';

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
