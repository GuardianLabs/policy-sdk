import { NodeId } from '@guardian-network/shared/src/misc-utils/node-id-tooling';
import { InstanceConfig } from '@guardian-network/shared/src/types/dsl.types';
import { IRTransformer } from '.';

export const nodeIdFromDeclaration = (
  def: InstanceConfig,
  salt: number,
): string => {
  const artifactIntermediateForm =
    IRTransformer.buildIRFromInstanceDeclaration(def);

  const nodeId = NodeId.fromNotation(artifactIntermediateForm, salt);
  console.log(`nodeId ${nodeId}`);
  return nodeId;
};
