export type FeeDataEip1559 = {
  maxPriorityFeePerGas: bigint;
  maxFeePerGas: bigint;
  baseFee: bigint;
};

export type KnownPolicyFactoriesType = { [chainId: number]: string };
