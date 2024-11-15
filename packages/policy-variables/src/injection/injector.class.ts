import { NamedTypedVariablesStructOutput } from "../../../policy-contracts/src/typechain/contracts/ArtifactNodes";
import { CannotLookupVariableValueError } from "../errors";
import { AllowedVariablesType, FilledVariables, IAsyncMapGetter, VariablesFormattedDescription } from "../types";
import { formatOnchainVariables } from "../utils";

export class VariablesInjector<ValueType extends AllowedVariablesType> {
    
    constructor(private readonly formattedVariablesConfiguration: VariablesFormattedDescription[], public previouslyFilledVariables: FilledVariables[] = []) {
    }

    public async injectValues(valuesSource: IAsyncMapGetter<ValueType>) {
        const injectedOnPlaceVariables = structuredClone(this.previouslyFilledVariables);

        for(let variablePotentiallyFilled of injectedOnPlaceVariables) {
        const onchainVariableDefinitionByNode = this.formattedVariablesConfiguration.find(el => el.nodeId == variablePotentiallyFilled.nodeId);

        if(onchainVariableDefinitionByNode && onchainVariableDefinitionByNode.variables) {
            for(let [index, onchainVariableDefinition] of onchainVariableDefinitionByNode.variables.entries()) {
                if(onchainVariableDefinition.injection) {
                    const attribute = await valuesSource.get(onchainVariableDefinition.injection);
                    const defaultValue = variablePotentiallyFilled.values[index]
                    
                    if(attribute) {
                        variablePotentiallyFilled.values[index] = attribute;
                    } else if(defaultValue) {
                        variablePotentiallyFilled.values[index] = defaultValue;
                    } else throw new CannotLookupVariableValueError(onchainVariableDefinition.uniqueName, onchainVariableDefinition.injection);
                }
            }
        }
    }

    return injectedOnPlaceVariables;
    }
}