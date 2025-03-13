import { ethers, ignition } from 'hardhat';
import { deployArtifactsModule } from '../../ignition';

export const deployIgnitionModule = async () => {
  const [{ address: defaultSender }] = await ethers.getSigners();

  const deployments = await ignition.deploy(deployArtifactsModule, {
    defaultSender,
  });

  const deploymentsStringified: string[] = [];

  for (const name of Object.keys(deployments)) {
    const instance = deployments[name];
    const stringified = `\n${name}: ${await instance.getAddress()}`;
    deploymentsStringified.push(stringified);
  }

  console.log(
    `The deploy of module "${deployArtifactsModule.id}" is ready. The following contracts are deployed:\n${deploymentsStringified}`,
  );
};
