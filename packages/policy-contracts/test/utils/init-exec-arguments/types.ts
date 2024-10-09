import { ArtifactBase } from '../../types';
import { EncodedParamType } from '../solidity-encode-decode';

export type MockecExecArgumentsConfig = {
  argsCount?: number;
  // when supplied, the list is created with length 'argsCount' and filled with 'defaultValue'
  defaultValue?: EncodedParamType;
  // when supplied, and 'defaultValue' is undefined, the list is created with length 'argsCount' and filled with random values
  // type?: PrimitiveEncodeParamTypes;
};

export type InitParamsDescriptorValueTypeBase = {
  argsNames: string[];
  argsTypes: string[];
};
export type InitParamsDescriptorType = Pick<ArtifactBase, 'getInitDescriptor'>;
export type ExecParamsDescriptorType = Pick<ArtifactBase, 'getExecDescriptor'>;
export type ExecParamsDescriptorValueType = Awaited<
  ReturnType<ArtifactBase['getExecDescriptor']>
>;
export type ExecParamsDescriptorValueTypeBase = {
  argsNames: string[];
  argsTypes: string[];
  returnType: string;
};
type ParamsDescriptorType = InitParamsDescriptorType & ExecParamsDescriptorType;
