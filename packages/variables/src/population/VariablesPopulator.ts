import { solidityEncodeSingleParam } from '@guardian-network/shared/src/solidity-encode-decode';
import { VariablesStruct } from '@guardian-network/shared/src/types/contracts.types';
import { ErrorFactory } from '../errors';
import { VariablesInjector } from '../injection';
import { VariablesInserter } from '../insertion';
import {
  AllowedVariablesType,
  FilledVariables,
  FormattedVariableDescription,
  IAsyncMapGetter,
  SupportedDescriptionType,
  VariablesFormattedDescription,
} from '../types';
import { formatOnchainVariables, valueCompliesExpectedType } from '../utils';

export class VariablesPopulator {
  public formattedVariablesConfiguration: VariablesFormattedDescription[] = [];
  private inserter: VariablesInserter;
  private injector: VariablesInjector<AllowedVariablesType>;
  private filledVariables: FilledVariables[];

  constructor(rawVariablesDescription: Array<SupportedDescriptionType>) {
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

  public import(filledValues: FilledVariables[]) {
    this.inserter.import(filledValues);

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

  public validateFilledAllOrThrow() {
    this._validateFillingWithAdditionalCondition();
  }

  public validateFilledAllExceptInjectionsOrThrow() {
    const graceToInjections = (varDecl: FormattedVariableDescription) =>
      !varDecl.injection;

    this._validateFillingWithAdditionalCondition(graceToInjections);
  }

  private _validateVariableValueType(
    filledValue: AllowedVariablesType,
    uniqueVariableName: string,
  ) {
    const varDescription = this.getVariableDescription(uniqueVariableName);
    if (!varDescription)
      throw ErrorFactory.variableNotFound(uniqueVariableName);

    if (!valueCompliesExpectedType(filledValue, varDescription.type))
      throw ErrorFactory.variableTypeNotMet(
        filledValue.toString(),
        varDescription.type,
      );
  }

  private _validateFillingWithAdditionalCondition(
    nuance: (varDecl: FormattedVariableDescription) => boolean = (_) => true,
  ) {
    for (let i = 0; i < this.formattedVariablesConfiguration.length; i++) {
      const expectedVariables = this.formattedVariablesConfiguration[i];
      const filledValues = this.filledVariables[i];

      for (let j = 0; j < expectedVariables.variables.length; j++) {
        const expectedVariable = expectedVariables.variables[j];

        if (filledValues.values[j] == undefined && nuance(expectedVariable)) {
          throw ErrorFactory.variableNotFilled(
            expectedVariable.uniqueName,
            expectedVariable.injection,
          );
        }
      }
    }
  }
}
