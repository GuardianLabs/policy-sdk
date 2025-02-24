import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { policy } from './templates';
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

describe('Deploying and querying mocks for subsequent tests', () => {
  let adminSigner: SignerWithAddress;

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
    [adminSigner] = await ethers.getSigners();

    ({
      PolicyHandlerInstance: policyHandler,
      equalAddresses: equalAddressesArtifact,
      equalUint: equalUintsArtifact,
      equalBytes: equalBytesArtifact,
      keccak256String: keccakStringArtifact,
      xor: xorArtifact,
    } = await deployPolicyHandlerAndArtifacts(adminSigner));
  });

  describe('Variables testing', () => {
    let dsl: string;

    before(async () => {
      dsl = policy.complex.injection.dummy(
        await equalUintsArtifact.getAddress(),
        await equalBytesArtifact.getAddress(),
        await equalAddressesArtifact.getAddress(),
        await keccakStringArtifact.getAddress(),
        await xorArtifact.getAddress(),
      );
    });

    it('querying policy with injection for policy-variables package testing', async () => {
      const compiler = LacLangCompiler.fromSources(dsl, {
        checkTypesAgainstDslDeclarations: true,
        provider: adminSigner.provider,
      });

      const compilerOutput = await compiler.compile();
      await policyHandler.set(compilerOutput);

      const variables = await policyHandler.getVariablesList();
      const variablesFormatted = variables.map(
        rawOnchainVariablesDescriptionToOffchainView,
      );

      console.log(JSON.stringify(variablesFormatted, null, 2));
    });
  });
});
