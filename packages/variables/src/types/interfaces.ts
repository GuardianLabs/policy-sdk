// export interface IAsyncMapGetter<ValueType> {
export type SupportedTypes<T> = Promise<T> | T | undefined;

export interface IAsyncMapGetter<T> {
  get(key: string): SupportedTypes<T>;
}
