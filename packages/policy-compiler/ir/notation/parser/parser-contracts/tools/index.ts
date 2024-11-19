import { ContractRunner } from 'ethers';
import { keccak256Hash } from '../../../../../../policy-contracts/test/utils/solidity-encode-decode';
import { isContractProviderType } from '../guards';
import { GetDescriptors, IGetArgsTypes } from '../types';
import { OnchainArgsTypesHandler } from './OnchainArgsTypesHandler';

export * from './OnchainArgsTypesHandler';
export * from './ParamsExtractor';
export * from './TypesNormalizer';

// note: this takes intermeditate presentation of artifact.
// regex validations should be applied at different abstraction layer
export const nodeId = (ipArtifact: string, salt: number) =>
  keccak256Hash(['string', 'uint256'], [ipArtifact, salt]);

// note: this extracts raw artifacts (list: Array<string>) – as they declared in intermeditate presentation
export const toUnprocessedArtifactsList = (
  intermediatePresentation: string,
): Array<string> => {
  // note: no extra whitespaces + split input (by lines count) into individual artifact strings
  const list = intermediatePresentation
    .trim() // remove surrounding whitespaces in declaration (intermediate-presentation)
    .split(/\r?\n/) // split by each line
    .map((v) => v.trim()); // remove surrounding whitespaces in each artifact

  // note: list has no validations, because validations are applied in respective methods for each list entry
  return list;
};

export const prepareGetDescriptors = (
  providerOrHandler: ContractRunner | IGetArgsTypes,
): GetDescriptors => {
  let getDescriptors: GetDescriptors;

  if (isContractProviderType(providerOrHandler)) {
    getDescriptors = new OnchainArgsTypesHandler(providerOrHandler)
      .getDescriptors;
  } else {
    getDescriptors = providerOrHandler.getDescriptors;
  }

  return getDescriptors;
};
