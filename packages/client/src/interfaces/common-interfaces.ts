import {
  GraphInitParamsStruct,
  NamedTypedVariablesStruct,
  PolicyHandler,
  VariablesStruct,
} from '@guardian-network/policy-contracts/src';
import { Signer, TransactionRequest } from 'ethers';
import { FeeDataEip1559 } from '../types';

export interface IFeeProvider {
  getFeeData(): Promise<FeeDataEip1559>;
}

export interface IBalanceValidator {
  validateSenderBalance: (
    signer: Signer,
    tx: TransactionRequest,
  ) => Promise<void>;
}

export interface IAdminAccessValidator {
  validateAdminAccess(
    adminAddress: string,
    gateway: PolicyHandler,
  ): Promise<void>;
}

export type IValidator = IAdminAccessValidator & IBalanceValidator;

export interface IPolicyClient {
  initialize: (policyConfig: GraphInitParamsStruct) => Promise<void>;
  reset: (policyConfig: GraphInitParamsStruct) => Promise<void>;
  evaluate: (variables: VariablesStruct[]) => Promise<boolean>;
  evaluateDryRun: (variables: VariablesStruct[]) => Promise<boolean>;
  getPolicyAddress: () => Promise<string>;
  getVariablesList: () => Promise<NamedTypedVariablesStruct[]>;
}
