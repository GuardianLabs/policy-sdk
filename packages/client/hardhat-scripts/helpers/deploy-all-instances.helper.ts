import { Contract } from 'ethers';
import { ethers } from 'hardhat';
import { deployPolicyFactory as deployPolicyFactoryModule } from '../../ignition';
import { PolicyFactory } from '../../src/typechain';
import { deployPolicyFactory } from './deployments.helper';

const modules = [deployPolicyFactoryModule];

export const deployInstances = async (isLogging: boolean = true) => {
  const instances: Map<string, Contract> = new Map();

  const [{ address: defaultSender }] = await ethers.getSigners();

  const { policyFactory } = await deployPolicyFactory(defaultSender);
  instances.set('policyFactory', policyFactory);

  // results
  if (isLogging) {
    const deploymentsStringified: string[] = [];

    for (const [key, instance] of instances) {
      const stringified = `\n${key}: ${await instance.getAddress()}`;
      deploymentsStringified.push(stringified);
    }

    console.log(
      `The deploy of modules"${modules.map(({ id }) => ' ' + id)}" is ready.
      The following contracts are deployed:\n${deploymentsStringified}`,
    );
  }

  return {
    policyFactory: policyFactory as any as PolicyFactory,
  };
};
