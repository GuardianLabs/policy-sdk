import { Command } from 'commander';
import { JsonRpcProvider } from 'ethers';
import { writeFileSync } from 'node:fs';
import {
  LacLangCompiler,
  LacLangCompilerOptions,
} from '../../../policy-compiler/src';
import { NoRpcUrlError } from '../errors';

export const compileHandler = async (program: Command) => {
  const sourcePath = program.args[0];
  const options = program.opts();

  let config: LacLangCompilerOptions = {};

  if (!!options.typeOnchain || !!options.typeDsl) {
    const rpc: string = options.rpc ?? process.env.RPC;
    if (!rpc) throw new NoRpcUrlError();

    const provider = new JsonRpcProvider(rpc);

    config = {
      checkTypesAgainstDslDeclarations: options.typeDsl,
      checkTypesAgainstOnchainDescriptors: options.typeOnchain,
      provider,
    };
  }

  const compiler = await LacLangCompiler.fromFile(sourcePath, config);
  const compilationOutput = await compiler.compile();

  if (!!options.write) {
    writeJsonToFile(options.write, compilationOutput);
    return;
  }

  console.log(JSON.stringify(compilationOutput, null, 2));
};

const writeJsonToFile = (filePath: string, data: object): void => {
  const jsonData = JSON.stringify(data, null, 2);

  writeFileSync(filePath, jsonData, { flag: 'w' });
  console.log(`Compilation result successfully written to ${filePath}`);
};
