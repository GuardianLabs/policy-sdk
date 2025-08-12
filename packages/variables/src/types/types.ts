import {
  OnchainVariablesDescription,
  PrimitiveEncodeParamTypes,
} from '@guardian-network/shared';

/* type OnchainVariablesDescription = {
  nodeId: string;
  nodeIndex: bigint;
  artifactAddress: string;
  variables: ArgumentStructOutput[];
  injections: StringAndIndexStructOutput[];
}; */

export type AllowedVariablesType = PrimitiveEncodeParamTypes; // string | number | boolean;

// note: this reflects in some way a bit reshaped entry of 'NodeVariablesDescription' type
export type VarDescription = {
  name: string; // according to "Artifact.getExecDescriptor" definition, or dsl definition
  type: string; // according to "Artifact.getExecDescriptor" definition, or dsl definition
  uniqueName: string; // this contain unique variable name in comparison to other variables in the same node or in the other nodes
  index: number; // position is node vars list
  injection?: string; // unique injection-id if variable injects
};

export type VarValue = {
  index: number;
  value: AllowedVariablesType;
};

export type SuppliedVariables = {
  nodeId: NodeId;
  values: AllowedVariablesType[];
};

export type Variable = {
  typename: string;
  name: string;
};

type Injection = {
  value: string;
  index: number;
};

export type TypedRawOnchainVariablesDescription = {
  nodeId: NodeId;
  nodeIndex: number; // parent node
  artifactAddress: string;
  descriptions: Array<Variable>;
  injections: Array<Injection>;
};

export type NodeVariablesDescription =
  | OnchainVariablesDescription
  | TypedRawOnchainVariablesDescription;

// note: this reflects in some way a bit reshaped value of 'NodeVariablesDescription' type
// see also, 'VarDescription' definition
export type NodeVariablesConfig = {
  nodeId: NodeId;
  variables: VarDescription[];
};

export type VarName = string;
export type VarIndex = number;
export type NodeId = string;
