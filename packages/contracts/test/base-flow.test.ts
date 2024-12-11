import { faker } from '@faker-js/faker';
import { NodeId } from '@guardian-network/shared/src/misc-utils/node-id-tooling';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ZeroAddress, ZeroHash } from 'ethers';
import { ethers } from 'hardhat';
import { MockedExecParams } from './mocked-init-exec-arguments';
import {
  AND,
  ArtifactsGraph,
  EqualAddress,
  EqualBytes,
  EqualString,
  IsDividableUint,
  NOT,
  OR,
  ParserWithValidation,
  SolidityAddressType,
  SolidityBytesType,
  XOR,
} from './types';
import { deployGraphAndArtifacts } from './utils';

const xor = (argA: boolean, argB: boolean) => {
  return (argA || argB) && !(argA && argB);
};

describe('Artifacts Graph: Base-usage flow', () => {
  describe('Evaluate simple condition', () => {
    let adminSigner: SignerWithAddress;
    let graph: ArtifactsGraph;
    let andArtifact: AND;
    let xorArtifact: XOR;

    let intermediateRepresentation: string;
    let andNode: string;
    let xorNode: string;

    before(async () => {
      [adminSigner] = await ethers.getSigners();

      ({
        artifactsGraphInstance: graph,
        and: andArtifact,
        xor: xorArtifact,
      } = await deployGraphAndArtifacts(adminSigner));

      const XOR_NODE = `{${await xorArtifact.getAddress()}} (true,var0$"") <>`;
      const AND_NODE = `{${await andArtifact.getAddress()}} (|${NodeId.fromNotation(XOR_NODE, 1)}|,var1$"") <>`;

      // condition: (variable1 ^ true) && variable2
      // tree presentation:
      // AND
      //   XOR
      //     variable1
      //     true
      //   variable2
      intermediateRepresentation = `
      ${AND_NODE}
      ${XOR_NODE}
      `;
      console.log(intermediateRepresentation);

      andNode = NodeId.fromNotation(AND_NODE, 0);
      xorNode = NodeId.fromNotation(XOR_NODE, 1);
    });

    it('should succefully evaluate "(variable1 ^ true) && variable2"', async () => {
      const parser = ParserWithValidation.fromOnchainSource(
        intermediateRepresentation,
        adminSigner,
      );

      const rootNode = andNode;

      await graph.initGraph({
        rootNode,
        nodes: await parser.process(),
      });

      const expectedResult = xor(true, false) && true; // gives: 1 ^ 0 && 1 = 1 && 1 = 1

      const variables = [
        {
          nodeId: andNode,
          values: MockedExecParams.withNormalizedArgs(true).params,
        },
        {
          nodeId: xorNode,
          values: MockedExecParams.withNormalizedArgs(false).params,
        },
      ];

      // TestSuite(adminSigner, gatewayInstance, intermedatePresentation).pushArgs(...args).evaluate(assertionHelpers)
      const tx = graph.evaluateGraph(variables);

      await expect(tx)
        .to.emit(graph, 'Evaluated')
        .withArgs(expectedResult, rootNode);
    });
  });

  describe('Evaluate complicated condition', () => {
    let adminSigner: SignerWithAddress;
    let graph: ArtifactsGraph;
    let andArtifact: AND;
    let orArtifact: OR;
    let notArtifact: NOT;
    let equalStringArtifact: EqualString;
    let equalBytesArtifact: EqualBytes;
    let equalAddressArtifact: EqualAddress;
    let isDividableUintArtifact: IsDividableUint;

    let intermediateRepresentation: string;
    let equalAddressNodeId: string;
    let isDividableUintNodeId: string;
    let equalStringsNodeId: string;
    let equalBytesNodeId: string;
    let notNodeId: string;
    let andNodeId: string;
    let or1NodeId: string;
    let or2NodeId: string;

    before(async () => {
      [adminSigner] = await ethers.getSigners();

      ({
        artifactsGraphInstance: graph,
        and: andArtifact,
        or: orArtifact,
        not: notArtifact,
        equalAddresses: equalAddressArtifact,
        equalString: equalStringArtifact,
        equalBytes: equalBytesArtifact,
        isDividiableUint: isDividableUintArtifact,
      } = await deployGraphAndArtifacts(adminSigner));

      const EQUAL_ADDRESS_NODE = `{${await equalAddressArtifact.getAddress()}} (varAddress$"",${ZeroAddress}) <>`;
      const IS_DIVIDABLE_NODE = `{${await isDividableUintArtifact.getAddress()}} (varNumber$"",${2}) <>`;
      // const HASH_STRING_NODE = `{${await hashStringArtifact.getAddress()}} (varString) <>`;
      const EQUAL_STRING_NODE = `{${await equalStringArtifact.getAddress()}} (varString$"",${'"reference"'}) <>`;
      const EQUAL_BYTES_NODE = `{${await equalBytesArtifact.getAddress()}} (varBytes$"",${ZeroHash}) <>`;
      const NOT_NODE = `{${await notArtifact.getAddress()}} (|${NodeId.fromNotation(
        EQUAL_BYTES_NODE,
        4,
      )}|) <>`;
      const AND_NODE = `{${await andArtifact.getAddress()}} (|${NodeId.fromNotation(
        EQUAL_ADDRESS_NODE,
        7,
      )}|,|${NodeId.fromNotation(IS_DIVIDABLE_NODE, 6)}|) <>`;
      const OR1_NODE = `{${await orArtifact.getAddress()}} (|${NodeId.fromNotation(AND_NODE, 2)}|,|${NodeId.fromNotation(
        EQUAL_STRING_NODE,
        5,
      )}|) <>`;
      const OR2_NODE = `{${await orArtifact.getAddress()}} (|${NodeId.fromNotation(OR1_NODE, 1)}|,|${NodeId.fromNotation(
        NOT_NODE,
        3,
      )}|) <>`;

      // condition: randomAddress == address(0) && number % 2 == 0 || h(string) == h("reference") || !(bytes == 0x)
      intermediateRepresentation = `
      ${OR2_NODE}
      ${OR1_NODE}
      ${AND_NODE}
      ${NOT_NODE}
      ${EQUAL_BYTES_NODE}
      ${EQUAL_STRING_NODE}
      ${IS_DIVIDABLE_NODE}
      ${EQUAL_ADDRESS_NODE}
      `;
      console.log(intermediateRepresentation);

      equalAddressNodeId = NodeId.fromNotation(EQUAL_ADDRESS_NODE, 7);
      isDividableUintNodeId = NodeId.fromNotation(IS_DIVIDABLE_NODE, 6);
      equalStringsNodeId = NodeId.fromNotation(EQUAL_STRING_NODE, 5);
      equalBytesNodeId = NodeId.fromNotation(EQUAL_BYTES_NODE, 4);
      notNodeId = NodeId.fromNotation(NOT_NODE, 3);
      andNodeId = NodeId.fromNotation(AND_NODE, 2);
      or1NodeId = NodeId.fromNotation(OR1_NODE, 1);
      or2NodeId = NodeId.fromNotation(OR2_NODE, 0);
    });

    it('should evaluate successfully', async () => {
      const paser = ParserWithValidation.fromOnchainSource(
        intermediateRepresentation,
        adminSigner,
      );
      const rootNode = or2NodeId;
      await graph.initGraph({
        rootNode,
        nodes: await paser.process(),
      });

      // randomAddress == address(0) && 4 % 2 == 0 || h("ref") == h("reference") || !(0xdead == 0x) === true
      const variables = [
        {
          nodeId: equalAddressNodeId,
          values: MockedExecParams.withNormalizedArgs(
            SolidityAddressType.create(faker.finance.ethereumAddress()),
          ).params,
        },
        {
          nodeId: isDividableUintNodeId,
          values: MockedExecParams.withNormalizedArgs(4).params,
        },
        {
          nodeId: equalStringsNodeId,
          values: MockedExecParams.withNormalizedArgs('ref').params,
        },
        {
          nodeId: equalBytesNodeId,
          values: MockedExecParams.withNormalizedArgs(
            SolidityBytesType.create('0xdead'),
          ).params,
        },
        {
          nodeId: notNodeId,
          values: [],
        },
        {
          nodeId: andNodeId,
          values: [],
        },
        {
          nodeId: or1NodeId,
          values: [],
        },
        {
          nodeId: or2NodeId,
          values: [],
        },
      ];

      const tx = graph.evaluateGraph(variables);

      const expectedResult = true;
      await expect(tx)
        .to.emit(graph, 'Evaluated')
        .withArgs(expectedResult, rootNode);
    });
  });
});
