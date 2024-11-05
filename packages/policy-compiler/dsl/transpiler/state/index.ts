import { ParserRuleContext } from 'antlr4ts';
import { TypedValue } from '../helpers';

export type InstanceConfig = {
  name?: string;
  artifactAddress: string;
  execArguments: TypedValue[];
  initArguments: TypedValue[];
};
export type Name = { name: string };
export type Type = { type: string };
type Context = { ctx: ParserRuleContext };

type Constants = Map<
  string,
  {
    value: string;
  } & Context &
    Type
>;

type Variables = Map<string, Type & Context>;

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

type Evaluate = {
  nodeId: string;
} & Context;

export class LatentState {
  public constants: Constants = new Map();

  public variables: Variables = new Map();

  public artifacts: Artifacts = new Map();

  public instances: Instances = new Map();

  public instancesById: InstancesById = new Map();

  public evaluateRelativeTo: Evaluate;
}
