import { HardhatNetworkForkingUserConfig } from 'hardhat/types';
import {
  DEVELOPMENT_CHAIN_ID,
  HARDHAT_MINING_AUTO,
  HARDHAT_MINING_INTERVAL,
  MNEMONIC,
  NetworkName,
  POLYGONSCAN_API_KEY,
} from '.';
import { Config } from './Config';
import {
  forkingParamsForNetwork,
  shouldFork,
} from './default-forking-params.contants';

export const developmentChainId = () =>
  Number(Config.getSafe(DEVELOPMENT_CHAIN_ID, '31337'));

export const forkingConfig = (networkName: NetworkName) => {
  let config: {
    forkingConfig: HardhatNetworkForkingUserConfig | undefined;
    chainId: number;
  } = { forkingConfig: undefined, chainId: developmentChainId() };

  if (shouldFork()) {
    config = forkingParamsForNetwork(networkName);
  }

  return config;
};

export const isAutoMiningEnabled = () =>
  Config.getSafe(HARDHAT_MINING_AUTO, undefined) !== 'false';

export const miningInterval = () =>
  isAutoMiningEnabled()
    ? undefined
    : Number(Config.getSafe(HARDHAT_MINING_INTERVAL, '3000'));

export const getMnemonic = () => {
  return Config.getSafe(MNEMONIC, '');
};

export const getEtherscanApiKey = () => {
  return Config.getSafe(POLYGONSCAN_API_KEY, '');
};
