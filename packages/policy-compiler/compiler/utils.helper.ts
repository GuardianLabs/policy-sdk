import { readFile } from 'node:fs/promises';

const DEFAULT_ENCODING = 'utf-8';

export const readFromFile = async (filePath: string): Promise<string> => {
  try {
    const conent = await readFile(filePath, DEFAULT_ENCODING);
    return conent;
  } catch (error: any) {
    throw new Error(
      `Error reading file at ${filePath} with description ${error.message}`,
    );
  }
};
