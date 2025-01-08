import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const toCamelCase = (input: string): string => {
  return /^[A-Z]+$/.test(input)
    ? input.toLowerCase()
    : input
        .trim()
        .replace(/(?:^|[-_\s]+)(\w)/g, (_, char) => char.toUpperCase())
        .replace(/^./, (firstChar) => firstChar.toLowerCase());
};

export const extractContractName = (input: string): string | null => {
  const artifactContractNameMatcher =
    /contract\s+(\w+)\s+is\b.*?ArtifactBase\b/;
  const match = input.match(artifactContractNameMatcher);
  return match ? match[1] : null;
};

export const isArtifactDefinition = (content: string) => {
  const baseContractMatcher = /\bis\s+\w+ArtifactBase\b/;

  return baseContractMatcher.test(content);
};

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
