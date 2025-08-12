import { InstanceConfig, NodeId } from '@guardian-network/shared';
import { IRTransformer } from '.';

export const nodeIdFromDeclaration = (
  def: InstanceConfig,
  salt: number,
): string => {
  const artifactIntermediateForm =
    IRTransformer.buildIRFromInstanceDeclaration(def);

  const nodeId = NodeId.fromNotation(artifactIntermediateForm, salt);
  return nodeId;
};
