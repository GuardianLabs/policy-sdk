import { KnownPolicyFactoriesType } from '../types';

// todo: add polygon-mainnet, base-sepolia as hardcoded addresses
const knownPolicyFactories: KnownPolicyFactoriesType = {
  [SupportedNetworkIdEnum.amoy]: '0x60854C6cCF5a30c55CaD9ac1323D5499EC1fAFa1',
  [SupportedNetworkIdEnum.baseMainnet]:
    '0x7eD5C34B32F5BC9DDB77c5826B1Ce7d96318EdDe',
  [SupportedNetworkIdEnum.redbellyMainnet]:
    '0x2AeFca4dab98c8DA4337C615DCA1D94cc6477e5c',
  [SupportedNetworkIdEnum.redbellyTestnet]:
    '0xE1f341924Cd168DfE9Eac2B5b3ca9bc7AD57D325',
};

export const getKnownPolicyFactories = (): KnownPolicyFactoriesType => {
  return structuredClone(knownPolicyFactories);
};
