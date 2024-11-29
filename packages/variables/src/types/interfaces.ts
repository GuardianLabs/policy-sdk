export interface IAsyncMapGetter<ValueType> {
  get(key: string): Promise<ValueType> | ValueType | undefined;
}

export { NamedTypedVariablesStructOutput as OnchainVariablesDescription } from '@guardian-network/policy-contracts/src';
