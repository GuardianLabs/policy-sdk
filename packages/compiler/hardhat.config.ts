import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-deploy';
import { HardhatUserConfig } from 'hardhat/config';
import { Config } from './env-config-reader/Config';

const MAX_ACCOUNT_NUMBER = 16;
const DEPLOY_SCRIPTS_PATH = 'deploy-configuration/';
const DEFAULT_BALANCE_PER_ADDRESS = '161000000000000000000';
const DEFAULT_DEPLOY_SCRIPTS_PATH = 'deploy';

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
      deploy: [DEPLOY_SCRIPTS_PATH], // overriding default-deploy-scripts path
      saveDeployments: false,
    },
  },
  paths: {
    deploy: DEFAULT_DEPLOY_SCRIPTS_PATH,
    deployments: 'deployed_contracts',
    imports: 'imports',
    tests: 'test',
  },
};

export default config;
