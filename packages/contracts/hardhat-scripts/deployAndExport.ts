import hre from 'hardhat';
import PredefinedArtifactsModule from '../ignition/modules/predefined/deploy-artifacts';
import { exportAllAtAnyNetwork } from './tools';

const deployIgnitionModule = async () => {
  const [{ address: defaultSender }] = await hre.ethers.getSigners();

  const deployments = await hre.ignition.deploy(PredefinedArtifactsModule, {
    defaultSender,
  });

  const deploymentsStringified: string[] = [];

  for (const name of Object.keys(deployments)) {
    const instance = deployments[name];
    const stringified = `\n${name}: ${await instance.getAddress()}`;
    deploymentsStringified.push(stringified);
  }

  console.log(
    `The deploy of module "${PredefinedArtifactsModule.id}" is ready. The following contracts are deployed:\n${deploymentsStringified}`,
  );
};

const main = async () => {
  await deployIgnitionModule();
  await exportAllAtAnyNetwork();
};

main().catch(console.error);
