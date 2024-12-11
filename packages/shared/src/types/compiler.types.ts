import { ContractRunner } from 'ethers';
import { OnchainPresentation } from './contracts.types';

export type ICompiler = {
  compile(): Promise<OnchainPresentation>;
};

export interface LacLangCompilerOptions {
  checkTypesAgainstOnchainDescriptors?: boolean;
  checkTypesAgainstDslDeclarations?: boolean;
  provider?: ContractRunner;
}
