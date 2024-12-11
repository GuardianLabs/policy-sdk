import { OnchainVariablesDescription } from '@guardian-network/shared/src/types/contracts.types';
import { ErrorFactory } from '../errors';
import {
  TypedRawOnchainVariablesDescription,
  VariablesFormattedDescription,
} from '../types';

export const formatOnchainVariables = (
  rawVariables: (
    | OnchainVariablesDescription
    | TypedRawOnchainVariablesDescription
  )[],
) => {
  let formattedVariables: VariablesFormattedDescription[] = [];

  for (let rawVariablesByNode of rawVariables.map(
    rawOnchainVariablesDescriptionToOffchainView,
  )) {
    formattedVariables.push({
      nodeId: rawVariablesByNode.nodeId,
      variables: [],
    });
    for (const [index, variable] of rawVariablesByNode.variables.entries()) {
      formattedVariables[formattedVariables.length - 1].variables.push({
        name: variable.name,
        type: variable.typename,
        uniqueName: buildUniqueVariablesName(
          variable.name,
          variable.typename,
          rawVariablesByNode.artifactAddress,
          Number(rawVariablesByNode.nodeIndex),
        ),
        index,
      });
    }

    for (const injection of rawVariablesByNode.injections) {
      const varToInject = formattedVariables[
        formattedVariables.length - 1
      ].variables.find((el) => el.index == Number(injection.index));
      if (varToInject) {
        varToInject.injection = injection.value;
      } else
        throw ErrorFactory.injectionFormatting(
          injection.value,
          injection.index,
        );
    }
  }

  return formattedVariables;
};

export const buildUniqueVariablesName = (
  name: string,
  type: string,
  artifactAddress: string,
  parentNodeIndex: number,
) => {
  return `${name}_${type}_${artifactAddress}_${parentNodeIndex}`;
};

export const rawOnchainVariablesDescriptionToOffchainView = ({
  nodeId,
  nodeIndex,
  artifactAddress,
  variables,
  injections,
}:
  | OnchainVariablesDescription
  | TypedRawOnchainVariablesDescription): TypedRawOnchainVariablesDescription => ({
  nodeId,
  nodeIndex: Number(nodeIndex),
  artifactAddress,
  variables: variables.map(({ typename, name }) => ({ typename, name })),
  injections: injections.map(({ value, index }) => ({
    value,
    index: Number(index),
  })),
});
