import { ArtifactBase } from '../../src';
export { LacLangCompiler } from '@guardian-network/policy-compiler/src';
export { ParserWithValidation } from '@guardian-network/policy-intermediate-representation/src';
export * from '../../src';

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
