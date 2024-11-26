import { LacLangCompilerOptions } from '.';
import { GraphInitParamsStruct } from '../../../policy-contracts/src/typechain/contracts/ArtifactsGraph';
import { findCycle, Node } from '../dsl/transpiler/validations';
import { ErrorFactory } from './errors';

export const validateProviderIsSupplied = (options: LacLangCompilerOptions) => {
  const isProviderSupplied = !!options.provider;
  const needsDslTypesCheck = !!options.checkTypesAgainstDslDeclarations;
  const needsOnchainTypesCheck = !!options.checkTypesAgainstOnchainDescriptors;

  if ((needsDslTypesCheck || needsOnchainTypesCheck) && !isProviderSupplied) {
    throw ErrorFactory.noProvider();
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
    throw ErrorFactory.cyclicfReference(
      cycleFound.nodeId,
      cycleFound.parentNodeId,
    );
  }
};

const validateSelfReference = (nodes: Node[]) => {
  for (let [, node] of nodes.entries()) {
    const isSelfReference = node.references.includes(node.id);

    if (isSelfReference) {
      throw ErrorFactory.selfReference(node.id);
    }
  }
};
