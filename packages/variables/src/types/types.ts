import { OnchainVariablesDescription } from '@guardian-network/shared/src/types/contracts.types';
import { PrimitiveEncodeParamTypes } from '@guardian-network/shared/src/types/solidity-encode.types';

export type AllowedVariablesType = PrimitiveEncodeParamTypes; // string | number | boolean;

export type VariablesFormattedDescription = {
  nodeId: string;
  variables: FormattedVariableDescription[];
};

export type FormattedVariableDescription = {
  name: string;
  type: string;
  uniqueName: string;
  index: number;
  injection?: string;
};

export type FilledVariables = {
  nodeId: string;
  values: AllowedVariablesType[];
};

export type VariableValue = {
  value: AllowedVariablesType;
  index: number;
};

type Variable = {
  typename: string;
  name: string;
};

type Injection = {
  value: string;
  index: number;
};

export type TypedRawOnchainVariablesDescription = {
  nodeId: string;
  nodeIndex: number;
  artifactAddress: string;
  variables: Array<Variable>;
  injections: Array<Injection>;
};

export type SupportedDescriptionType =
  | OnchainVariablesDescription
  | TypedRawOnchainVariablesDescription;
