import { solidityPackedKeccak256 as keccak256Hash } from 'ethers';
export { solidityPackedKeccak256 as keccak256Hash } from 'ethers';

export class NodeId {
  // note: this takes (intermeditate presentation of artifact + salt = node_id)
  // with significant uniqueness level
  static fromNotation(artifactIntermediateForm: string, salt: number): string {
    // todo: validate 'artifactIntermediateForm' relying on Regex
    const nodeId = keccak256Hash(
      ['string', 'uint256'],
      [artifactIntermediateForm, salt],
    );
    return nodeId;
  }
}
