import { promises as fs } from 'fs';
import path from 'path';
import { cwd } from 'process';
import { Transpiler } from '../transpiler/index.js';

async function main() {
  const sources: string = await readTextFromFile(
    path.join(cwd(), process.argv[2]),
  );
  console.log(sources + '\r\n');

  const transpiler = new Transpiler(sources);
  transpiler.transpile();

  const { ir, typings } = transpiler.getFullIR();
  console.log(ir + '\r\n');

  // console.log(JSON.stringify(typings));
}

async function readTextFromFile(filePath: string): Promise<string> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return fileContent;
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error);
    throw error;
  }
}

main();
