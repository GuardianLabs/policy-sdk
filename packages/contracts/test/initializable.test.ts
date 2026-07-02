import { defaultAbiCoder } from '@guardian-network/shared';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/internal/withArgs';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  InitParamsStruct,
  PolicyHandlerInitializable,
} from '../src/typechain/contracts/sdk/PolicyHandlerInitializable';
import { check } from './test-helpers';
import { findMatchingEventArgs } from './test-helpers/events-helper';
import { getId } from './test-helpers/random-helper';
import {
  CloneFactory__factory,
  EqualUint__factory,
  NodeInitDataStruct,
  PolicyHandlerInitializable__factory,
} from './types';

describe('PolicyHandler (Initializable) flow', () => {
  let policy: PolicyHandlerInitializable;
  let deployer: SignerWithAddress;
  let admin: SignerWithAddress;

  before(async () => {
    [deployer, admin] = await ethers.getSigners();

    // note: step 1. deploy implementation policy at some address
    const PolicyFactory = new PolicyHandlerInitializable__factory(deployer);
    const implementation = await PolicyFactory.deploy();
    await implementation.waitForDeployment();

    // note: step 2. make clone from implementation address via Clone-Factory contract
    const CloneFactoryFactory = new CloneFactory__factory(deployer);
    const factoryInstance = await CloneFactoryFactory.deploy();
    await factoryInstance.waitForDeployment();

    const tx = await factoryInstance.clone(implementation);
    await expect(tx).to.emit(factoryInstance, 'Cloned').withArgs(anyValue);

    // note: considering 'expect', the event is definitelly emitted
    const receipt = (await ethers.provider.getTransactionReceipt(tx.hash))!;

    const [clonedInstanceAddress] = findMatchingEventArgs(
      factoryInstance.interface,
      factoryInstance.getEvent('Cloned').getFragment(),
      receipt.logs,
    );

    policy = PolicyHandlerInitializable__factory.connect(
      clonedInstanceAddress,
      admin,
    );
  });

  it('step 1: call on uninitialized contract', async () => {
    await expect(policy.getVariablesList()).to.be.revertedWith('T-005');

    const emptyParams: InitParamsStruct = {
      nodes: [],
      rootNode: ethers.ZeroHash,
    };
    await expect(policy.set(emptyParams)).to.be.revertedWith('Not initialized');
  });

  it('step 2: initialize policy contract with minimal one-node policy', async () => {
    await policy.initialize(admin.address);

    await expect(policy.initialize(admin.address)).to.be.revertedWith(
      'Already initialized',
    );
    check(await policy.isAdmin(admin.address), true);

    // note: deploy simplest stateless artifact (EqualUint)
    const equalUint = await new EqualUint__factory(admin).deploy();
    await equalUint.waitForDeployment();

    const nodeId = ethers.id(getId());
    const value = 7n;
    const encoded = defaultAbiCoder.encode(['uint256'], [value]);

    const nodes: NodeInitDataStruct[] = [
      {
        id: nodeId,
        initData: '0x',
        needsInitialization: false,
        artifactAddress: await equalUint.getAddress(),
        argsCount: 2n,
        substitutedExecArgs: [],
        constantExecArgs: [
          { value: encoded, index: 0n },
          { value: encoded, index: 1n },
        ],
        variableExecArgs: [],
        injections: [],
      },
    ];

    const params: InitParamsStruct = {
      nodes,
      rootNode: nodeId,
    };

    await policy.set(params);

    const vars = await policy.getVariablesList();
    check(vars.length, 0);

    const tx = policy.evaluate([]);
    await expect(tx).to.emit(policy, 'Evaluated').withArgs(true, nodeId);
  });
});
