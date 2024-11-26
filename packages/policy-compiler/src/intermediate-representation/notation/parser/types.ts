import { TreeNodeInitParamsStruct } from '../../../../../policy-contracts/src/typechain/contracts/ArtifactsGraph';
import { InstanceConfig } from '../../../../dsl/transpiler/state';

export enum Type {
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
  [DSLType.Number]: Type.Uint256,
  [DSLType.Address]: Type.Address,
  [DSLType.Bool]: Type.Bool,
  [DSLType.String]: Type.String,
  [DSLType.Bytes]: Type.Bytes,
};

export type ValidationMiddlware = {
  innerValidations: (
    artifactAddress: string,
    currentInstanceConfig: InstanceConfig,
  ) => Promise<void>;
  outerValidations: (output: ParsingResult[]) => Promise<void>;
};

export type ParsingResult = TreeNodeInitParamsStruct;
