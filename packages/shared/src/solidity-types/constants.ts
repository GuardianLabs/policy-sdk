export const SOLIDITY_UINT256 = 'uint256';
export const SOLIDITY_BOOL = 'bool';
export const SOLIDITY_ADDRESS = 'address';
export const SOLIDITY_BYTES32 = 'bytes32'; // NOT SUPPORTED YET, but wraps into SOLIDITY_BYTES offchain

export const SOLIDITY_BYTES = 'bytes';
export const SOLIDITY_STRING = 'string';
export const SOLIIDTY_UINT24_LIST = 'uint24[]'; // NOT SUPPORTED YET onchain, but wraps into SOLIDITY_BYTES offchain

// todo: retrieve at compile-time from '../../contracts/sdk/pre-defined/constants/ValueTypeNames.sol'
export const ALLOWED_SOLIDITY_VALUE_TYPES: Array<string> = [
  SOLIDITY_UINT256,
  SOLIDITY_BOOL,
  SOLIDITY_ADDRESS,
  // SOLIDITY_BYTES32,
];

// todo: retrieve at compile-time from '../../contracts/sdk/pre-defined/constants/ReferenceTypeNames.sol'
export const ALLOWED_SOLIDITY_REFERENCE_TYPES: Array<string> = [
  SOLIDITY_BYTES,
  SOLIDITY_STRING,
  SOLIIDTY_UINT24_LIST,
];
