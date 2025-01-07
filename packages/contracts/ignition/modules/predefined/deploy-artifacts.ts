import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import {
  extractContractName,
  isArtifactDefinition,
  scanDirectory,
  toCamelCase,
} from '../../tools';
import { IgnitionModuleResultType, IgnitionModuleType } from '../../types';

const ARTIFACTS_PATH = 'contracts/pre-defined/';
const MODULE_ID = 'ArtifactsPredefined';

const artifactsModule: IgnitionModuleType = buildModule(MODULE_ID, (m) => {
  const deployments: IgnitionModuleResultType = {};

  const scannedAtPath = scanDirectory(ARTIFACTS_PATH);
  const contractImplementationsList =
    scannedAtPath.filter(isArtifactDefinition);

  for (const implementation of contractImplementationsList) {
    const name = extractContractName(implementation);

    if (!name) {
      throw new Error(
        `Cannot extract name from the contract implementation: ${implementation}`,
      );
    }
    // note: do not trigger at this point deployment if contact is mocked artifact
    if (name.includes('Mock')) {
      continue;
    }

    const instance = m.contract(name);

    const normalizedName = toCamelCase(name);
    deployments[normalizedName] = instance;
  }

  return deployments;
});

export default artifactsModule;
