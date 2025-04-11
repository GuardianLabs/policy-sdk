// note: this file mostly duplicates types located in packages/contratcs/src/typechain/**
import { AddressLike, BigNumberish, BytesLike } from 'ethers';

type InjectionMetadataStruct = { value: string; index: BigNumberish };

type SubstitutionArgumentStruct = {
  supplierNodeId: BytesLike; // bytes32 encoded constant value
  index: BigNumberish; // POSITION index in generic arguments list of particular node
};

type ConstantArgumentStruct = {
  value: BytesLike; // bytes encoded constant value
  index: BigNumberish; // POSITION index in generic arguments list of particular node
};

export type VariablesStruct = { nodeId: BytesLike; values: BytesLike[] };

export type NodeInitDataStruct = {
  id: BytesLike;
  initData: BytesLike;
  needsInitialization: boolean;
  artifactAddress: AddressLike;
  argsCount: BigNumberish;
  constantExecArgs: ConstantArgumentStruct[];
  substitutedExecArgs: SubstitutionArgumentStruct[];
  variableExecArgs: BigNumberish[];
  injections: InjectionMetadataStruct[];
};

type GraphInitParamsStruct = {
  rootNode: BytesLike;
  nodes: NodeInitDataStruct[];
};

export type OnchainPresentation = GraphInitParamsStruct;

export type NodeTreeInitData = NodeInitDataStruct;

// taken from 'packages/contracts/src/typechain/contracts/PolicyHandler.ts
type ExecVarsMetadataStructOutputBase = {
  nodeId: string;
  nodeIndex: bigint;
  artifactAddress: string;
  descriptions: ArgumentDescriptionStructOutput[];
  injections: StringAndIndexStructOutput[];
};

export type OnchainVariablesDescription = ExecVarsMetadataStructOutputBase;

type ArgumentDescriptionStructOutput = {
  name: string;
  typename: string;
};

export type StringAndIndexStructOutput = {
  value: string;
  index: bigint;
};
