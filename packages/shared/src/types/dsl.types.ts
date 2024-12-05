export type MinTypedValue = {
  type: string;
  value: string;
};

export interface DslNode {
  id: string;
  references: string[];
}

export type TypedValue = MinTypedValue & {
  substitution?: boolean;
  constant?: boolean;
};

export type InstanceConfigArgumentsOnly = {
  execArguments: TypedValue[];
  initArguments: TypedValue[];
};

export type InstanceConfigNameAndAddressOnly = {
  name?: string;
  artifactAddress: string;
};

export type InstanceConfig = InstanceConfigArgumentsOnly &
  InstanceConfigNameAndAddressOnly;

export type TranspilerOutput = {
  ir: string;
  rootNode: string;
  typings: InstanceConfig[];
};
