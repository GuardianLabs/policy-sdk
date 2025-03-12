import { HardhatNetworkForkingUserConfig } from 'hardhat/types';
import { IS_NETWORK_FORKING_ENABLED } from './config-key.constants';
import { Config } from './env-config-reader';
import { getBlockchainNodeRpcUri } from './rpc-config-params';
import { NetworkName } from './types';

export const DEFAULT_LOCAL_NETWORK_ID = '31337';

type ForkingConfig = {
  networkName: NetworkName;
  blockNumber?: number;
  chainId: number;
};

const defaultAmoyForkingParams = (): ForkingConfig => {
  return {
    networkName: NetworkName.amoy,
    blockNumber: 12_728_583,
    chainId: 80002,
  };
};

const defaultPolygonForkingParams = (): ForkingConfig => {
  return {
    networkName: NetworkName.polygon,
    blockNumber: 62_583_180,
    chainId: 137,
  };
};

export const shouldFork = (): boolean => {
  const result = Config.getSafe(IS_NETWORK_FORKING_ENABLED, 'false');
  return result === 'true';
};

export const forkingParamsForNetwork = (networkName: NetworkName) => {
  let config: {
    forkingConfig: HardhatNetworkForkingUserConfig | undefined;
    chainId: number;
  };

  if (networkName === NetworkName.amoy) {
    const { blockNumber, chainId } = defaultAmoyForkingParams();
    const forkingConfig: HardhatNetworkForkingUserConfig = {
      blockNumber,
      url: getBlockchainNodeRpcUri(networkName),
    };

    config = { forkingConfig, chainId };
  } else if (networkName === NetworkName.polygon) {
    const { blockNumber, chainId } = defaultPolygonForkingParams();
    const forkingConfig: HardhatNetworkForkingUserConfig = {
      blockNumber,
      url: getBlockchainNodeRpcUri(networkName),
    };

    config = { forkingConfig, chainId };
  } else {
    throw new Error(`Network ${networkName} does not provide forkin config`);
  }

  return config;
};
