// eslint-disable-next-line import/no-nodejs-modules
import { writeFileSync } from 'node:fs';

export const writeJsonToFile = (filePath: string, data: object): void => {
  const jsonData = JSON.stringify(data, null, 2);

  writeFileSync(filePath, jsonData, { flag: 'w' });
  console.log(`Compilation result successfully written to ${filePath}`);
};
