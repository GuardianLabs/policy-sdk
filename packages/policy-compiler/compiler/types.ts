import { ContractRunner } from 'ethers';

export interface CompilerOptions {
  checkTypesAgainstOnchain?: boolean;
  checkTypesAgainstDeclaration?: boolean;
  provider?: ContractRunner;
}
