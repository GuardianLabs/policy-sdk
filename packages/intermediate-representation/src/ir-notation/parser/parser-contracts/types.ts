export type GetTypesValues = (
  artifactAddress: string,
  posAtConfigList?: number,
) => Promise<ExecInitArtifactTypes>;

export interface IArgsTypesSource {
  getTypes: GetTypesValues;
}

export interface IArgsTypesAndNamesSource {
  getTypesAndNames(
    instanceAddress: string,
  ): Promise<ExecInitArtifactTypesAndNames>;
}

export interface IParamsExtractor {
  artifactData: (rawArtifact?: string) => Promise<ArtifactData>;
}

export type ArtifactData = {
  artifactAddress: string;
  argsCount: number;
  execRuntimeVariablesIndices: number[];
  execRuntimeVariablesInjectionsWithIndices: Parameter[];
  execSubstitutionParamsList: SubstitutingParameter[];
  execKnownParamsList: Parameter[];
  initDataParamsSolidityPacked: string;
  needsInitialization: boolean;
};

export type ExecInitArtifactTypes = {
  execParamsTypes: string[];
  initParamsTypes: string[];
};

export type ExecInitArtifactTypesAndNames = ExecInitArtifactTypes & {
  execParamsNames: string[];
  initParamsNames: string[];
};

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
