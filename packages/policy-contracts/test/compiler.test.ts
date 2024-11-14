import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { LacLangCompiler } from '../../policy-compiler/src';
import { policy } from './templates';
import { check } from './test-helpers';
import {
  AND,
  ArtifactsGraph,
  ArtifactsGraph__factory,
  EqualString,
  GteUint,
  GtUint,
  LteUint,
  XOR,
} from './types';
import { deployArtifacts } from './utils';
import { decodeEvaluationResult } from './utils/decode';
import { ExecParams } from './utils/init-exec-arguments';

describe.skip('Policy: compilation with predefined artifacts', () => {
  let adminSigner: SignerWithAddress;

  // logical
  let andArtifact: AND;
  let xorArtifact: XOR;
  // comparison
  let gteUintArtifact: GteUint;
  let lteUintArtifact: LteUint;
  let gtUintArtifact: GtUint;
  let equalStringsArtifact: EqualString;

  // entrypoint
  let gateway: ArtifactsGraph;

  before(async () => {
    [adminSigner] = await ethers.getSigners();

    const { and, xor, gteUint, lteUint, gtUint, equalString } =
      await deployArtifacts(adminSigner);

    andArtifact = and;
    xorArtifact = xor;
    gteUintArtifact = gteUint;
    lteUintArtifact = lteUint;
    gtUintArtifact = gtUint;
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
      const compiler = new LacLangCompiler({
        provider: adminSigner.provider,
        checkTypesAgainstDeclaration: true,
      });
      const compilerOutput = await compiler.compileSources(dsl);
      await gateway.initGraph(compilerOutput);

      const execTrue = ExecParams.create(
        await xorArtifact.getExecDescriptor(),
      ).add(true);

      let tx = await gateway.evaluateGraph([
        {
          nodeId: compilerOutput.rootNode,
          values: execTrue.params,
        },
      ]);

      let evaluationResult = await decodeEvaluationResult(tx);

      check(evaluationResult, true);

      const execFalse = ExecParams.create(
        await xorArtifact.getExecDescriptor(),
      ).add(false);

      tx = await gateway.evaluateGraph([
        {
          nodeId: compilerOutput.rootNode,
          values: execFalse.params,
        },
      ]);

      evaluationResult = await decodeEvaluationResult(tx);

      check(evaluationResult, false);
    });

    it('simple policy with one artifcat: validated onchain', async () => {
      const compiler = new LacLangCompiler({
        provider: adminSigner.provider,
        checkTypesAgainstOnchain: true,
      });

      const compilerOutput = await compiler.compileSources(dsl);
      await gateway.initGraph(compilerOutput);

      const execTrue = ExecParams.create(
        await xorArtifact.getExecDescriptor(),
      ).add(true);

      let tx = await gateway.evaluateGraph([
        {
          nodeId: compilerOutput.rootNode,
          values: execTrue.params,
        },
      ]);

      let evaluationResult = await decodeEvaluationResult(tx);

      check(evaluationResult, true);

      const execFalse = ExecParams.create(
        await xorArtifact.getExecDescriptor(),
      ).add(false);

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
      const compiler = new LacLangCompiler();

      const compilerOutput = await compiler.compileSources(dsl);
      await gateway.initGraph(compilerOutput);

      const execTrue = (await ExecParams.createWithDescriptor(xorArtifact)).add(
        true,
      );

      let tx = await gateway.evaluateGraph([
        {
          nodeId: compilerOutput.rootNode,
          values: execTrue.params,
        },
      ]);

      let evaluationResult = await decodeEvaluationResult(tx);

      check(evaluationResult, true);

      const execFalse = ExecParams.create(
        await xorArtifact.getExecDescriptor(),
      ).add(false);

      tx = await gateway.evaluateGraph([
        {
          nodeId: compilerOutput.rootNode,
          values: execFalse.params,
        },
      ]);

      evaluationResult = await decodeEvaluationResult(tx);

      check(evaluationResult, false);
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
      const compiler = new LacLangCompiler({
        provider: adminSigner.provider,
        checkTypesAgainstDeclaration: true,
      });

      const compilerOutput = await compiler.compileSources(dsl);
      await gateway.initGraph(compilerOutput);

      let tx = await gateway.evaluateGraph([
        {
          nodeId: compilerOutput.nodes[0].id,
          values: ExecParams.create(
            await equalStringsArtifact.getExecDescriptor(),
          ).add("I'm an input").params,
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
          values: (
            await ExecParams.createWithDescriptor(equalStringsArtifact)
          ).add('lol not me').params,
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
      const compiler = new LacLangCompiler({
        provider: adminSigner.provider,
        checkTypesAgainstOnchain: true,
      });

      const compilerOutput = await compiler.compileSources(dsl);
      await gateway.initGraph(compilerOutput);

      let tx = await gateway.evaluateGraph([
        {
          nodeId: compilerOutput.nodes[0].id,
          values: ExecParams.create(
            await equalStringsArtifact.getExecDescriptor(),
          ).add("I'm an input").params,
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
          values: ExecParams.create(
            await equalStringsArtifact.getExecDescriptor(),
          ).add('lol not me').params,
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
      const compiler = new LacLangCompiler();

      const compilerOutput = await compiler.compileSources(dsl);
      await gateway.initGraph(compilerOutput);

      let tx = await gateway.evaluateGraph([
        {
          nodeId: compilerOutput.nodes[0].id,
          values: ExecParams.create(
            await equalStringsArtifact.getExecDescriptor(),
          ).add("I'm an input").params,
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
          values: ExecParams.create(
            await equalStringsArtifact.getExecDescriptor(),
          ).add('lol not me').params,
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
