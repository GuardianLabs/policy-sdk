import { AbiCoder } from 'ethers';
export { solidityDecode, solidityDecodeSingleParam } from './decode.helper';
export {
  inferSolidityType,
  solidityEncode,
  solidityEncodeMultipleParams,
  solidityEncodeSingleParam,
} from './encode.helper';

export const defaultAbiCoder = AbiCoder.defaultAbiCoder();
