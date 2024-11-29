import { PrimitiveEncodeParamTypes } from '@guardian-network/policy-contracts/src/solidity-encode-decode';
import { TypedRawOnchainVariablesDescription } from '../utils';
import { OnchainVariablesDescription } from './interfaces';

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
  index: number;
  value: AllowedVariablesType;
};

export type SupportedDescriptionType =
  | OnchainVariablesDescription
  | TypedRawOnchainVariablesDescription;
