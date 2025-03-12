import { ignition } from 'hardhat';
import { deployPolicyFactory as deployPolicyFactoryModule } from '../../ignition';

export const deployPolicyFactory = async (defaultSender: string) => {
  const { policyFactory } = await ignition.deploy(deployPolicyFactoryModule, {
    defaultSender,
  });

  return { policyFactory };
};
