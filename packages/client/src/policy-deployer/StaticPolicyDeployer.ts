import {
  InitParamsStruct,
  PolicyHandler,
} from '@guardian-network/policy-contracts/src';
import { ContractTransactionResponse, Signer } from 'ethers';
import { decodePolicyAddressFromTx } from '../helpers';
import { PolicyHandler__factory } from '../typechain';
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
    policyConfig: InitParamsStruct,
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

    return PolicyHandler__factory.connect(policyAddress, signer);
  };
}
