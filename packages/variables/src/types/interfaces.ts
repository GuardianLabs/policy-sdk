// export interface IAsyncMapGetter<ValueType> {
type SupportedTypes<T> = Promise<T> | T | undefined;

export interface IAsyncMapGetter<T> {
  get(key: string): SupportedTypes<T>;
}
