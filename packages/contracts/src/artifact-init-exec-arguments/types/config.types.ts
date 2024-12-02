import {
  ExecParamsDescriptorValueType,
  InitParamsDescriptorValueType,
  NormalizedParamType,
  UnnormalizedParamType,
} from './';

export type ArtifactParamsConfig<T, K> = {
  paramsDescriptorValue?: T;
  params?: Array<K>;
};

export type NormalizedParamsInitConfig = ArtifactParamsConfig<
  InitParamsDescriptorValueType,
  NormalizedParamType
>;

export type UnnormalizedParamsInitConfig = ArtifactParamsConfig<
  InitParamsDescriptorValueType,
  UnnormalizedParamType
>;

export type NormalizedParamsExecConfig = ArtifactParamsConfig<
  ExecParamsDescriptorValueType,
  NormalizedParamType
>;

export type UnnormalizedParamsExecConfig = ArtifactParamsConfig<
  ExecParamsDescriptorValueType,
  UnnormalizedParamType
>;
