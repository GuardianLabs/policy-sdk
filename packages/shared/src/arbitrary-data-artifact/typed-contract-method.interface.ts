/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type {
  ContractTransaction,
  ContractTransactionResponse,
  FunctionFragment,
  Typed,
} from 'ethers';
import { Overrides, StateMutability } from './method-mutability.types';

type PostfixOverrides<A extends Array<any>, S extends StateMutability> =
  | A
  | [...A, Overrides<S>];

type ContractMethodArgs<
  Args extends Array<any>,
  State extends StateMutability,
> = PostfixOverrides<{ [I in keyof Args]-?: Args[I] | Typed }, State>;

type DefaultReturnType<R> = R extends Array<any> ? R[0] : R;

type GetReturnType<T extends StateMutability, K> = T extends 'view'
  ? Promise<DefaultReturnType<K>>
  : Promise<ContractTransactionResponse>;

// export interface ContractMethod<A extends Array<any> = Array<any>, R = any, D extends R | ContractTransactionResponse = R | ContractTransactionResponse> {
export interface TypedContractMethod<
  Args extends Array<any> = Array<any>,
  Returns = any,
  State extends StateMutability = 'payable',
> {
  (...args: ContractMethodArgs<Args, State>): GetReturnType<State, Returns>;

  name: string;

  fragment: FunctionFragment;

  getFragment(...args: ContractMethodArgs<Args, State>): FunctionFragment;

  populateTransaction(
    ...args: ContractMethodArgs<Args, State>
  ): Promise<ContractTransaction>;

  staticCall(
    ...args: ContractMethodArgs<Args, 'view'>
  ): Promise<DefaultReturnType<Returns>>;

  send(
    ...args: ContractMethodArgs<Args, State>
  ): Promise<ContractTransactionResponse>;

  estimateGas(...args: ContractMethodArgs<Args, State>): Promise<bigint>;

  staticCallResult(...args: ContractMethodArgs<Args, 'view'>): Promise<Returns>;
}
