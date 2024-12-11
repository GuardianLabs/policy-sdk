import { DslNode } from '@guardian-network//shared/src/types/dsl.types';
import { findCycle } from '@guardian-network/shared/src/misc-utils/find-cycle-node.helper';
import { LacLangCompilerOptions } from '@guardian-network/shared/src/types/compiler.types';
import { OnchainPresentation } from '@guardian-network/shared/src/types/contracts.types';
import { ErrorFactory } from './errors';

export const validateProviderIsSupplied = (options: LacLangCompilerOptions) => {
  const isProviderSupplied = !!options.provider;
  const needsDslTypesCheck = !!options.checkTypesAgainstDslDeclarations;
  const needsOnchainTypesCheck = !!options.checkTypesAgainstOnchainDescriptors;

  if ((needsDslTypesCheck || needsOnchainTypesCheck) && !isProviderSupplied) {
    throw ErrorFactory.noProvider();
  }
};

export const validateFinalRepresentation = (
  representation: OnchainPresentation,
) => {
  const nodes: DslNode[] = representation.nodes.map(
    ({ id, substitutions }) => ({
      id: id.toString(),
      references: substitutions.map((subst) => subst.value.toString()),
    }),
  );

  validateCyclicity(nodes);
  validateSelfReference(nodes);
};

const validateCyclicity = (nodes: DslNode[]) => {
  const cycleFound = findCycle(nodes);

  if (!!cycleFound) {
    throw ErrorFactory.cyclicfReference(
      cycleFound.nodeId,
      cycleFound.parentNodeId,
    );
  }
};

const validateSelfReference = (nodes: DslNode[]) => {
  for (let [, node] of nodes.entries()) {
    const isSelfReference = node.references.includes(node.id);

    if (isSelfReference) {
      throw ErrorFactory.selfReference(node.id);
    }
  }
};
