import { solidityPackedKeccak256 } from 'ethers';
import { IRTransformer } from '.';
import { InstanceConfig } from '../transpiler/state/types';

export const nodeId = (def: InstanceConfig, salt: number) =>
  solidityPackedKeccak256(
    ['string', 'uint256'],
    [IRTransformer.buildIRFromInstanceDeclaration(def), salt],
  );

export const nodeIdByNotation = (def: string, salt: number) =>
  solidityPackedKeccak256(['string', 'uint256'], [def, salt]);
