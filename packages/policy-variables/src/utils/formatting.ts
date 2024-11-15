import { NamedTypedVariablesStructOutput } from "../../../policy-contracts/src/typechain/contracts/ArtifactNodes";
import { VariablesFormattedDescription } from "../types";

export const formatOnchainVariables = (rawVariables: NamedTypedVariablesStructOutput[]) => {
    let formattedVariables: VariablesFormattedDescription[] = [];

    for(let rawVariablesByNode of rawVariables) {
        formattedVariables.push({nodeId: rawVariablesByNode.nodeId});
        for(const [index, variable] of rawVariablesByNode.variables.entries()) {
            formattedVariables[formattedVariables.length - 1].variables?.push({
                name: variable.name,
                type: variable.typename,
                uniqueName: buildUniqueVariablesName(variable.name, variable.typename, rawVariablesByNode.artifactAddress, Number(rawVariablesByNode.nodeIndex)),
                index
            })
        }

        for(const injection of rawVariablesByNode.injections) {
            const varToInject = formattedVariables[formattedVariables.length - 1].variables?.find(el => el.index == Number(injection.index));
            if(varToInject) {
                varToInject.injection = injection.value;
            } else throw new Error();
        }
    }

    return formattedVariables;
}

export const buildUniqueVariablesName = (name: string, type: string, artifactAddress: string, parentNodeIndex: number) => {
    return `${name}_${type}_${artifactAddress}_${parentNodeIndex}`;
}