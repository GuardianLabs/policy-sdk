import { InstanceConfig } from '@guardian-network/shared/src/types/dsl.types';
import { ParserRuleContext } from 'antlr4ts';

type KeyType = string;
type IdKeyType = KeyType;
type NameKeyType = KeyType;

type DataType = { type: string };
type AddressType = {
  address: string;
};
type NameType = {
  name: string;
};
type NodeIdType = {
  nodeId: string;
};
type IndexType = {
  index: number;
};
type ConfigType = {
  config: InstanceConfig;
};
type InjectionType = { injection: string };
type ValueType = { value: string };

type ContextWrapped = { ctx: ParserRuleContext };

export type Constants = Map<KeyType, ValueType & DataType & ContextWrapped>;

export type Variables = Map<KeyType, DataType & ContextWrapped & InjectionType>;

export type Artifacts = Map<KeyType, AddressType & ContextWrapped>;

export type InstancesByName = Map<
  NameKeyType,
  {
    id: string;
  } & IndexType &
    ConfigType &
    DataType &
    ContextWrapped
>;

export type InstancesById = Map<
  IdKeyType,
  NameType & IndexType & ConfigType & DataType & ContextWrapped
>;

export type Evaluating = NodeIdType & ContextWrapped;
