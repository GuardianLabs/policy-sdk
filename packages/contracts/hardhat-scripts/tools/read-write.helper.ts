import { readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { DEPLOYMENT_FILE_NAME } from '../constants';
import { Deployment } from '../types';

export const writeToFile = (filename: string, content: string): void => {
  try {
    writeFileSync(filename, content, { flag: 'w' });
  } catch (err) {
    console.error(`Error writing to file ${filename}:`, err);
  }
};

export const scanDeployments = async (
  basePath: string,
): Promise<Deployment[]> => {
  const completePath = resolve(basePath);
  const result: Deployment[] = [];

  try {
    const subDirectories = readdirSync(completePath, { withFileTypes: true });

    for (const dir of subDirectories) {
      if (dir.isDirectory()) {
        const subdirectoryPath = join(completePath, dir.name);
        const filePath = join(subdirectoryPath, DEPLOYMENT_FILE_NAME);

        try {
          const { default: fileContent } = await import(filePath, {
            assert: { type: 'json' },
          });

          // todo: validate whether "fileContent" of deployed_addresses.json is valid with propper content
          // otherwise it will result in 'BaseLibrary.lac' having incorrect content
          result.push({
            subdirName: dir.name,
            deploymentData: fileContent,
          });
        } catch (importError) {
          console.error(`Failed to import from ${filePath}:`, importError);
        }
      }
    }
  } catch (readError) {
    console.error(`Failed to read directory ${completePath}:`, readError);
  }

  return result;
};
