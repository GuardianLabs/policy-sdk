import { faker } from '@faker-js/faker';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ZeroAddress } from 'ethers';
import { ethers } from 'hardhat';
import { IntermediatePresentationParser, nodeId } from './parser';
import { SolidityAddressType, SolidityBytesType } from './solidity-types';
import {
  AND,
  ArtifactsGraph,
  EqualAddress,
  EqualBytes,
  EqualString,
  IsDividableUint,
  Keccak256String,
  NOT,
  OR,
  XOR,
} from './types';
import { deployGraphAndArtifacts } from './utils';
import { MockedExecParams } from './utils/init-exec-arguments';

const xor = (argA: boolean, argB: boolean) => {
  return (argA || argB) && !(argA && argB);
};

describe.only('Artifacts Graph: Base-usage flow', () => {
  describe.only('Evaluate simple condition', () => {
    let adminSigner: SignerWithAddress;
    let graph: ArtifactsGraph;
    let andArtifact: AND;
    let xorArtifact: XOR;

    let intermediatePresentation: string;
    let andNode: string;
    let xorNode: string;

    before(async () => {
      [adminSigner] = await ethers.getSigners();

      ({
        artifactsGraphInstance: graph,
        and: andArtifact,
        xor: xorArtifact,
      } = await deployGraphAndArtifacts(adminSigner));

      const XOR_NODE = `{${await xorArtifact.getAddress()}} (true,var0) <>`;
      const AND_NODE = `{${await andArtifact.getAddress()}} (|${nodeId(XOR_NODE, 1)}|,var1) <>`;

      // condition: (variable1 ^ true) && variable2
      // tree presentation:
      // AND
      //   XOR
      //     variable1
      //     true
      //   variable2
      intermediatePresentation = `
      ${AND_NODE}
      ${XOR_NODE}
      `;
      console.log(intermediatePresentation);

      andNode = nodeId(AND_NODE, 0);
      xorNode = nodeId(XOR_NODE, 1);
    });

    it('should succefully evaluate "(variable1 ^ true) && variable2"', async () => {
      const parser = IntermediatePresentationParser.build(
        intermediatePresentation,
        adminSigner,
      );

      const rootNode = andNode;

      // console.log((await parser.process())[0]);
      // console.log((await parser.process())[1]);
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
    let hashStringsArtifact: Keccak256String;
    let equalStringArtifact: EqualString;
    let equalBytesArtifact: EqualBytes;
    let equalAddressArtifact: EqualAddress;
    let isDividableUintArtifact: IsDividableUint;

    let eqlAddrNodeId: string;
    let dividable_node_id: string;
    let eqlStrNodeId: string;
    let hashNodeId: string;
    let eqlBytesNodeId: string;
    let notNodeId: string;
    let andNodeId: string;
    let or1NodeId: string;
    let or2NodeId: string;

    let intermediatePresentation: string;

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
        keccak256String: hashStringsArtifact,
      } = await deployGraphAndArtifacts(adminSigner));

      /*
      address == address(0) && number % 2 == 0 || hash(string) == h("reference") || !(bytes == 0x)
      */
      const EQUAL_ADDRESS_NODE = `{${await equalAddressArtifact.getAddress()}} (varAddress,${ZeroAddress}) <>`;
      const IS_DIVIDABLE_NODE = `{${await isDividableUintArtifact.getAddress()}} (varNumber,${2}) <>`;
      const HASH_STRING_NODE = `{${await hashStringsArtifact.getAddress()}} (varString) <>`;
      const eql_str_node = `{${await equalStringArtifact.getAddress()}} (|${nodeId(
        HASH_STRING_NODE,
        6,
      )}|,${'"reference"'}) <>`;
      const eql_bytes_node = `{${await equalBytesArtifact.getAddress()}} (varBytes,${ZeroAddress}) <>`;
      const not_node = `{${await notArtifact.getAddress()}} (|${nodeId(
        eql_bytes_node,
        4,
      )}|) <>`;
      const and1_node = `{${await andArtifact.getAddress()}} (|${nodeId(
        EQUAL_ADDRESS_NODE,
        8,
      )}|,|${nodeId(IS_DIVIDABLE_NODE, 7)}|) <>`;
      const or1_node = `{${await orArtifact.getAddress()}} (|${nodeId(and1_node, 2)}|,|${nodeId(
        eql_str_node,
        5,
      )}|) <>`;
      const or2_node = `{${await orArtifact.getAddress()}} (|${nodeId(or1_node, 1)}|,|${nodeId(
        not_node,
        3,
      )}|) <>`;

      intermediatePresentation = `
      ${or2_node}
      ${or1_node}
      ${and1_node}
      ${not_node}
      ${eql_bytes_node}
      ${eql_str_node}
      ${HASH_STRING_NODE}
      ${IS_DIVIDABLE_NODE}
      ${EQUAL_ADDRESS_NODE}
      `;

      const rootNode = or2NodeId;
      const paser = IntermediatePresentationParser.build(
        intermediatePresentation,
        adminSigner,
      );
      // const intermadiatePresentation = await parseAndExtend(dsl, signer);

      await graph.initGraph({
        rootNode,
        nodes: await paser.process(),
      });

      eqlAddrNodeId = nodeId(EQUAL_ADDRESS_NODE, 8);
      dividable_node_id = nodeId(IS_DIVIDABLE_NODE, 7);
      eqlStrNodeId = nodeId(eql_str_node, 5);
      eqlBytesNodeId = nodeId(eql_bytes_node, 4);
      notNodeId = nodeId(not_node, 3);
      andNodeId = nodeId(and1_node, 2);
      or1NodeId = nodeId(or1_node, 1);
      or2NodeId = nodeId(or2_node, 0);
      hashNodeId = nodeId(HASH_STRING_NODE, 6);
    });

    it('should eveluate successfully', async () => {
      // 0xrandom == address(0) && 4 % 2 == 0 || hash("ref") == h("reference") || !(0xdead == 0x) === true
      const variables = [
        {
          nodeId: eqlAddrNodeId,
          values: MockedExecParams.withNormalizedArgs(
            SolidityAddressType.create(faker.finance.ethereumAddress()),
          ).params,
        },
        {
          nodeId: dividable_node_id,
          values: MockedExecParams.withNormalizedArgs(4).params,
        },
        {
          nodeId: eqlStrNodeId,
          values: [],
        },
        {
          nodeId: hashNodeId,
          values: MockedExecParams.withNormalizedArgs('ref').params,
        },
        {
          nodeId: eqlBytesNodeId,
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

      const rootNode = or2NodeId;

      const tx = graph.evaluateGraph(variables);

      const expectedResult = true;
      await expect(tx)
        .to.emit(graph, 'Evaluated')
        .withArgs(expectedResult, rootNode);
    });
  });
});
