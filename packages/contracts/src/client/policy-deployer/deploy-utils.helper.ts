import { Signer } from 'ethers';
import { PolicyFactory } from '../..';
import { connectPolicyFactoryInstance } from '../helpers';
import { KnownPolicyFactoriesType } from '../types';

export const getFactoryInstance = async (
  signer: Signer,
  knownFactories: KnownPolicyFactoriesType,
): Promise<PolicyFactory> => {
  const networkInfog = await signer.provider?.getNetwork();
  if (!networkInfog) throw new Error(`Signer has no viable provider`);

  const chainId = Number(networkInfog.chainId);

  const factoryAddress = retrieveFactoryAddress(chainId, knownFactories);

  return connectPolicyFactoryInstance(factoryAddress, signer);
  // return PolicyFactory__factory.connect(factoryAddress, signer)
};

const retrieveFactoryAddress = (
  chainId: number,
  knownFactories: KnownPolicyFactoriesType,
): string => {
  const factoryAddress = knownFactories[chainId];

  if (!!factoryAddress) return factoryAddress;

  throw new Error(
    `No deployer onchain instance exists for the required chain-id: ${chainId}`,
  );
};
