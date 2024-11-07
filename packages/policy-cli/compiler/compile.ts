#!/usr/bin/env node

import { Command } from 'commander';
import { version } from '../package.json';
import { compileHandler } from './handler/compile.handler';

const program = new Command();

const args = process.argv;
const redirectionIndex = args.findIndex((arg) => arg === '>>');
if (redirectionIndex !== -1 && args[redirectionIndex + 1]) {
  process.argv.splice(
    redirectionIndex,
    2,
    '--write',
    args[redirectionIndex + 1],
  );
}

program
  .name('@guardian-network/policy-dsl-compiler')
  .description('Compiler for a LacLang Policy composition language')
  .argument('sourcePath', 'Path to LacLang (*.lac) sources')
  .option(
    '--type-onchain',
    '[OPTIONAL] Triggers types checking via onchain artifacts description, equivalent to checkTypesAgainstOnchain = true',
  )
  .option(
    '--type-dsl',
    '[OPTIONAL] Triggers types checking via dsl definitions, equivalent to checkTypesAgainstDeclaration = true',
  )
  .option(
    '--rpc',
    '[OPTIONAL, if --type-*] JSON RPC URL for type checking communication. Otherwise $RPC env variable will be serched',
  )
  .option(
    '-w, --write <outputPath>',
    '[OPTIONAL] Writes compilation output as JSON to dedicated file',
  )
  .version(version);

program.parse();

compileHandler(program);
