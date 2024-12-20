import { ARTIFACTS_LIBRARY_FILE_PATH, DEPLOYMENTS_PATH } from '../constants';
import { scanDeployments, writeToFile } from '../helpers';
import { buildArtifactsLibrary } from '../templates';

(async () => {
  const deployments = await scanDeployments(DEPLOYMENTS_PATH);
  const artifactDeclarations = buildArtifactsLibrary(deployments);

  writeToFile(ARTIFACTS_LIBRARY_FILE_PATH, artifactDeclarations);
})();
