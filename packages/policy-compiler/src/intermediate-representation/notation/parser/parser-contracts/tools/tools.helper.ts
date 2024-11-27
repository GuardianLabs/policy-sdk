import { keccak256Hash } from '@guardian-network/policy-contracts/src/solidity-encode-decode';
import { ContractRunner } from 'ethers';
import { isContractProviderType } from '../guards';
import { GetTypesValues, IArgsTypesSource } from '../types';
import { OnchainDescriptorArgsTypesSource } from './types-source/OnchainDescriptorArgsTypesSource';

// note: this takes intermeditate presentation of artifact.
// regex validations should be applied at different abstraction layer
export const nodeId = (intermediatePresentation: string, salt: number) =>
  keccak256Hash(['string', 'uint256'], [intermediatePresentation, salt]);

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

export const createOrInferTypesSource = (
  providerOrSource: ContractRunner | IArgsTypesSource,
): GetTypesValues => {
  let getTypesSource: GetTypesValues;

  if (isContractProviderType(providerOrSource)) {
    getTypesSource = new OnchainDescriptorArgsTypesSource(providerOrSource)
      .getTypes;
  } else {
    getTypesSource = providerOrSource.getTypes;
  }

  return getTypesSource;
};
