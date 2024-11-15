import { ParsingResult } from '../types';

export interface IOnchainHandler {
  getDescriptors(instanceAddress: string): Promise<Descriptors>;
}

export interface IParamsExtractor {
  artifactData: (rawArtifact?: string) => Promise<ArtifactData>;
}

export type ArtifactData = {
  artifactAddress: string;
  argsCount: number;
  execRuntimeVariablesIndices: number[];
  execSubstitutionParamsList: SubstitutingParameter[];
  execKnownParamsList: Parameter[];
  initDataParamsSolidityPacked: string;
  needsInitialization: boolean;
};

export type Descriptors = {
  execParamsTypes: string[];
  initParamsTypes: string[];
};

export type GetDescriptors = (address: string) => Promise<Descriptors>;

export type KnownTSType = string | bigint | boolean | Uint8Array;

export type SolidityType = `${SupportedSolidityTypesEnum}`;

export enum SupportedSolidityTypesEnum {
  Uint256 = 'uint256',
  String = 'string',
  Bool = 'bool',
  Bytes = 'bytes',
  Address = 'address',
}

type AddressComponent = {
  addressClause: string;
};

type UnprocessedInitDataAndExecParams = {
  initClause: string;
  paramsClause: string;
};

export type RawArtifactComponents = AddressComponent &
  UnprocessedInitDataAndExecParams;

export type NormalizedExecParameter = {
  value: string;
  index: number;
};

export type SubstitutingParameter = {
  from: string; // external node-id to expect data from in run-time
  atPos: number; // index in general params list of this node-id
};

export type Parameter = {
  value: string;
  index: number;
};

// todo: replace with typechain type
// export type BytesAndIndexStruct = { value: BytesLike; index: BigNumberish };
// export type Bytes32AndIndexStruct = { value: BytesLike; index: BigNumberish };
// export type TreeNodeInitParamsStruct = {
//   id: BytesLike;
//   artifactAddress: AddressLike;
//   argsCount: BigNumberish;
//   partialExecData: BytesAndIndexStruct[];
//   variables: BigNumberish[];
//   substitutions: Bytes32AndIndexStruct[];
//   initData: BytesLike;
//   needsInitialization: boolean;
// }

type TreeNodeInitParamsStruct = ParsingResult;
