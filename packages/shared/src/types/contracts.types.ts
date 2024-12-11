// note: this file mostly duplicates types located in packages/contratcs/src/typechain/**
import { AddressLike, BigNumberish, BytesLike } from 'ethers';

type StringAndIndexStruct = { value: string; index: BigNumberish };

type Bytes32AndIndexStruct = { value: BytesLike; index: BigNumberish };

type BytesAndIndexStruct = Bytes32AndIndexStruct;

export type VariablesStruct = { nodeId: BytesLike; values: BytesLike[] };

export type TreeNodeInitParamsStruct = {
  id: BytesLike;
  artifactAddress: AddressLike;
  argsCount: BigNumberish;
  partialExecData: BytesAndIndexStruct[];
  variables: BigNumberish[];
  injections: StringAndIndexStruct[];
  substitutions: Bytes32AndIndexStruct[];
  initData: BytesLike;
  needsInitialization: boolean;
};

type GraphInitParamsStruct = {
  rootNode: BytesLike;
  nodes: TreeNodeInitParamsStruct[];
};

export type OnchainPresentation = GraphInitParamsStruct;

export type NodeTreeInitData = TreeNodeInitParamsStruct;

// taken from 'packages/contracts/src/typechain/contracts/ArtifactsGraph.ts
type NamedTypedVariablesStructOutputBase = {
  nodeId: string;
  nodeIndex: bigint;
  artifactAddress: string;
  variables: ArgumentStructOutput[];
  injections: StringAndIndexStructOutput[];
};

export type OnchainVariablesDescription = NamedTypedVariablesStructOutputBase;

export type ArgumentStructOutput = {
  name: string;
  typename: string;
};

export type StringAndIndexStructOutput = {
  value: string;
  index: bigint;
};
