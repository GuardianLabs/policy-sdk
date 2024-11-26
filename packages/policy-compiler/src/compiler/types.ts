import { ContractRunner } from 'ethers';

export interface CompilerOptions {
  checkTypesAgainstOnchainDescriptors?: boolean;
  checkTypesAgainstDslDeclarations?: boolean;
  provider?: ContractRunner;
}
