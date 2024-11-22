import { LacLangCompilerOptions } from '.';
import { GraphInitParamsStruct } from '../../policy-contracts/src/typechain/contracts/ArtifactsGraph';
import { findCycle, Node } from '../dsl/transpiler/validations';
import {
  CyclicReferenceError,
  NoProviderError,
  SelfReferenceError,
} from './errors';

export const validateProviderIsSupplied = (options: LacLangCompilerOptions) => {
  const isProviderSupplied = !!options.provider;
  const needsDslTypesCheck = !!options.checkTypesAgainstDslDeclarations;
  const needsOnchainTypesCheck = !!options.checkTypesAgainstOnchainDescriptors;

  if ((needsDslTypesCheck || needsOnchainTypesCheck) && !isProviderSupplied) {
    throw new NoProviderError();
  }
};

export const validateFinalRepresentation = (fr: GraphInitParamsStruct) => {
  const nodes: Node[] = fr.nodes.map(({ id, substitutions }) => ({
    id: id.toString(),
    references: substitutions.map((subst) => subst.value.toString()),
  }));

  validateCyclicity(nodes);
  validateSelfReference(nodes);
};

const validateCyclicity = (nodes: Node[]) => {
  const cycleFound = findCycle(nodes);

  if (!!cycleFound) {
    throw new CyclicReferenceError(cycleFound.nodeId, cycleFound.parentNodeId);
  }
};

export const validateSelfReference = (nodes: Node[]) => {
  let selfReferenceNode;

  nodes.forEach((node) => {
    selfReferenceNode = node.references.find((el) => el == node.id);
  });

  if (selfReferenceNode) throw new SelfReferenceError(selfReferenceNode);
};
