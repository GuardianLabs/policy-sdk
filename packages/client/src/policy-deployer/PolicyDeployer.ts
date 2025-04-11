import { InitParamsStruct } from '@guardian-network/policy-contracts/src';
import { Signer } from 'ethers';
import { deployPolicyFactoryInstance } from '../helpers';
import { KnownPolicyFactoriesType } from '../types';
import { StaticPolicyDeployer } from './StaticPolicyDeployer';
import { getKnownPolicyFactories } from './known-factories.config';

export class PolicyDeployer {
  // note: use in tests; for production use make instance through constructor (this will assure that factory-address is registered)
  static fromNewFactory = async (
    signerWithProvider: Signer, // todo: validate "signerWithProvider.provider" defined
  ): Promise<PolicyDeployer> => {
    const policyFactory = await deployPolicyFactoryInstance(signerWithProvider);

    const chainId = (await signerWithProvider.provider?.getNetwork())?.chainId;

    const instance = new PolicyDeployer(signerWithProvider);
    instance.addFactoryAddress(
      Number(chainId!),
      await policyFactory.getAddress(),
    );

    return instance;
  };

  protected knownFactories: KnownPolicyFactoriesType;

  constructor(protected signerWithProvider: Signer) {
    this.knownFactories = getKnownPolicyFactories();
  }

  // note: it does this (deploy + init) ATOMICALLY
  deployAndConfigure = async (
    policyAdmin: string,
    policyConfig: InitParamsStruct,
  ) => {
    return StaticPolicyDeployer.deployAndConfigure(
      this.signerWithProvider,
      policyAdmin,
      policyConfig,
      this.knownFactories,
    );
  };

  // note: just a policy deployment with no initialization
  deployPolicy = async (policyAdmin: string) => {
    return StaticPolicyDeployer.deploy(
      this.signerWithProvider,
      policyAdmin,
      this.knownFactories,
    );
  };

  addFactoryAddress = (chainId: number, factoryAddress: string) => {
    this.knownFactories[chainId] = factoryAddress;
  };
}
