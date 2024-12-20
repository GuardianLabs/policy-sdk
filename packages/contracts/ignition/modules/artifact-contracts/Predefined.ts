import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { PREDEFINED_ARTIFACTS_PATH } from '../../constants';
import {
  extractContractName,
  isArtifactDefinition,
  scanDirectory,
  toCamelCase,
} from '../../helpers';

export default buildModule('ArtifactsPredefined', (m) => {
  const artifactContracts = scanDirectory(PREDEFINED_ARTIFACTS_PATH);
  const artifacts = artifactContracts.filter(isArtifactDefinition);

  let artifactDeployments = {};

  for (const artifact of artifacts) {
    const artifactName = extractContractName(artifact);
    if (!artifactName)
      throw new Error(`Cannot extract name of the contract ${artifact}`);

    const normalizedArtifactName = toCamelCase(artifactName);
    artifactDeployments[normalizedArtifactName] = m.contract(artifactName);
  }

  return artifactDeployments;
});
