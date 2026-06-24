import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-toolbox';
import { HardhatUserConfig } from 'hardhat/config';
import { Config } from './env-config-reader/Config';

const MAX_ACCOUNT_NUMBER = 16;
const DEFAULT_BALANCE_PER_ADDRESS = '161000000000000000000';

export const getMnemonic = () => {
  return Config.getSafe('MNEMONIC', '');
};

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.27',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      gasPrice: 'auto',
      allowUnlimitedContractSize: true,
      accounts: {
        mnemonic: getMnemonic(),
        count: MAX_ACCOUNT_NUMBER,
        accountsBalance: DEFAULT_BALANCE_PER_ADDRESS,
      },
    },
  },
  paths: {
    tests: 'test',
  },
};

export default config;
