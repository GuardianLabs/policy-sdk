#!/usr/bin/env node

import { Command } from 'commander';
import { config } from 'dotenv';
import { version } from '../package.json';
import { compileCommand } from './compiler-module';

config();

const program = new Command();

program
  .name('Guardian-network Policy CLI')
  .description('CLI tools for a LacLang Policy composition language')
  .version(version);

compileCommand(program);

program.parse();
