import { OnchainVariablesDescription } from '@guardian-network/shared/src/types/contracts.types';
import { PrimitiveEncodeParamTypes } from '@guardian-network/shared/src/types/solidity-encode.types';

/* type OnchainVariablesDescription = {
  nodeId: string;
  nodeIndex: bigint;
  artifactAddress: string;
  variables: ArgumentStructOutput[];
  injections: StringAndIndexStructOutput[];
}; */

export type AllowedVariablesType = PrimitiveEncodeParamTypes; // string | number | boolean;

export type NodeVariablesConfig = {
  nodeId: NodeId;
  variables: FormattedVariableDescription[];
};

export type FormattedVariableDescription = {
  name: string;
  type: string;
  uniqueName: string;
  index: number;
  injection?: string;
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
  variables: Array<Variable>;
  injections: Array<Injection>;
};

export type SupportedDescriptionType =
  | OnchainVariablesDescription
  | TypedRawOnchainVariablesDescription;

export type VarName = string;
export type VarIndex = number;
export type NodeId = string;
