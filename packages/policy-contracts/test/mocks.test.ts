import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { LacLangCompiler } from '../../policy-compiler/compiler';
import { rawOnchainVariablesDescriptionToOffchainView } from '../../policy-variables/src/utils';
import {
  ArtifactsGraph,
  EqualAddress,
  EqualBytes,
  EqualString,
  EqualUint,
  Keccak256String,
  XOR,
} from '../src';
import { policy } from './templates';
import { deployGraphAndArtifacts } from './utils';

describe('Deploying and querying mocks for subsequent tests', () => {
  let adminSigner: SignerWithAddress;

  // logical
  let xorArtifact: XOR;
  // hashing
  let keccakStringArtifact: Keccak256String;
  // comparison
  let equalUintsArtifact: EqualUint;
  let equalStringsArtifact: EqualString;
  let equalBytesArtifact: EqualBytes;
  let equalAddressesArtifact: EqualAddress;

  // entrypoint
  let gateway: ArtifactsGraph;

  before(async () => {
    [adminSigner] = await ethers.getSigners();

    ({
      artifactsGraphInstance: gateway,
      equalAddresses: equalAddressesArtifact,
      equalUint: equalUintsArtifact,
      equalBytes: equalBytesArtifact,
      equalString: equalStringsArtifact,
      keccak256String: keccakStringArtifact,
      xor: xorArtifact,
    } = await deployGraphAndArtifacts(adminSigner));
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
      const compiler = new LacLangCompiler({
        checkTypesAgainstDeclaration: true,
        provider: adminSigner.provider,
      });

      const compilerOutput = await compiler.compileSources(dsl);
      await gateway.initGraph(compilerOutput);

      const variables = await gateway.getVariablesList();
      const variablesFormatted = variables.map(
        rawOnchainVariablesDescriptionToOffchainView,
      );

      console.log(JSON.stringify(variablesFormatted, null, 2));
    });
  });
});
