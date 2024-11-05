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

export const TypesMapping = {
  [Type.Uint256]: 'Uint256',
  [Type.Address]: 'Address',
  [Type.Bool]: 'Bool',
  [Type.String]: 'String',
  [Type.Bytes]: 'Bytes',
};

export const DSLTypesMapping = {
  [DSLType.Number]: Type.Uint256,
  [DSLType.Address]: Type.Address,
  [DSLType.Bool]: Type.Bool,
  [DSLType.String]: Type.String,
  [DSLType.Bytes]: Type.Bytes,
};

export type ParsingResult = {
  id: string;
  artifactAddress: string;
  partialExecData: { value: string; index: number }[];
  variables: number[];
  argsCount: number;
  substitutions: { value: string; index: number }[];
  initData: string;
  needsInitialization: boolean;
};
