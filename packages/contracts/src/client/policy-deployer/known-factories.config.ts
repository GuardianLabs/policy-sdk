import { KnownPolicyFactoriesType } from '../types';

// todo: add polygon, base as hardcoded addresses
const knownPolicyFactories: KnownPolicyFactoriesType = {};

export const getKnownPolicyFactories = (): KnownPolicyFactoriesType => {
  return structuredClone(knownPolicyFactories);
};
