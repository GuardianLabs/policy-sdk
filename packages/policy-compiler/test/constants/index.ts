import path from "path";
import { cwd } from "process";

export const SOURCES_PATH = path.join(cwd(), './test/sources');
export const SNAPSHOTS_PATH = path.join(cwd(), './test/snapshots');