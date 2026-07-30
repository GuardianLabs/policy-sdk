import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { policy as testPolicyDslFramework } from './templates';
import { check } from './test-helpers';
import {
  EqualAddress,
  EqualBytes,
  EqualUint,
  Keccak256String,
  LacLangCompiler,
  PolicyHandler,
  XOR,
} from './types';
import {
  deployPolicyHandlerAndArtifacts,
  rawOnchainVariablesDescriptionToOffchainView,
} from './utils';

describe('DSL-Builder Framework test', () => {
  let admin: SignerWithAddress;

  // logical
  let xorArtifact: XOR;
  // hashing
  let keccakStringArtifact: Keccak256String;
  // comparison
  let equalUintsArtifact: EqualUint;
  let equalBytesArtifact: EqualBytes;
  let equalAddressesArtifact: EqualAddress;

  // entrypoint
  let policyHandler: PolicyHandler;

  before(async () => {
    [admin] = await ethers.getSigners();

    ({
      PolicyHandlerInstance: policyHandler,
      equalAddresses: equalAddressesArtifact,
      equalUint: equalUintsArtifact,
      equalBytes: equalBytesArtifact,
      keccak256String: keccakStringArtifact,
      xor: xorArtifact,
    } = await deployPolicyHandlerAndArtifacts(admin));
  });

  describe('Variables testing', () => {
    let dsl: string;

    before(async () => {
      dsl = testPolicyDslFramework.complex.injection.dummy(
        await equalUintsArtifact.getAddress(),
        await equalBytesArtifact.getAddress(),
        await equalAddressesArtifact.getAddress(),
        await keccakStringArtifact.getAddress(),
        await xorArtifact.getAddress(),
      );
    });

    it.skip('querying policy with injection for policy-variables package testing', async () => {
      const compiler = LacLangCompiler.fromSources(dsl, {
        checkTypesAgainstDslDeclarations: true,
        provider: admin.provider,
      });

      const compilerOutput = await compiler.compile();
      await policyHandler.set(compilerOutput);

      const variables = await policyHandler.getVariablesListDecoded();
      const variablesFormatted = variables.map(
        rawOnchainVariablesDescriptionToOffchainView,
      );

      // console.log(variablesFormatted);
      // note: order is equal as dsl declaration (in "policy.complex.injection.dummy")
      const [
        equalUintOnchain,
        keccakStringOnchain,
        xorOnchain,
        equalBytesOnchain,
        equalAddressesOnchain,
      ] = variablesFormatted;

      check(variablesFormatted.length, 5);
      check(
        equalUintOnchain.artifactAddress,
        await equalUintsArtifact.getAddress(),
      );
      check(
        equalBytesOnchain.artifactAddress,
        await equalBytesArtifact.getAddress(),
      );
      check(
        equalAddressesOnchain.artifactAddress,
        await equalAddressesArtifact.getAddress(),
      );
      check(
        keccakStringOnchain.artifactAddress,
        await keccakStringArtifact.getAddress(),
      );
      check(xorOnchain.artifactAddress, await xorArtifact.getAddress());
    });
  });
});
