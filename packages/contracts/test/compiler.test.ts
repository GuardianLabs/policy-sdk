import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { policy } from './templates';
import { check } from './test-helpers';
import {
  AND,
  ArtifactsGraph,
  ArtifactsGraph__factory,
  EqualString,
  LacLangCompiler,
  XOR,
} from './types';
import { deployArtifacts } from './utils';
import { decodeEvaluationResult } from './utils/decode';
import { MockedExecParams } from './utils/init-exec-arguments';

describe('Policy: compilation with predefined artifacts', () => {
  let adminSigner: SignerWithAddress;

  // logical
  let andArtifact: AND;
  let xorArtifact: XOR;
  // comparison
  let equalStringsArtifact: EqualString;

  // entrypoint
  let gateway: ArtifactsGraph;

  before(async () => {
    [adminSigner] = await ethers.getSigners();

    const { and, xor, gteUint, lteUint, gtUint, equalString } =
      await deployArtifacts(adminSigner);

    andArtifact = and;
    xorArtifact = xor;
    equalStringsArtifact = equalString;

    const gatewayDeployer = new ArtifactsGraph__factory(adminSigner);

    gateway = await gatewayDeployer.deploy(adminSigner.address);
    gateway.waitForDeployment();
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
      await gateway.initGraph(compilerOutput);

      const execTrue = MockedExecParams.withNormalizedArgs().add(true);

      let tx = gateway.evaluateGraph([
        {
          nodeId: compilerOutput.rootNode,
          values: execTrue.params,
        },
      ]);

      await expect(tx)
        .to.emit(gateway, 'Evaluated')
        .withArgs(true, compilerOutput.rootNode);

      const execFalse = MockedExecParams.withNormalizedArgs().add(false);

      tx = gateway.evaluateGraph([
        {
          nodeId: compilerOutput.rootNode,
          values: execFalse.params,
        },
      ]);

      await expect(tx)
        .to.emit(gateway, 'Evaluated')
        .withArgs(false, compilerOutput.rootNode);
    });

    it('simple policy with one artifcat: validated onchain', async () => {
      const compiler = LacLangCompiler.fromSources(dsl, {
        provider: adminSigner.provider,
        checkTypesAgainstOnchainDescriptors: true,
      });

      const compilerOutput = await compiler.compile();
      await gateway.initGraph(compilerOutput);

      const execTrue = MockedExecParams.withNormalizedArgs().add(true);

      let tx = await gateway.evaluateGraph([
        {
          nodeId: compilerOutput.rootNode,
          values: execTrue.params,
        },
      ]);

      let evaluationResult = await decodeEvaluationResult(tx);

      check(evaluationResult, true);

      const execFalse = MockedExecParams.withNormalizedArgs().add(false);

      tx = await gateway.evaluateGraph([
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
      await gateway.initGraph(compilerOutput);

      const execTrue = MockedExecParams.withNormalizedArgs().add(true);

      let tx = gateway.evaluateGraph([
        {
          nodeId: compilerOutput.rootNode,
          values: execTrue.params,
        },
      ]);

      await expect(tx)
        .to.emit(gateway, 'Evaluated')
        .withArgs(true, compilerOutput.rootNode);

      const execFalse = MockedExecParams.withNormalizedArgs().add(false);

      tx = gateway.evaluateGraph([
        {
          nodeId: compilerOutput.rootNode,
          values: execFalse.params,
        },
      ]);

      await expect(tx)
        .to.emit(gateway, 'Evaluated')
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
      await gateway.initGraph(compilerOutput);

      let tx = await gateway.evaluateGraph([
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

      tx = await gateway.evaluateGraph([
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
      await gateway.initGraph(compilerOutput);

      let tx = await gateway.evaluateGraph([
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

      tx = await gateway.evaluateGraph([
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
      await gateway.initGraph(compilerOutput);

      let tx = await gateway.evaluateGraph([
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

      tx = await gateway.evaluateGraph([
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
