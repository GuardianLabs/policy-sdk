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

const getInfuraRpc = (networkName: NetworkName) => {
  const key = getInfuraKey();
  if (!key) return '';

  switch (networkName) {
    case 'polygon':
      return `https://polygon-mainnet.infura.io/v3/${key}`;
    case 'amoy':
      return `https://polygon-amoy.infura.io/v3/${key}`;
    default:
      throw new TypeError(`Wrong network`);
  }
};

const getAlchemyRpc = (networkName: NetworkName) => {
  const key = getAlchemyKey();
  if (!key) return '';

  switch (networkName) {
    case 'polygon':
      return `https://polygon-mainnet.g.alchemy.com/v2/${key}`;
    case 'amoy':
      return `https://polygon-amoy.g.alchemy.com/v2/${key}`;
    default:
      throw new TypeError(`Wrong network`);
  }
};

export const getDevelopmentNodeRpcUri = () =>
  Config.getSafe(DEVELOPMENT_RPC, 'http://127.0.0.1:8545');

export const getBlockchainNodeRpcUri = (networkName: NetworkName) => {
  return getAlchemyRpc(networkName) || getInfuraRpc(networkName);
};
