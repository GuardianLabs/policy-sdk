import { ContractRunner } from 'ethers';
import { SupportedSolidityTypesEnum } from './types';

export const isSupportedSolidityType = (
  value: string,
): value is SupportedSolidityTypesEnum => {
  const isType = Object.values(SupportedSolidityTypesEnum).includes(
    value as any,
  );
  return isType;
};

export const isContractProviderType = (
  value: Object,
): value is ContractRunner => {
  return 'provider' in value;
};
