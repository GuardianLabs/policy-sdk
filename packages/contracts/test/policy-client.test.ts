import { OnchainPresentation } from '@guardian-network/shared/src/types/contracts.types';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { Wallet } from 'ethers';
import { ethers } from 'hardhat';
import { PolicyClientBuildable } from '../src/client';
import { CalculatedFeeProvider } from '../src/client/fee-provider';
import { IPolicyClient } from '../src/client/interfaces';
import { PolicyDeployer } from '../src/client/policy-deployer';
import { MockedExecParams } from './mocked-init-exec-arguments';
import { policy } from './templates';
import { check } from './test-helpers';
import {
  AND,
  EqualString,
  LacLangCompiler,
  PolicyFactory__factory,
  PolicyHandler,
  PolicyHandler__factory,
  XOR,
} from './types';
import { deployArtifacts } from './utils';

describe('Policy: client usage', () => {
  let client: IPolicyClient;
  let policyHandler: PolicyHandler;
  let adminSigner: SignerWithAddress;
  let deployerAddress: string;
  let policyDeployer: PolicyDeployer;

  // logical
  let andArtifact: AND;
  let xorArtifact: XOR;
  // comparison
  let equalStringsArtifact: EqualString;

  before(async () => {
    [adminSigner] = await ethers.getSigners();
    const artifactsDeployer = new Wallet(
      '0x2074744ee14645fee95cf9b64c6f2dff357554a35e05f2b34f5acb1e28d94ce0',
      adminSigner.provider,
    );
    await adminSigner.sendTransaction({
      to: artifactsDeployer.address,
      value: ethers.parseEther('1.0'),
    });

    const AtomicDeployerFactory = new PolicyFactory__factory(adminSigner);
    const atomicDeployer = await AtomicDeployerFactory.deploy();
    await atomicDeployer.waitForDeployment();
    deployerAddress = await atomicDeployer.getAddress();

    policyDeployer = new PolicyDeployer(adminSigner);

    const chainId = (await adminSigner.provider?.getNetwork())?.chainId;
    policyDeployer.addFactoryAddress(Number(chainId!), deployerAddress);

    ({
      and: andArtifact,
      xor: xorArtifact,
      equalString: equalStringsArtifact,
    } = await deployArtifacts(artifactsDeployer));

    const gatewayDeployer = new PolicyHandler__factory(adminSigner);

    policyHandler = await gatewayDeployer.deploy(adminSigner.address);
    policyHandler.waitForDeployment();
  });

  describe('One artifact, built client', () => {
    let dsl: string;

    before(async () => {
      client = await PolicyClientBuildable.buildEmptyPolicy(
        adminSigner,
        CalculatedFeeProvider.fromDefaultProvider(adminSigner.provider),
        policyDeployer,
      );

      dsl =
        policy.simple.one_artifact.one_variable.one_constant.zero_substitutions.xor(
          await xorArtifact.getAddress(),
        );
    });

    it('simple policy with one artifcat: validated dsl', async () => {
      const compiler = LacLangCompiler.fromSources(dsl, {
        provider: adminSigner.provider,
        checkTypesAgainstDslDeclarations: true,
      });
      const compilerOutput = await compiler.compile();

      await client.initialize(compilerOutput);

      const execTrue = MockedExecParams.withNormalizedArgs().add(true);

      let evaluationResult = await client.evaluate([
        {
          nodeId: compilerOutput.rootNode,
          values: execTrue.params,
        },
      ]);

      check(evaluationResult, true);

      const execFalse = MockedExecParams.withNormalizedArgs().add(false);

      evaluationResult = await client.evaluate([
        {
          nodeId: compilerOutput.rootNode,
          values: execFalse.params,
        },
      ]);

      check(evaluationResult, false);
    });

    it('simple policy with one artifcat: dry run', async () => {
      const compiler = LacLangCompiler.fromSources(dsl, {
        provider: adminSigner.provider,
        checkTypesAgainstDslDeclarations: true,
      });
      const compilerOutput = await compiler.compile();

      const execTrue = MockedExecParams.withNormalizedArgs().add(true);

      let evaluationResult = await client.evaluateDryRun([
        {
          nodeId: compilerOutput.rootNode,
          values: execTrue.params,
        },
      ]);

      check(evaluationResult, true);

      const execFalse = MockedExecParams.withNormalizedArgs().add(false);

      evaluationResult = await client.evaluateDryRun([
        {
          nodeId: compilerOutput.rootNode,
          values: execFalse.params,
        },
      ]);

      check(evaluationResult, false);
    });

    it('updated simple policy', async () => {
      // First compile and initialize with XOR policy
      const compiler = LacLangCompiler.fromSources(dsl, {
        provider: adminSigner.provider,
        checkTypesAgainstDslDeclarations: true,
      });
      const initialCompilerOutput = await compiler.compile();

      // Verify initial XOR policy works
      const execTrue = MockedExecParams.withNormalizedArgs().add(true);
      let evaluationResult = await client.evaluate([
        {
          nodeId: initialCompilerOutput.rootNode,
          values: execTrue.params,
        },
      ]);
      check(evaluationResult, true);

      // Create new AND policy
      const newDsl =
        policy.simple.one_artifact.one_variable.one_constant.zero_substitutions.and(
          await andArtifact.getAddress(),
        );
      const newCompiler = LacLangCompiler.fromSources(newDsl, {
        provider: adminSigner.provider,
        checkTypesAgainstDslDeclarations: true,
      });
      const newCompilerOutput = await newCompiler.compile();

      // Reset policy to new AND policy
      await client.reset(newCompilerOutput);

      // Verify new AND policy works
      evaluationResult = await client.evaluate([
        {
          nodeId: newCompilerOutput.rootNode,
          values: execTrue.params,
        },
      ]);
      check(evaluationResult, false);

      const execFalse = MockedExecParams.withNormalizedArgs().add(false);
      evaluationResult = await client.evaluate([
        {
          nodeId: newCompilerOutput.rootNode,
          values: execFalse.params,
        },
      ]);
      check(evaluationResult, false);
    });

    it('returns correct variables list for simple policy', async () => {
      const variables = await client.getVariablesList();

      expect(variables).to.have.lengthOf(1);

      expect(variables[0]).to.deep.equal({
        nodeId:
          '0xf965718370c6477549b29a1494cbbb3b5696c08ad59de12d19e67c640f442e31',
        nodeIndex: '0',
        artifactAddress: '0x108c4bb13fE6743575BDa3d5B53D746a2a77F952',
        variables: [['argB', 'bool']],
        injections: [],
      });
    });
  });

  describe('Two artifacts, connected client', () => {
    let dsl: string;
    let compiler: LacLangCompiler;
    let compilerOutput: OnchainPresentation;

    beforeEach(async () => {
      // note: client with no state for policy (artifacts graph) yet; necessary for each test case
      client = await PolicyClientBuildable.buildEmptyPolicy(
        adminSigner,
        CalculatedFeeProvider.fromDefaultProvider(adminSigner.provider),
        policyDeployer,
      );

      dsl =
        policy.simple.two_artifacts.one_variable.one_constant.one_substitution.and(
          await andArtifact.getAddress(),
          await equalStringsArtifact.getAddress(),
        );
      compiler = LacLangCompiler.fromSources(dsl, {
        provider: adminSigner.provider,
        checkTypesAgainstDslDeclarations: true,
      });

      compilerOutput = await compiler.compile();
    });

    it('simple policy with two artifcats: validated dsl', async () => {
      await client.initialize(compilerOutput);

      let evaluationResult = await client.evaluate([
        {
          nodeId: compilerOutput.nodes[0].id,
          values:
            MockedExecParams.withNormalizedArgs().add("I'm an input").params,
        },
        {
          nodeId: compilerOutput.nodes[1].id,
          values: [],
        },
      ]);

      check(evaluationResult, true);

      evaluationResult = await client.evaluate([
        {
          nodeId: compilerOutput.nodes[0].id,
          values:
            MockedExecParams.withNormalizedArgs().add('lol not me').params,
        },
        {
          nodeId: compilerOutput.nodes[1].id,
          values: [],
        },
      ]);

      check(evaluationResult, false);
    });

    it('simple policy with two artifcats: double initialization', async () => {
      // note: when specific compiler configureation required
      // const compiler = LacLangCompiler.fromSources(dsl, {
      //   provider: adminSigner.provider,
      //   checkTypesAgainstDslDeclarations: true,
      // });
      // const compilerOutput = await compiler.compile();

      await client.initialize(compilerOutput);

      await client
        .initialize(compilerOutput)
        .then(() => {
          expect.fail('Was not expected to resolve');
        })
        .catch((err: Error) => expect(err.message).to.contain.oneOf(['T-004']));
    });

    it('throws when connecting with incorrect admin', async () => {
      const policyAddress = await client.getPolicyAddress();

      // Create new signer that is not the admin
      const [_, nonAdminSigner] = await ethers.getSigners();

      // Attempt to build client with non-admin signer - should fail
      await PolicyClientBuildable.buildFromPolicyInstance(
        policyAddress,
        nonAdminSigner,
        CalculatedFeeProvider.fromDefaultProvider(nonAdminSigner.provider),
      )
        .then(() => {
          expect.fail('Was not expected to resolve');
        })
        .catch((err: Error) => {
          console.log('dfdd', err.message);
          expect(err.message)
            .to.to.be.a('string')
            .and.to.satisfy((m: string) =>
              m.includes('Signer is not an admin for policy'),
            );
        });
    });

    it('throws when insufficient balance for deployment', async () => {
      // note: Create new signer with 0 balance
      const emptyWallet = ethers.Wallet.createRandom().connect(ethers.provider);
      const policyDeployer = new PolicyDeployer(emptyWallet);

      const chainId = (await adminSigner.provider?.getNetwork())?.chainId;
      policyDeployer.addFactoryAddress(Number(chainId!), deployerAddress);

      // note: Attempt to build client with zero-balance signer
      await PolicyClientBuildable.buildEmptyPolicy(
        emptyWallet,
        CalculatedFeeProvider.fromDefaultProvider(ethers.provider),
        policyDeployer,
      )
        .then(() => {
          expect.fail('Was not expected to resolve');
        })
        // todo: fix
        .catch((err: Error) => {
          // expect(err.message).to.match(
          // /^Client failed with error: "Address 0x[a-fA-F0-9]{40} has insuffisient balance/,
          expect(err.message).to.contain(
            "Sender doesn't have enough funds to send tx", // tmp
          );
        });
    });
  });
});
