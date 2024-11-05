import { solidityPackedKeccak256 } from 'ethers';
import { IRTransformer } from '../';
import { InstanceConfig } from '../../transpiler/state';

export const nodeId = (def: InstanceConfig, salt: number) =>
  solidityPackedKeccak256(
    ['string', 'uint256'],
    [IRTransformer.buildIRFromInstanceDeclaration(def), salt],
  );
