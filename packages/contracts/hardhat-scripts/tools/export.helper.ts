import { DEPLOYMENTS_PATH, EXPORTED_FULL_PATH } from '../constants';
import { buildExportsLibrary } from '../templates';
import { scanDeployments, writeToFile } from './read-write.helper';

export const exportAllAtAnyNetwork = async () => {
  const deployments = await scanDeployments(DEPLOYMENTS_PATH);
  const dslDeclarationsContent = buildExportsLibrary(deployments);

  writeToFile(EXPORTED_FULL_PATH, `${dslDeclarationsContent}\n`);
};
