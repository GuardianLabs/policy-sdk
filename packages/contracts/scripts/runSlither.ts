#!/usr/bin/env node

import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);

const result = spawnSync('slither', args, {
  stdio: 'inherit',
  shell: true,
});

if (result.error) {
  if ((result.error as NodeJS.ErrnoException).code === 'ENOENT') {
    console.log(
      'install slither using: \npython3 -m pip install slither-analyzer',
    );
    process.exit(1);
  }

  console.error(result.error.message);
  process.exit(1);
}

// Some shells return exit code 127 instead of ENOENT when the command
// is not found.
if (result.status === 127) {
  console.log(
    'install slither using: \npython3 -m pip install slither-analyzer',
  );
  process.exit(1);
}

process.exit(0);
