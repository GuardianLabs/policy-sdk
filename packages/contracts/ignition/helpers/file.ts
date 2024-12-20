import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { DEPLOYMENT_FILE_NAME } from '../constants';

export interface Deployment {
  subdirName: string;
  deploymentData: { [key: string]: string };
}

export const scanDirectory = (dirPath: string): string[] => {
  const filesContents: string[] = [];

  const readDirRecursive = (currentPath: string) => {
    const entries = readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = join(currentPath, entry.name);

      if (entry.isDirectory()) {
        readDirRecursive(entryPath);
      } else if (entry.isFile()) {
        const content = readFileSync(entryPath, 'utf-8');
        filesContents.push(content);
      }
    }
  };

  readDirRecursive(dirPath);
  return filesContents;
};

export const scanDeployments = async (
  basePath: string,
): Promise<Deployment[]> => {
  const result: Deployment[] = [];
  basePath = resolve(basePath);

  try {
    const subdirectories = readdirSync(basePath, { withFileTypes: true });

    for (const dir of subdirectories) {
      if (dir.isDirectory()) {
        const subdirectoryPath = join(basePath, dir.name);
        const filePath = join(subdirectoryPath, DEPLOYMENT_FILE_NAME);

        try {
          const { default: fileContent } = await import(filePath, {
            assert: { type: 'json' },
          });
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
    console.error(`Failed to read directory ${basePath}:`, readError);
  }

  return result;
};

export const writeToFile = (filename: string, content: string): void => {
  try {
    writeFileSync(filename, content, { flag: 'w' });
  } catch (err) {
    console.error('Error writing to file:', err);
  }
};
