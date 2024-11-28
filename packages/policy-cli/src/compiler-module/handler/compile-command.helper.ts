import {
  LacLangCompiler,
  LacLangCompilerOptions,
} from '@guardian-network/policy-compiler/src';
import { Command, OptionValues } from 'commander';
import { JsonRpcProvider } from 'ethers';
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

const retrieveCompilerOptions = (options: OptionValues) => {
  let config: LacLangCompilerOptions = {};

  if (!!options.typeOnchain || !!options.typeDsl) {
    const rpcEndpoint: string = options.rpc ?? process.env.RPC;
    if (!rpcEndpoint) throw new NoRpcUrlError();

    config = {
      checkTypesAgainstDslDeclarations: options.typeDsl,
      checkTypesAgainstOnchainDescriptors: options.typeOnchain,
      provider: new JsonRpcProvider(rpcEndpoint),
    };
  }

  return config;
};

const compile = async (options: CliCompileOptions) => {
  console.log(options);
  const compilerOptions = retrieveCompilerOptions(options);
  const compiler = await LacLangCompiler.fromFile(
    options.sourcePath,
    compilerOptions,
  );
  const compilationOutput = await compiler.compile();

  if (!!options.write) {
    writeJsonToFile(options.write, compilationOutput);
    return;
  }

  console.log(`Compile result ${JSON.stringify(compilationOutput, null, 2)}`);
};

export const compileCommand = (program: Command) => {
  program
    .command('compile')
    .requiredOption(...sourcePathOptions)
    .option(...typeOnchainOption)
    .option(...typeDslOption)
    .option(...rpcEndpointOption)
    .option(...writeCompilationResultOption)
    .action(compile);

  return program;
};
