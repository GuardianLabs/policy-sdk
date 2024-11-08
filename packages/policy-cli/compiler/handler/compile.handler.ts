import { Command } from 'commander';
import {
  LacLangCompiler,
  LacLangCompilerOptions,
} from '../../../policy-compiler/src';
import { JsonRpcProvider } from 'ethers';
import fs from 'fs';
import { NoRpcUrlError } from '../errors';

export const compileHandler = async (program: Command) => {
  const sourcePath = program.args[0];
  const options = program.opts();

  let config: LacLangCompilerOptions = {};

  if (options.typeOnchain || options.typeDsl) {
    const rpc: string = options.rpc ?? process.env.RPC;
    if (!rpc) throw new NoRpcUrlError();

    const provider = new JsonRpcProvider(rpc);

    config = {
      provider,
      checkTypesAgainstDeclaration: options.typeDsl,
      checkTypesAgainstOnchain: options.typeOnchain,
    };
  }

  const compiler = new LacLangCompiler(config);
  const compilationOutput = await compiler.compileFile(sourcePath);

  if (options.write) {
    writeJsonToFile(options.write, compilationOutput);
    return;
  }

  console.log(JSON.stringify(compilationOutput, null, 2));
};

function writeJsonToFile(filePath: string, data: object): void {
  const jsonData = JSON.stringify(data, null, 2);

  fs.writeFileSync(filePath, jsonData, { flag: 'w' });
  console.log(`Compilation result successfully written to ${filePath}`);
}
