import {
  CannotLookupVariableValueError,
  VariableTypeNotMetError,
} from '../errors';
import {
  AllowedVariablesType,
  FilledVariables,
  IAsyncMapGetter,
  VariablesFormattedDescription,
} from '../types';
import { valueCompliesExpectedType } from '../utils';

export class VariablesInjector<ValueType extends AllowedVariablesType> {
  constructor(
    private readonly formattedVariablesConfiguration: VariablesFormattedDescription[],
    public previouslyFilledVariables: FilledVariables[] = [],
  ) {}

  public async injectValues(valuesSource: IAsyncMapGetter<ValueType>) {
    const injectedOnPlaceVariables = structuredClone(
      this.previouslyFilledVariables,
    );

    for (let variablePotentiallyFilled of injectedOnPlaceVariables) {
      const onchainVariableDefinitionByNode =
        this.formattedVariablesConfiguration.find(
          (el) => el.nodeId == variablePotentiallyFilled.nodeId,
        );

      if (
        onchainVariableDefinitionByNode &&
        onchainVariableDefinitionByNode.variables
      ) {
        for (let [
          index,
          onchainVariableDefinition,
        ] of onchainVariableDefinitionByNode.variables.entries()) {
          if (onchainVariableDefinition.injection) {
            const attribute = await valuesSource.get(
              onchainVariableDefinition.injection,
            );
            const defaultValue = variablePotentiallyFilled.values[index];
            const expectedType = onchainVariableDefinition.type;

            if (attribute !== undefined) {
              if (!valueCompliesExpectedType(attribute, expectedType))
                throw VariableTypeNotMetError.create(
                  attribute.toString(),
                  expectedType,
                );

              variablePotentiallyFilled.values[index] = attribute;
            } else if (defaultValue !== undefined) {
              if (!valueCompliesExpectedType(defaultValue, expectedType))
                throw VariableTypeNotMetError.create(
                  defaultValue.toString(),
                  expectedType,
                );

              variablePotentiallyFilled.values[index] = defaultValue;
            } else
              throw CannotLookupVariableValueError.create(
                onchainVariableDefinition.uniqueName,
                onchainVariableDefinition.injection,
              );
          }
        }
      }
    }

    return injectedOnPlaceVariables;
  }
}
