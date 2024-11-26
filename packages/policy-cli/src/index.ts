#!/usr/bin/env node

import { Command } from 'commander';
import { config } from 'dotenv';
import { version } from '../package.json';
import { compileCommand } from './compiler-module';

config();

const program = new Command();

program
  .name('@guardian-network/policy-dsl-compiler')
  .description('Compiler for a LacLang Policy composition language')
  .version(version)
  .argument('sourcePath', 'Path to LacLang (*.lac) sources')
  // todo: move under compiler-module path
  .option(
    '--type-onchain',
    '[OPTIONAL] Triggers types checking via onchain artifacts description, equivalent to checkTypesAgainstOnchain = true',
  )
  .option(
    '--type-dsl',
    '[OPTIONAL] Triggers types checking via dsl definitions, equivalent to checkTypesAgainstDeclaration = true',
  )
  .option(
    '--rpc <URL>',
    '[OPTIONAL, if --type-*] JSON RPC URL for type checking communication. Otherwise $RPC env variable will be serched',
  )
  .option(
    '-w, --write <outputPath>',
    '[OPTIONAL] Writes compilation output as JSON to dedicated file',
  );

compileCommand(program);
program.parse();
