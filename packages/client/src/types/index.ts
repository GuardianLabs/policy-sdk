export * from './networks.type';

export type FeeDataEip1559 = {
  maxPriorityFeePerGas: bigint;
  maxFeePerGas: bigint;
  baseFee: bigint;
};
