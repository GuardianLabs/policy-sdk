import { Signer, ZeroAddress } from 'ethers';
import { ethers } from 'hardhat';
import { deployInstances } from '../hardhat-scripts/helpers';
import {
  KnownPolicyFactoriesType,
  PolicyDeployer,
  StaticPolicyDeployer,
} from '../src';
import { getKnownPolicyFactories } from '../src/policy-deployer/known-factories.config';
import { check, checkNotEqual } from './test-helpers';
import { GraphInitParamsStruct, TreeNodeInitParamsStruct } from './types';

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
  let policyAdminSigner: Signer;
  let policyAdmin: string;
  let policyFactoryAddress: string;
  let deployer: PolicyDeployer;

  before(async () => {
    [policyAdminSigner] = await ethers.getSigners();
    policyAdmin = await policyAdminSigner.getAddress();

    const { policyFactory } = await deployInstances(false);
    policyFactoryAddress = await policyFactory.getAddress();
    deployer = new PolicyDeployer(policyAdminSigner);

    // note: ok since hardhat does have correct values
    const chainId = (await policyAdminSigner.provider?.getNetwork())?.chainId!;

    deployer.addFactoryAddress(Number(chainId), policyFactoryAddress);
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
      // note: ok since hardhat does have correct values
      const chainId = (await policyAdminSigner.provider?.getNetwork())?.chainId;

      knownFactories = getKnownPolicyFactories();
      knownFactories[Number(chainId!)] = policyFactoryAddress;
    });

    it('should deploy policy instance', async () => {
      const policy = await StaticPolicyDeployer.deploy(
        policyAdminSigner,
        policyAdmin,
        knownFactories,
      );

      checkNotEqual(await policy.getAddress(), ZeroAddress);
      check(await policy.isAdmin(policyAdmin), true);
    });

    it('should deploy and configure policy instance', async () => {
      const policy = await StaticPolicyDeployer.deployAndConfigure(
        policyAdminSigner,
        policyAdmin,
        mockPolicyConfig,
        knownFactories,
      );

      checkNotEqual(await policy.getAddress(), ZeroAddress);
      check(await policy.isAdmin(policyAdmin), true);
    });
  });
});
