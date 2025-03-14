import {
  ALCHEMY_KEY,
  DEVELOPMENT_RPC,
  INFURA_KEY,
} from './config-key.constants';
import { Config } from './env-config-reader';
import { NetworkName } from './types';

const getInfuraKey = () => {
  return Config.getSafe(INFURA_KEY, '');
};

const getAlchemyKey = () => {
  return Config.getSafe(ALCHEMY_KEY, '');
};

const getInfuraRpc = (networkName: NetworkName): string => {
  const key = getInfuraKey();
  if (!key) return '';

  switch (networkName) {
    case NetworkName.baseMainnet:
      return `https://base-mainnet.infura.io/v3/${key}`;
    case NetworkName.baseSepolia:
      return `https://base-sepolia.infura.io/v3/${key}`;
    case NetworkName.polygon:
      return `https://polygon-mainnet.infura.io/v3/${key}`;
    case NetworkName.amoy:
      return `https://polygon-amoy.infura.io/v3/${key}`;
    default:
      return '';
  }
};

const getAlchemyRpc = (networkName: NetworkName): string => {
  const key = getAlchemyKey();
  if (!key) return '';

  switch (networkName) {
    case NetworkName.baseMainnet:
      return `https://base-mainnet.g.alchemy.com/v2/${key}`;
    case NetworkName.baseSepolia:
      return `https://base-sepolia.g.alchemy.com/v2/${key}`;
    case NetworkName.polygon:
      return `https://polygon-mainnet.g.alchemy.com/v2/${key}`;
    case NetworkName.amoy:
      return `https://polygon-amoy.g.alchemy.com/v2/${key}`;
    default:
      return '';
  }
};

const getPublicRpc = (networkName: NetworkName): string => {
  switch (networkName) {
    case NetworkName.baseMainnet:
      return `https://mainnet.base.org`;
    case NetworkName.baseSepolia:
      return `https://sepolia.base.org`;
    case NetworkName.polygon:
      return `https://polygon-rpc.com`;
    case NetworkName.amoy:
      return `https://rpc-amoy.polygon.technology`;
    default:
      return '';
  }

  // todo: verify url is reachable
};

export const getBlockchainNodeRpcUri = (networkName: NetworkName): string => {
  const url =
    getAlchemyRpc(networkName) ||
    getInfuraRpc(networkName) ||
    getPublicRpc(networkName);

  if (!url) {
    throw new TypeError(`Network url for "${networkName}" must be configured`);
  }

  return url;
};

export const getDevelopmentNodeRpcUri = () =>
  Config.getSafe(DEVELOPMENT_RPC, 'http://127.0.0.1:8545');
