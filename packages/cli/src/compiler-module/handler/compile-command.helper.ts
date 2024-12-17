import { LacLangCompiler } from '@guardian-network/policy-compiler/src';
import {
  ICompiler,
  LacLangCompilerOptions,
} from '@guardian-network/shared/src/types/compiler.types';
import { Command } from 'commander';
import { JsonRpcProvider } from 'ethers';
import { COMPILE } from '../../constants';
import { NoRpcUrlError } from '../../errors';
import {
  rpcEndpointOption,
  sourcePathOptions,
  typeDslOption,
  typeOnchainOption,
  writeCompilationResultOption,
} from '../options';
import { CliCompileOptions } from '../options/types';
import { writeJsonToFile } from './utils.helper';

const retrieveCompilerOptions = (options: CliCompileOptions) => {
  let config: LacLangCompilerOptions = {};
  const { typeDsl, typeOnchain, rpc } = options;

  if (!!typeOnchain || !!typeDsl) {
    const rpcEndpoint = rpc || process.env.RPC;
    if (!rpcEndpoint) throw new NoRpcUrlError();

    config = {
      checkTypesAgainstOnchainDescriptors: !!typeOnchain,
      checkTypesAgainstDslDeclarations: !!typeDsl,
      provider: new JsonRpcProvider(rpcEndpoint),
    };
  }

  return config;
};

const compile = async (options: CliCompileOptions) => {
  const compilerOptions = retrieveCompilerOptions(options);
  const compiler: ICompiler = await LacLangCompiler.fromFile(
    options.sourcePath,
    compilerOptions,
  );
  const compilationOutput = await compiler.compile();

  if (!!options.write) {
    writeJsonToFile(options.write, compilationOutput);
    return;
  }

  console.log(
    `Compilation result: \r\n ${JSON.stringify(compilationOutput, null, 2)}`,
  );
};

export const compileCommand = (program: Command) => {
  program
    .command(COMPILE)
    .requiredOption(...sourcePathOptions)
    .option(...typeOnchainOption)
    .option(...typeDslOption)
    .option(...rpcEndpointOption)
    .option(...writeCompilationResultOption)
    .action(compile);

  return program;
};
