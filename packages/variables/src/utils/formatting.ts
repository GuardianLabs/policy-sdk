import { ErrorFactory } from '../errors';
import {
  NodeVariablesConfig,
  SupportedDescriptionType,
  TypedRawOnchainVariablesDescription,
  Variable,
} from '../types';

export const formatOnchainVariables = (
  rawVariables: SupportedDescriptionType[],
): NodeVariablesConfig[] => {
  const nodesVarsConfig: NodeVariablesConfig[] = [];

  for (let rawVariablesByNode of rawVariables.map(
    rawOnchainVariablesDescriptionToOffchainView,
  )) {
    nodesVarsConfig.push({
      nodeId: rawVariablesByNode.nodeId,
      variables: [],
    });

    for (const [index, variable] of rawVariablesByNode.variables.entries()) {
      nodesVarsConfig[nodesVarsConfig.length - 1].variables.push({
        name: variable.name,
        type: variable.typename,
        uniqueName: buildUniqueVariablesName(variable, rawVariablesByNode),
        index,
      });
    }

    for (const injection of rawVariablesByNode.injections) {
      const varToInject = nodesVarsConfig[
        nodesVarsConfig.length - 1
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

  return [...nodesVarsConfig];
};

export const rawOnchainVariablesDescriptionToOffchainView = (
  rawVariable: SupportedDescriptionType,
): TypedRawOnchainVariablesDescription => {
  const { nodeId, variables, injections, artifactAddress, nodeIndex } =
    rawVariable;

  const result = {
    nodeId,
    nodeIndex: Number(nodeIndex),
    artifactAddress,
    variables: variables.map(({ typename, name }) => ({ typename, name })),
    injections: injections.map(({ value, index }) => ({
      value,
      index: Number(index),
    })),
  };
  return result;
};

const buildUniqueVariablesName = (
  variable: Variable,
  description: TypedRawOnchainVariablesDescription,
) => {
  return `${variable.name}_${variable.typename}_${description.artifactAddress}_${description.nodeIndex}`;
};
