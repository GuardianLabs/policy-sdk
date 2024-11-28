type CompileOptionsBase = {
  typeDsl: string;
  typOnchain: string;
  rpc: string;
  write: string;
  sourcePath: string;
};

export type CliCompileOptions = Partial<CompileOptionsBase> & {
  sourcePath: string;
};
