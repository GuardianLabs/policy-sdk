import path from 'node:path';
import { cwd } from 'node:process';

export const SOURCES_PATH = path.join(cwd(), './test/sources');
export const SNAPSHOTS_PATH = path.join(cwd(), './test/snapshots');
