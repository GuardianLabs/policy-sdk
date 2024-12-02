import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('ArtifactsDeployment', (m) => {
  return {
    andArtifact: m.contract('AND'),
    xorArtifact: m.contract('XOR'),
    equalStringArtifact: m.contract('EqualString'),
  };
});
