import path from 'node:path';
import { Stub } from '../sources';

export const toLac = (path: string) => `${path}.lac`;
const toJson = (path: string) => `${path}.json`;

export const toLacSourcePath = (file: Stub, sourcesPath: string) =>
  `${path.join(sourcesPath, toLac(file))}`;
export const toSnapshotPath = (file: Stub, snapshotsPath: string) =>
  `${path.join(snapshotsPath, toJson(file))}`;

export const importJson = async (path: string) => {
  const { default: imported } = await import(path, {
    assert: {
      type: 'json',
    },
  });

  return imported;
};
