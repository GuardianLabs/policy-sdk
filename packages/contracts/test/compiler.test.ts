import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { MockedExecParams } from './mocked-init-exec-arguments';
import { policy } from './templates';
import { check } from './test-helpers';
import {
  AND,
  EqualString,
  LacLangCompiler,
  PolicyHandler,
  PolicyHandler__factory,
  XOR,
} from './types';
import { deployArtifacts } from './utils';
import { decodeEvaluationResult } from './utils/decode';

describe('Policy: compilation with predefined artifacts', () => {
  let adminSigner: SignerWithAddress;

  // logical
  let andArtifact: AND;
  let xorArtifact: XOR;
  // comparison
  let equalStringsArtifact: EqualString;

  // entrypoint
  let policyHandler: PolicyHandler;

  before(async () => {
    [adminSigner] = await ethers.getSigners();

    const { and, xor, gteUint, lteUint, gtUint, equalString } =
      await deployArtifacts(adminSigner);

    andArtifact = and;
    xorArtifact = xor;
    equalStringsArtifact = equalString;

    const gatewayDeployer = new PolicyHandler__factory(adminSigner);

    policyHandler = await gatewayDeployer.deploy(adminSigner.address);
    policyHandler.waitForDeployment();
  });

  describe('One artifact', () => {
    let dsl: string;

    before(async () => {
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
      await policyHandler.set(compilerOutput);

      const execTrue = MockedExecParams.withNormalizedArgs().add(true);

      let tx = policyHandler.evaluate([
        {
          nodeId: compilerOutput.rootNode,
          values: execTrue.params,
        },
      ]);

      await expect(tx)
        .to.emit(policyHandler, 'Evaluated')
        .withArgs(true, compilerOutput.rootNode);

      const execFalse = MockedExecParams.withNormalizedArgs().add(false);

      tx = policyHandler.evaluate([
        {
          nodeId: compilerOutput.rootNode,
          values: execFalse.params,
        },
      ]);

      await expect(tx)
        .to.emit(policyHandler, 'Evaluated')
        .withArgs(false, compilerOutput.rootNode);
    });

    it('simple policy with one artifcat: validated onchain', async () => {
      const compiler = LacLangCompiler.fromSources(dsl, {
        provider: adminSigner.provider,
        checkTypesAgainstOnchainDescriptors: true,
      });

      const compilerOutput = await compiler.compile();
      await policyHandler.reset(compilerOutput);

      const execTrue = MockedExecParams.withNormalizedArgs().add(true);

      let tx = await policyHandler.evaluate([
        {
          nodeId: compilerOutput.rootNode,
          values: execTrue.params,
        },
      ]);

      let evaluationResult = await decodeEvaluationResult(tx);

      check(evaluationResult, true);

      const execFalse = MockedExecParams.withNormalizedArgs().add(false);

      tx = await policyHandler.evaluate([
        {
          nodeId: compilerOutput.rootNode,
          values: execFalse.params,
        },
      ]);

      evaluationResult = await decodeEvaluationResult(tx);

      check(evaluationResult, false);
    });

    it('simple policy with one artifcat: unvalidated', async () => {
      const compiler = LacLangCompiler.fromSources(dsl);

      const compilerOutput = await compiler.compile();
      await policyHandler.reset(compilerOutput);

      const execTrue = MockedExecParams.withNormalizedArgs().add(true);

      let tx = policyHandler.evaluate([
        {
          nodeId: compilerOutput.rootNode,
          values: execTrue.params,
        },
      ]);

      await expect(tx)
        .to.emit(policyHandler, 'Evaluated')
        .withArgs(true, compilerOutput.rootNode);

      const execFalse = MockedExecParams.withNormalizedArgs().add(false);

      tx = policyHandler.evaluate([
        {
          nodeId: compilerOutput.rootNode,
          values: execFalse.params,
        },
      ]);

      await expect(tx)
        .to.emit(policyHandler, 'Evaluated')
        .withArgs(false, compilerOutput.rootNode);
    });
  });

  describe('Two artifacts', () => {
    let dsl: string;

    before(async () => {
      dsl =
        policy.simple.two_artifacts.one_variable.one_constant.one_substitution.and(
          await andArtifact.getAddress(),
          await equalStringsArtifact.getAddress(),
        );
    });

    it('simple policy with two artifcats: validated dsl', async () => {
      const compiler = LacLangCompiler.fromSources(dsl, {
        provider: adminSigner.provider,
        checkTypesAgainstDslDeclarations: true,
      });

      const compilerOutput = await compiler.compile();
      await policyHandler.reset(compilerOutput);

      let tx = await policyHandler.evaluate([
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

      let evaluationResult = await decodeEvaluationResult(tx);

      check(evaluationResult, true);

      tx = await policyHandler.evaluate([
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

      evaluationResult = await decodeEvaluationResult(tx);

      check(evaluationResult, false);
    });

    it('simple policy with two artifcats: validated onchain', async () => {
      const compiler = LacLangCompiler.fromSources(dsl, {
        provider: adminSigner.provider,
        checkTypesAgainstOnchainDescriptors: true,
      });

      const compilerOutput = await compiler.compile();
      await policyHandler.reset(compilerOutput);

      let tx = await policyHandler.evaluate([
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

      let evaluationResult = await decodeEvaluationResult(tx);

      check(evaluationResult, true);

      tx = await policyHandler.evaluate([
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

      evaluationResult = await decodeEvaluationResult(tx);

      check(evaluationResult, false);
    });

    it('simple policy with two artifcats: unvalidated', async () => {
      const compiler = LacLangCompiler.fromSources(dsl);

      const compilerOutput = await compiler.compile();
      await policyHandler.reset(compilerOutput);

      let tx = await policyHandler.evaluate([
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

      let evaluationResult = await decodeEvaluationResult(tx);

      check(evaluationResult, true);

      tx = await policyHandler.evaluate([
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

      evaluationResult = await decodeEvaluationResult(tx);

      check(evaluationResult, false);
    });
  });
});
