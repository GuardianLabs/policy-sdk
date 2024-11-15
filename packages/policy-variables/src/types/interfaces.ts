export interface IAsyncMapGetter<ValueType> {
    get(key: string): Promise<ValueType> | ValueType | undefined
}