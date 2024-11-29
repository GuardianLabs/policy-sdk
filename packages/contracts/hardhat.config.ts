import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-contract-sizer';
import 'hardhat-deploy';
import { HardhatUserConfig } from 'hardhat/config';
import {
  developmentChainId,
  forkingConfig,
  getBlockchainNodeRpcUri,
  getDevelopmentNodeRpcUri,
  getEtherscanApiKey,
  getMnemonic,
  isAutoMiningEnabled,
  miningInterval,
  NetworkName,
  REPORT_GAS,
} from './config-hardhat';
import { Config } from './config-hardhat/env-config-reader';
import "@nomicfoundation/hardhat-ignition-ethers";

const MAX_ACCOUNT_NUMBER = 16;
const DEPLOY_SCRIPTS_PATH = 'deploy-configuration/';
const DEFAULT_BALANCE_PER_ADDRESS = '161000000000000000000';
const DEFAULT_DEPLOY_SCRIPTS_PATH = 'deploy';

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
      forking: forkingConfig(NetworkName.amoy).forkingConfig,
      accounts: {
        mnemonic: getMnemonic(),
        count: MAX_ACCOUNT_NUMBER,
        accountsBalance: DEFAULT_BALANCE_PER_ADDRESS,
      },
      deploy: [DEPLOY_SCRIPTS_PATH], // overriding default-deploy-scripts path
      saveDeployments: false,
      chainId: forkingConfig(NetworkName.amoy).chainId,
      mining: {
        auto: isAutoMiningEnabled(),
        interval: miningInterval(),
      },
    },
    development: {
      url: getDevelopmentNodeRpcUri(),
      live: false,
      saveDeployments: true,
      deploy: [DEPLOY_SCRIPTS_PATH],
      chainId: developmentChainId(),
    },
    [NetworkName.amoy]: {
      chainId: 80002,
      accounts: {
        mnemonic: getMnemonic(),
        count: MAX_ACCOUNT_NUMBER, // 0xc59701e997346f7316cf95eeff5cb0848a41c356
      },
      url: getBlockchainNodeRpcUri(NetworkName.amoy),
      live: true,
      deploy: [DEPLOY_SCRIPTS_PATH],
      saveDeployments: true,
    },
    [NetworkName.polygon]: {
      chainId: 137,
      accounts: {
        mnemonic: getMnemonic(),
        count: MAX_ACCOUNT_NUMBER,
      },
      url: getBlockchainNodeRpcUri(NetworkName.polygon),
      live: true,
      deploy: [DEPLOY_SCRIPTS_PATH],
      saveDeployments: true,
    },
  },
  paths: {
    deploy: DEFAULT_DEPLOY_SCRIPTS_PATH,
    deployments: 'deployed_contracts',
    imports: 'imports',
    tests: 'test',
  },
  etherscan: {
    apiKey: getEtherscanApiKey(),
  },
  typechain: {
    outDir: 'src/typechain',
    target: 'ethers-v6',
  },
  gasReporter: {
    enabled: Config.isSet(REPORT_GAS),
    currency: 'USD',
    showTimeSpent: true,
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: true,
    runOnCompile: true,
    only: [
      ':AND$',
      ':OR$',
      ':XOR$',
      ':NOT$' /* , 'BusinessHoursValidation$' */,
    ],
    strict: false,
  },
};

export default config;
