import { ErrorFactory } from '../errors';
import {
  NodeVariablesConfig,
  NodeVariablesDescription,
  TypedRawOnchainVariablesDescription,
  Variable,
} from '../types';

export const translateVarsDescriptionToConfig = (
  nodesVarsList: NodeVariablesDescription[],
): NodeVariablesConfig[] => {
  const nodesVarsConfig: NodeVariablesConfig[] = [];

  for (let nodeVars of nodesVarsList.map(
    rawOnchainVariablesDescriptionToOffchainView,
  )) {
    nodesVarsConfig.push({
      nodeId: nodeVars.nodeId,
      variables: [],
    });

    // note: add all variable data excluding injections
    for (const [index, variable] of nodeVars.descriptions.entries()) {
      const variableConfig = {
        name: variable.name,
        type: variable.typename,
        uniqueName: buildUniqueVariablesName(variable, nodeVars),
        index,
      };

      nodesVarsConfig[nodesVarsConfig.length - 1].variables.push(
        variableConfig,
      );
    }

    // note: add injections
    for (const injection of nodeVars.injections) {
      const injectableVar = nodesVarsConfig[
        nodesVarsConfig.length - 1
      ].variables.find((el) => el.index == Number(injection.index));

      if (!!injectableVar) {
        injectableVar.injection = injection.value;
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
  nodeVars: NodeVariablesDescription,
): TypedRawOnchainVariablesDescription => {
  const { nodeId, descriptions, injections, artifactAddress, nodeIndex } =
    nodeVars;

  const result = {
    nodeId,
    nodeIndex: Number(nodeIndex),
    artifactAddress,
    descriptions: descriptions.map(({ typename, name }) => ({
      typename,
      name,
    })),
    injections: injections.map(({ value, index }) => ({
      value,
      index: Number(index),
    })),
  };
  return result;
};

// note: this is a DEFINABLE method in what it outputs; double-check before applying adjustment
const buildUniqueVariablesName = (
  variable: Variable,
  varDescription: NodeVariablesDescription,
) => {
  return `${variable.name}_${variable.typename}_${varDescription.artifactAddress}_${varDescription.nodeIndex}`;
};
