export interface IAsyncMapGetter<ValueType> {
  get(key: string): Promise<ValueType> | ValueType | undefined;
}

export { NamedTypedVariablesStructOutput as OnchainVariablesDescription } from '../../../policy-contracts/src/typechain/contracts/ArtifactsGraph';
