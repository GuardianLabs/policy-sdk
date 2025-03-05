import { solidityEncodeSingleParam } from '@guardian-network/shared/src/solidity-encode-decode';
import { VariablesStruct } from '@guardian-network/shared/src/types/contracts.types';
import { ErrorFactory } from './errors';
import { StaticInjector } from './injection';
import { Inserter } from './insertion';
import {
  AllowedVariablesType,
  IAsyncMapGetter,
  NodeVariablesConfig,
  NodeVariablesDescription,
  SuppliedVariables,
  VarDescription,
} from './types';
import {
  translateVarsDescriptionToConfig,
  validateAllVariablesSupplied,
  validateVarValueTypeWithErr,
} from './utils';

// note: fill each variable with respective data
export class VariablesPopulator {
  protected varsConfig: NodeVariablesConfig[];
  private inserter: Inserter;
  private suppliedVars: SuppliedVariables[];

  constructor(varsDescriptions: Array<NodeVariablesDescription>) {
    this.varsConfig = translateVarsDescriptionToConfig(varsDescriptions);

    this.inserter = new Inserter(this.varsConfig);

    this.suppliedVars = this.inserter.filledVars;
    // console.log(this.filledVariables[0].values);
  }

  // note: varName has to be unique in comparison to other vars
  insert = (varName: string, varValue: AllowedVariablesType) => {
    const varDescription = this.getVarDescription(varName);
    validateVarValueTypeWithErr(varValue, varDescription.type);

    this.inserter.insert(varName, varValue);

    this.suppliedVars = this.inserter.filledVars;
  };

  inject = async (attributes: IAsyncMapGetter<AllowedVariablesType>) => {
    // note: this might be called as more times as required
    this.suppliedVars = await StaticInjector.inject(
      this.varsConfig,
      this.suppliedVars,
      attributes,
    );
  };

  importState = (filledValues: SuppliedVariables[]) => {
    this.inserter.import(filledValues);

    this.suppliedVars = this.inserter.filledVars;

    return this;
  };

  dumpState = (): Array<SuppliedVariables> => {
    return this.suppliedVars;
  };

  // note: actually not serialized, rather packed to be
  // compatible with policy-handler "evaluate" method define onchain using Solidity
  toSerializedVariables = (): Array<VariablesStruct> => {
    // note: only completely supplied variables have to be serialized
    this.validateAllFilled();

    const solidityPackedVariablesList = this.suppliedVars.map(
      ({ nodeId, values }) => ({
        nodeId,
        values: values.map((val) => solidityEncodeSingleParam(val)),
      }),
    );

    return solidityPackedVariablesList;
  };

  getVarDescription(varName: string): VarDescription {
    const variableDescription = this.getVarsDescription().find(
      ({ uniqueName }) => uniqueName == varName,
    );

    // note: validate variable exists (and has a description)
    if (!variableDescription) throw ErrorFactory.variableNotFound(varName);

    return variableDescription;
  }

  getVarsDescription = (): VarDescription[] => {
    // flattened list of each node variables
    const variablesDescriptionList: VarDescription[] = this.varsConfig.flatMap(
      ({ variables }) => variables,
    );

    return variablesDescriptionList;
  };

  validateAllFilledExceptInjections = (): void => {
    const isVariableInjectable = (varDescription: VarDescription) => {
      // note: undefined means not injection; defined means injection
      return !!varDescription.injection;
    };

    validateAllVariablesSupplied(
      this.varsConfig,
      this.suppliedVars,
      isVariableInjectable,
    );
  };

  validateAllFilled = (): void => {
    validateAllVariablesSupplied(this.varsConfig, this.suppliedVars);
  };
}
