enum SupportedSolidityTypesEnum {
  Uint256 = 'uint256',
  String = 'string',
  Bool = 'bool',
  Bytes = 'bytes',
  Address = 'address',
}

enum DSLTypesEnum {
  Number = 'number',
  String = 'string',
  Bool = 'bool',
  Bytes = 'bytes',
  Address = 'address',
}

export type SupportedSolidityType = `${SupportedSolidityTypesEnum}`;
export type DSLType = `${DSLTypesEnum}`;
