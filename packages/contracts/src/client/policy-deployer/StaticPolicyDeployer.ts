import { ContractTransactionResponse, Signer } from 'ethers';
import { GraphInitParamsStruct, PolicyHandler } from '../..';
import { connectPolicyInstance, decodePolicyAddressFromTx } from '../helpers';
import { KnownPolicyFactoriesType } from '../types';
import { getFactoryInstance } from './deploy-utils.helper';
import { getKnownPolicyFactories } from './known-factories.config';

export class StaticPolicyDeployer {
  static deploy = async (
    signer: Signer,
    policyAdmin: string,
    knownFactories: KnownPolicyFactoriesType = getKnownPolicyFactories(),
  ): Promise<PolicyHandler> => {
    const policyFactory = await getFactoryInstance(signer, knownFactories);

    const deployPolicyMethod = async () => {
      return policyFactory.deploy(policyAdmin);
    };

    return this.makePolicy(signer, deployPolicyMethod);
  };

  static deployAndConfigure = async (
    signer: Signer,
    policyAdmin: string,
    policyConfig: GraphInitParamsStruct,
    knownFactories: KnownPolicyFactoriesType = getKnownPolicyFactories(),
  ): Promise<PolicyHandler> => {
    const policyFactory = await getFactoryInstance(signer, knownFactories);

    const deployPolicyMethod = async () => {
      return policyFactory.deployAndConfigure(policyAdmin, policyConfig);
    };

    return this.makePolicy(signer, deployPolicyMethod);
  };

  private static makePolicy = async (
    signer: Signer,
    deployPolicyMethod: () => Promise<ContractTransactionResponse>,
  ): Promise<PolicyHandler> => {
    const txResponse = await deployPolicyMethod();
    const policyAddress = await decodePolicyAddressFromTx(txResponse);

    // PolicyHandler__factory?
    return connectPolicyInstance(policyAddress, signer);
  };
}
