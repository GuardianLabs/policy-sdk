import { ContractRunner } from 'ethers';
export {
  GraphInitParamsStruct,
  IArbitraryDataArtifact__factory,
} from '@guardian-network/policy-contracts/src';

export interface CompilerOptions {
  checkTypesAgainstOnchainDescriptors?: boolean;
  checkTypesAgainstDslDeclarations?: boolean;
  provider?: ContractRunner;
}
