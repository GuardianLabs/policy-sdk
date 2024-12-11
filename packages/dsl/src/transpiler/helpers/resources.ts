import { readFileSync } from 'node:fs';

const DEFAULT_ENCODING = 'utf-8';

export const fetchContent = (url: string): string => {
  let content;

  switch (true) {
    case /^https?:\/\//.test(url):
      throw new Error('Not implemented import resource type');

    case /^git@[^:]+:[^/]+\/.+\.git$/.test(url):
      throw new Error('Not implemented import resource type');

    case /^([a-zA-Z]:)?(\\|\/)([^\\\/]+(\\|\/)?)+$/.test(url):
    case /^(\.\.\/|\.\/)?([^\\\/]+(\\|\/)?)+$/.test(url):
      content = readFromFile(url);
      break;

    default:
      throw new Error(`Not supported import resource type: ${url}`);
  }

  return content;
};

export const readFromFile = (filePath: string): string => {
  try {
    const conent = readFileSync(filePath, DEFAULT_ENCODING);
    return conent;
  } catch (error: any) {
    throw new Error(
      `Error reading file at ${filePath} with description ${error.message}`,
    );
  }
};
