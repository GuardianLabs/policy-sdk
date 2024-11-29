export const typeOnchainOption: [string, string] = [
  '--type-onchain',
  '[OPTIONAL] Triggers types checking via onchain artifacts description, equivalent to checkTypesAgainstOnchain = true',
];

export const typeDslOption: [string, string] = [
  '--type-dsl',
  '[OPTIONAL] Triggers types checking via dsl definitions, equivalent to checkTypesAgainstDeclaration = true',
];

export const rpcEndpointOption: [string, string] = [
  '--rpc <URL>',
  '[OPTIONAL, if --type-*] JSON RPC URL is required for type checking communication. Otherwise the value from $RPC env variable is consumed',
];

export const writeCompilationResultOption: [string, string] = [
  '-w, --write <outputPath>',
  '[OPTIONAL] Writes compilation output as JSON to dedicated file',
];

export const sourcePathOptions: [string, string] = [
  '-p, --sourcePath <lacFilePath>',
  'Path to LacLang (*.lac) sources',
];
