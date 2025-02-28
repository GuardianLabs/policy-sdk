import { ErrorFactory } from '../errors';
import {
  AllowedVariablesType,
  IAsyncMapGetter,
  NodeVariablesConfig,
  SuppliedVariables,
} from '../types';
import { valueCompliesExpectedType } from '../utils';

// note: inject variable value
export class Injector<T extends AllowedVariablesType> {
  constructor(
    protected readonly varsConfig: NodeVariablesConfig[],
    public knownVariables: SuppliedVariables[] = [], // already filled variables; could be injected or inserted
  ) {}

  injectValues = async (valuesSource: IAsyncMapGetter<T>) => {
    const injectedOnPlaceVariables = structuredClone(this.knownVariables);

    for (let variablePotentiallyFilled of injectedOnPlaceVariables) {
      const onchainVariableDefinitionByNode = this.varsConfig.find(
        (el) => el.nodeId == variablePotentiallyFilled.nodeId,
      );

      if (
        !!onchainVariableDefinitionByNode &&
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
                throw ErrorFactory.variableTypeNotMet(
                  attribute.toString(),
                  expectedType,
                );

              variablePotentiallyFilled.values[index] = attribute;
            } else if (defaultValue !== undefined) {
              if (!valueCompliesExpectedType(defaultValue, expectedType))
                throw ErrorFactory.variableTypeNotMet(
                  defaultValue.toString(),
                  expectedType,
                );

              variablePotentiallyFilled.values[index] = defaultValue;
            } else
              throw ErrorFactory.cannotLookupVariableValue(
                onchainVariableDefinition.uniqueName,
                onchainVariableDefinition.injection,
              );
          }
        }
      }
    }

    return injectedOnPlaceVariables;
  };
}
