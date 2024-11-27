import { ArtifactBase } from '../../src';
export {
  LacLangCompiler,
  ParserWithValidation,
} from '@guardian-network/policy-compiler/src';
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
