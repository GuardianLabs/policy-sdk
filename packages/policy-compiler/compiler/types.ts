import { Provider } from 'ethers';

export interface CompilerOptions {
  checkTypesAgainstOnchain?: boolean;
  checkTypesAgainstDeclaration?: boolean;
  provider?: Provider;
}
