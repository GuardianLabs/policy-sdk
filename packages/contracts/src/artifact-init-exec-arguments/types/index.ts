import { EncodedParamType as NormalizedParamType } from '@guardian-network/shared/src/types/solidity-encode.types';
import { ArtifactBase } from '../../typechain';
export { EncodedParamType as NormalizedParamType } from '@guardian-network/shared/src/types/solidity-encode.types';
export * from './config.types';

export type Unnormalized = Array<number> | string | boolean | number;

export type UnnormalizedParamType = {
  param: Unnormalized;
};

export type UnnormalizedOrNormalizedParamType =
  | NormalizedParamType
  | UnnormalizedParamType;

// manual definition
export type InitParamsDescriptorValueTypeManual = {
  argsNames: string[];
  argsTypes: string[];
};
export type ExecParamsDescriptorValueTypeManual = {
  argsNames: string[];
  argsTypes: string[];
  returnType: string;
};

export type ExecParamsDescriptorValueType = Awaited<
  ReturnType<ArtifactBase['getExecDescriptor']>
>;
export type InitParamsDescriptorValueType = Awaited<
  ReturnType<ArtifactBase['getInitDescriptor']>
>;

export type ParamsDescriptorValueType =
  | ExecParamsDescriptorValueType
  | InitParamsDescriptorValueType;

export type InitParamsDescriptorType = Pick<ArtifactBase, 'getInitDescriptor'>;
export type ExecParamsDescriptorType = Pick<ArtifactBase, 'getExecDescriptor'>;
export type DescriptorType =
  | InitParamsDescriptorType
  | ExecParamsDescriptorType;
