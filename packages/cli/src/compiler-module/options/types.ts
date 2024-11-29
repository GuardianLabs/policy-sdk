type CompileOptionsBase = {
  typeDsl: string;
  typeOnchain: string;
  rpc: string;
  write: string;
  sourcePath: string;
};

export type CliCompileOptions = Partial<CompileOptionsBase> & {
  sourcePath: string;
};
