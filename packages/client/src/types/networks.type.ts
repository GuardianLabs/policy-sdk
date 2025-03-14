export enum SupportedNetworkNameEnum {
  amoy = 'amoy',
  polygon = 'polygon',
  baseMainnet = 'base-mainnet',
  baseSepolia = 'base-sepolia',
  redbellyMainnet = 'redbelly-mainnet',
  redbellyTestnet = 'redbelly-testnet',
}

export enum SupportedNetworkIdEnum {
  amoy = 80002,
  polygon = 137,
  baseMainnet = 8453,
  baseSepolia = 84532,
  redbellyMainnet = 151,
  redbellyTestnet = 153,
}

// type ParseInt<T> = T extends `${infer N extends number}` ? N : never

type FactoryAddress = string;

// when deployed all instances apply:
// export type KnownPolicyFactoriesType = { [chainId in AllowedChainID]: FactoryAddress };
export type KnownPolicyFactoriesType = {
  [chainId: number]: FactoryAddress | undefined;
};

// type AllowedNetworkName = `${SupportedNetworkNameEnum}`

// type AllowedChainID = ParseInt<`${SupportedNetworkIdEnum}`>
