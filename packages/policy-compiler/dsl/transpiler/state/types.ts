import { ParserRuleContext } from 'antlr4ts';
import { TypedValue } from '../helpers';

export type InstanceConfigArgumentsOnly = {
  execArguments: TypedValue[];
  initArguments: TypedValue[];
};

export type InstanceConfig = InstanceConfigArgumentsOnly & {
  name?: string;
  artifactAddress: string;
};

export type Name = { name: string };
export type Type = { type: string };
type Context = { ctx: ParserRuleContext };

export type Constants = Map<
  string,
  {
    value: string;
  } & Context &
    Type
>;

export type Variables = Map<string, Type & Context & { injection: string }>;

export type Artifacts = Map<
  string,
  {
    address: string;
  } & Context
>;

export type Instances = Map<
  string,
  {
    id: string;
    index: number;
    config: InstanceConfig;
  } & Context &
    Type
>;

export type InstancesById = Map<
  string,
  {
    name: string;
    index: number;
    config: InstanceConfig;
  } & Context &
    Type
>;

export type Evaluate = {
  nodeId: string;
} & Context;
