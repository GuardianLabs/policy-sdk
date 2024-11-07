import { GraphInitParamsStruct } from '../../policy-contracts/src/typechain/contracts/ArtifactsGraph';
import { findCycle, Node } from '../dsl/transpiler/validations';
import { CyclicReferenceError, SelfReferenceError } from './errors';

export const validateFinalRepresentation = (fr: GraphInitParamsStruct) => {
  const nodes: Node[] = fr.nodes.map(({ id, substitutions }) => ({
    id: id.toString(),
    references: substitutions.map((subst) => subst.value.toString()),
  }));

  validateCyclicity(nodes);
  validateSelfReference(nodes);
};

export const validateCyclicity = (nodes: Node[]) => {
  const cycleFound = findCycle(nodes);

  if (cycleFound) {
    const { nodeId, parentNodeId } = cycleFound;
    throw new CyclicReferenceError(nodeId, parentNodeId);
  }
};

export const validateSelfReference = (nodes: Node[]) => {
  let selfReferenceNode;

  nodes.forEach((node) => {
    selfReferenceNode = node.references.find((el) => el == node.id);
  });

  if (selfReferenceNode) throw new SelfReferenceError(selfReferenceNode);
};
