import { Signer, ZeroAddress } from 'ethers';
import { ethers } from 'hardhat';
import {
  GraphInitParamsStruct,
  PolicyFactory__factory,
  TreeNodeInitParamsStruct,
} from '../src';
import { getKnownPolicyFactories } from '../src/client/policy-deployer/known-factories.config';
import { PolicyDeployer } from '../src/client/policy-deployer/PolicyDeployer';
import { StaticPolicyDeployer } from '../src/client/policy-deployer/StaticPolicyDeployer';
import { KnownPolicyFactoriesType } from '../src/client/types';
import { check, checkNotEqual } from './test-helpers';

const mockedNode: TreeNodeInitParamsStruct = {
  id: '0x0000000000000000000000000000000000000000000000000000000000000001',
  artifactAddress: '0x0000000000000000000000000000000000000002',
  argsCount: 0,
  partialExecData: [],
  variables: [],
  injections: [],
  substitutions: [],
  initData: '0x',
  needsInitialization: false,
};

// Setup mock policy config
const mockPolicyConfig: GraphInitParamsStruct = {
  nodes: [mockedNode],
  rootNode:
    '0x0000000000000000000000000000000000000000000000000000000000000001',
};

describe('Policy Deployer', () => {
  let signer: Signer;
  let policyAdmin: string;
  let deployerAddress: string;
  let deployer: PolicyDeployer;

  before(async () => {
    [signer] = await ethers.getSigners();
    policyAdmin = await signer.getAddress();

    const DeployerFactory = new PolicyFactory__factory(signer);
    const policyFactory = await DeployerFactory.deploy();
    await policyFactory.waitForDeployment();
    deployerAddress = await policyFactory.getAddress();

    deployer = new PolicyDeployer(signer);

    const chainId = (await signer.provider?.getNetwork())?.chainId;
    deployer.addFactoryAddress(Number(chainId!), deployerAddress);
  });

  describe('Instance Deployer Methods', () => {
    it('should deploy policy instance', async () => {
      const policy = await deployer.deployPolicy(policyAdmin);

      checkNotEqual(await policy.getAddress(), ZeroAddress);
      check(await policy.isAdmin(policyAdmin), true);
    });

    it('should deploy and configure policy instance', async () => {
      const policy = await deployer.deployAndConfigure(
        policyAdmin,
        mockPolicyConfig,
      );

      checkNotEqual(await policy.getAddress(), ZeroAddress);
      check(await policy.isAdmin(policyAdmin), true);
    });
  });

  describe('Static Deployer Methods', () => {
    let knownFactories: KnownPolicyFactoriesType;

    before(async () => {
      const chainId = (await signer.provider?.getNetwork())?.chainId;
      knownFactories = getKnownPolicyFactories();
      knownFactories[Number(chainId!)] = deployerAddress;
    });

    it('should deploy policy instance', async () => {
      const policy = await StaticPolicyDeployer.deploy(
        signer,
        policyAdmin,
        knownFactories,
      );

      checkNotEqual(await policy.getAddress(), ZeroAddress);
      check(await policy.isAdmin(policyAdmin), true);
    });

    it('should deploy and configure policy instance', async () => {
      const policy = await StaticPolicyDeployer.deployAndConfigure(
        signer,
        policyAdmin,
        mockPolicyConfig,
        knownFactories,
      );

      checkNotEqual(await policy.getAddress(), ZeroAddress);
      check(await policy.isAdmin(policyAdmin), true);
    });
  });
});
