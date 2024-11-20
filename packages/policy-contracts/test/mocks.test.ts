import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { LacLangCompiler } from '../../policy-compiler/compiler';
import { rawOnchainVariablesDescriptionToOffchainView } from '../../policy-variables/src/utils';
import {
  AND,
  ArtifactsGraph,
  ArtifactsGraph__factory,
  EqualAddress,
  EqualBytes,
  EqualString,
  EqualUint,
  GteUint,
  GtUint,
  Keccak256String,
  Keccak256Uint,
  LteUint,
  LtUint,
  NOT,
  OR,
  XOR,
} from '../src';
import { policy } from './templates';
import { deployArtifacts } from './utils';

describe('Deploying and querying mocks for subsequent tests', () => {
  let adminSigner: SignerWithAddress;

  // logical
  let andArtifact: AND;
  let orArtifact: OR;
  let notArtifact: NOT;
  let xorArtifact: XOR;
  // hashing
  let keccakStringArtifact: Keccak256String;
  let keccakUintArtifact: Keccak256Uint;
  // comparison
  let gteUintArtifact: GteUint;
  let lteUintArtifact: LteUint;
  let gtUintArtifact: GtUint;
  let ltUintArtifact: LtUint;
  let equalUintsArtifact: EqualUint;
  let equalStringsArtifact: EqualString;
  let equalBytesArtifact: EqualBytes;
  let equalAddressesArtifact: EqualAddress;

  // entrypoint
  let gateway: ArtifactsGraph;

  before(async () => {
    [adminSigner] = await ethers.getSigners();

    const {
      and,
      or,
      not,
      xor,
      keccak256String,
      keccak256Uint,
      gteUint,
      isDividiableUint,
      equalAddresses,
      lteUint,
      gtUint,
      ltUint,
      equalUint,
      equalBytes,
      equalString,
      currentTimestamp,
    } = await deployArtifacts(adminSigner);

    andArtifact = and;
    orArtifact = or;
    notArtifact = not;
    xorArtifact = xor;
    gteUintArtifact = gteUint;
    lteUintArtifact = lteUint;
    gtUintArtifact = gtUint;
    ltUintArtifact = ltUint;
    equalAddressesArtifact = equalAddresses;
    equalUintsArtifact = equalUint;
    equalBytesArtifact = equalBytes;
    equalStringsArtifact = equalString;
    keccakStringArtifact = keccak256String;
    keccakUintArtifact = keccak256Uint;

    const gatewayDeployer = new ArtifactsGraph__factory(adminSigner);

    gateway = await gatewayDeployer.deploy(adminSigner.address);
    gateway.waitForDeployment();
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
