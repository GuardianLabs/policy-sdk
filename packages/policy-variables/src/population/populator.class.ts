import { VariablesStruct } from '../../../policy-contracts/src/typechain/contracts/ArtifactNodes';
import { VariablesInjector } from '../injection';
import { VariablesInserter } from '../insertion';
import {
  AllowedVariablesType,
  FilledVariables,
  IAsyncMapGetter,
  OnchainVariablesDescription,
  VariablesFormattedDescription,
} from '../types';
import {
  formatOnchainVariables,
  TypedRawOnchainVariablesDescription,
  valueCompliesExpectedType,
} from '../utils';
import { solidityEncodeSingleParam } from '../../../policy-contracts/test/utils';
import { VariableNotFoundError, VariableTypeNotMetError } from '../errors';

// todo: filling completeness checks
export class VariablesPopulator {
  public formattedVariablesConfiguration: VariablesFormattedDescription[] = [];
  private inserter: VariablesInserter;
  private injector: VariablesInjector<AllowedVariablesType>;
  private filledVariables: FilledVariables[];

  constructor(
    rawVariablesDescription: (
      | OnchainVariablesDescription
      | TypedRawOnchainVariablesDescription
    )[],
  ) {
    this.formattedVariablesConfiguration = formatOnchainVariables(
      rawVariablesDescription,
    );

    this.inserter = new VariablesInserter(this.formattedVariablesConfiguration);
    this.injector = new VariablesInjector(this.formattedVariablesConfiguration);

    this.filledVariables = this.inserter.getFilledVariables();
  }

  public insert(variableUniqueName: string, value: AllowedVariablesType) {
    this._validateVariableValueType(value, variableUniqueName);

    this.inserter.insert(variableUniqueName, value);

    this.filledVariables = this.inserter.getFilledVariables();
  }

  public async inject(attributes: IAsyncMapGetter<AllowedVariablesType>) {
    this.injector.previouslyFilledVariables = this.filledVariables;

    this.filledVariables = await this.injector.injectValues(attributes);
  }

  public getVariablesDescription() {
    return this.formattedVariablesConfiguration.flatMap((el) => el.variables);
  }

  public getVariablesValues() {
    return this.filledVariables;
  }

  public getVariablesEncoded(): VariablesStruct[] {
    return this.filledVariables.map(({ nodeId, values }) => ({
      nodeId,
      values: values.map((val) => solidityEncodeSingleParam(val)),
    }));
  }

  public getVariableDescription(uniqueName: string) {
    return this.getVariablesDescription().find(
      (el) => el.uniqueName == uniqueName,
    );
  }

  private _validateVariableValueType(
    filledValue: AllowedVariablesType,
    uniqueVariableName: string,
  ) {
    const varDescription = this.getVariableDescription(uniqueVariableName);
    if (!varDescription) throw new VariableNotFoundError(uniqueVariableName);

    if (!valueCompliesExpectedType(filledValue, varDescription.type))
      throw new VariableTypeNotMetError(
        filledValue.toString(),
        varDescription.type,
      );
  }
}
