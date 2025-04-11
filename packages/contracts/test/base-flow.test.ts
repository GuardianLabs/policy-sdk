import { faker } from '@faker-js/faker';
import { NodeId } from '@guardian-network/shared/src/misc-utils/node-id-tooling';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ZeroAddress, ZeroHash } from 'ethers';
import { ethers } from 'hardhat';
import { MockedExecParams } from './mocked-init-exec-arguments';
import { policy as testPolicyDslFramework } from './templates';
import { checkEvent, checkRevert } from './test-helpers';
import {
  AND,
  EqualAddress,
  EqualBytes,
  EqualString,
  IsDividableUint,
  LacLangCompiler,
  NOT,
  OR,
  ParserWithValidation,
  PolicyHandler,
  SolidityAddressType,
  SolidityBytesType,
  XOR,
} from './types';
import { deployPolicyHandlerAndArtifacts } from './utils';

describe('Policy: Base-usage flow', () => {
  const xor = (argA: boolean, argB: boolean) => {
    return (argA || argB) && !(argA && argB);
  };

  describe('Simple policy rule', () => {
    let adminSigner: SignerWithAddress;
    let policyHandler: PolicyHandler;
    let andArtifact: AND;
    let xorArtifact: XOR;

    let intermediateRepresentation: string;

    let andNodeId: string;
    let xorNodeId: string;
    let rootNodeId: string;

    before(async () => {
      [adminSigner] = await ethers.getSigners();

      ({
        PolicyHandlerInstance: policyHandler,
        and: andArtifact,
        xor: xorArtifact,
      } = await deployPolicyHandlerAndArtifacts(adminSigner));

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
      // console.log(intermediateRepresentation);

      andNodeId = NodeId.fromNotation(AND_NODE, 0);
      xorNodeId = NodeId.fromNotation(XOR_NODE, 1);
      rootNodeId = andNodeId;
    });

    describe('new policy conditions', () => {
      it('should init "(variable1 ^ true) && variable2" condition', async () => {
        const parser = ParserWithValidation.fromOnchainSource(
          intermediateRepresentation,
          adminSigner,
        );

        const initParams = await parser.process(); // policy onchain presentation as graph

        const tx = policyHandler.set({
          rootNode: rootNodeId,
          nodes: initParams,
        });

        await checkEvent(
          tx,
          policyHandler,
          'Set',
          rootNodeId,
          initParams.length,
        );
      });

      it('should evaluate "(variable1 ^ true) && variable2" condition', async () => {
        const xorEvaluation = xor(true, false) && true; // gives: 1 ^ 0 && 1 = 1 && 1 = 1

        // variables
        const evaluateParams = [
          {
            nodeId: andNodeId,
            values: MockedExecParams.withNormalizedArgs(true).params,
          },
          {
            nodeId: xorNodeId,
            values: MockedExecParams.withNormalizedArgs(false).params,
          },
        ];

        // todo: TestSuite(adminSigner, gatewayInstance, intermedatePresentation).pushArgs(...args).evaluate(assertionHelpers)
        const tx = policyHandler.evaluate(evaluateParams);

        await checkEvent(
          tx,
          policyHandler,
          'Evaluated',
          xorEvaluation,
          rootNodeId,
        );
      });
    });
  });

  describe('Complex policy rule', () => {
    let adminSigner: SignerWithAddress;
    let policyHandler: PolicyHandler;

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
    // let andNodeId: string;
    let or1NodeId: string;
    let or2NodeId: string;
    // let notNodeId: string;

    let rootNodeId: string;

    before(async () => {
      [adminSigner] = await ethers.getSigners();

      ({
        PolicyHandlerInstance: policyHandler,
        and: andArtifact,
        or: orArtifact,
        not: notArtifact,
        equalAddresses: equalAddressArtifact,
        equalString: equalStringArtifact,
        equalBytes: equalBytesArtifact,
        isDividiableUint: isDividableUintArtifact,
      } = await deployPolicyHandlerAndArtifacts(adminSigner));
    });

    describe('new policy conditions', () => {
      before(async () => {
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

        // result = randomAddress == address(0) && number % 2 == 0 || h(string) == h("reference") || !(bytes == 0x)
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
        // console.log(intermediateRepresentation);

        equalAddressNodeId = NodeId.fromNotation(EQUAL_ADDRESS_NODE, 7);
        isDividableUintNodeId = NodeId.fromNotation(IS_DIVIDABLE_NODE, 6);
        equalStringsNodeId = NodeId.fromNotation(EQUAL_STRING_NODE, 5);
        equalBytesNodeId = NodeId.fromNotation(EQUAL_BYTES_NODE, 4);
        /* notNodeId = NodeId.fromNotation(NOT_NODE, 3);
        andNodeId = NodeId.fromNotation(AND_NODE, 2);*/
        or1NodeId = NodeId.fromNotation(OR1_NODE, 1);
        or2NodeId = NodeId.fromNotation(OR2_NODE, 0);

        rootNodeId = or2NodeId;
      });

      it('should init policy', async () => {
        const parser = ParserWithValidation.fromOnchainSource(
          intermediateRepresentation,
          adminSigner,
        );

        const initParams = await parser.process(); // policy onchain presentation as graph

        // console.log(or1NodeId);
        // console.log(initParams);

        const setTx = policyHandler.set({
          rootNode: rootNodeId,
          nodes: initParams,
        });

        await checkEvent(
          setTx,
          policyHandler,
          'Set',
          rootNodeId,
          initParams.length,
        );
      });

      it('should evaluate policy', async () => {
        // INCORRECT IDS: NEW APPROACH TO IDS CALCULATION
        // randomAddress == address(0) && 4 % 2 == 0 || h("ref") == h("reference") || !(0xdead == 0x) === true
        const evaluateParams = [
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
          /* {
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
          }, */
        ];

        // console.log(evaluateParams.map(v => v.nodeId))
        const tx = policyHandler.evaluate(evaluateParams);

        await checkEvent(tx, policyHandler, 'Evaluated', true, rootNodeId);
      });
    });

    describe('updated policy conditions', () => {
      let intermediateRepresentationUpgraded: string;

      let equalAddressNodeIdAlternative: string;
      let isDividableUintNodeIdAlternative: string;
      let equalStringsNodeIdAlternative: string;
      let equalBytesNodeIdAlternative: string;
      let not1NodeIdAlternative: string;
      let andNodeIdAlternative: string;
      let or1NodeIdAlternative: string;
      let or2NodeIdAlternative: string;
      let not2NodeIdAlternative: string;

      before(async () => {
        const EQUAL_ADDRESS_NODE_ALTERNATIVE = `{${await equalAddressArtifact.getAddress()}} (varAddress$"",${ZeroAddress}) <>`;
        const IS_DIVIDABLE_NODE_ALTERNATIVE = `{${await isDividableUintArtifact.getAddress()}} (varNumber$"",${2}) <>`;
        // const HASH_STRING_NODE = `{${await hashStringArtifact.getAddress()}} (varString) <>`;
        const EQUAL_STRING_NODE_ALTERNATIVE = `{${await equalStringArtifact.getAddress()}} (varString$"",${'"reference"'}) <>`;
        const EQUAL_BYTES_NODE_ALTERNATIVE = `{${await equalBytesArtifact.getAddress()}} (varBytes$"",${ZeroHash}) <>`;
        const NOT1_NODE_ALTERNATIVE = `{${await notArtifact.getAddress()}} (|${NodeId.fromNotation(
          EQUAL_BYTES_NODE_ALTERNATIVE,
          5,
        )}|) <>`;
        const AND_NODE_ALTERNATIVE = `{${await andArtifact.getAddress()}} (|${NodeId.fromNotation(
          EQUAL_ADDRESS_NODE_ALTERNATIVE,
          8,
        )}|,|${NodeId.fromNotation(IS_DIVIDABLE_NODE_ALTERNATIVE, 7)}|) <>`;
        const OR1_NODE_ALTERNATIVE = `{${await orArtifact.getAddress()}} (|${NodeId.fromNotation(AND_NODE_ALTERNATIVE, 3)}|,|${NodeId.fromNotation(
          EQUAL_STRING_NODE_ALTERNATIVE,
          6,
        )}|) <>`;
        const OR2_NODE_ALTERNATIVE = `{${await orArtifact.getAddress()}} (|${NodeId.fromNotation(OR1_NODE_ALTERNATIVE, 2)}|,|${NodeId.fromNotation(
          NOT1_NODE_ALTERNATIVE,
          4,
        )}|) <>`;
        const NOT2_NODE_ALTERNATIVE = `{${await notArtifact.getAddress()}} (|${NodeId.fromNotation(
          OR2_NODE_ALTERNATIVE,
          1,
        )}|) <>`;

        intermediateRepresentationUpgraded = `
        ${NOT2_NODE_ALTERNATIVE}
        ${OR2_NODE_ALTERNATIVE}
        ${OR1_NODE_ALTERNATIVE}
        ${AND_NODE_ALTERNATIVE}
        ${NOT1_NODE_ALTERNATIVE}
        ${EQUAL_BYTES_NODE_ALTERNATIVE}
        ${EQUAL_STRING_NODE_ALTERNATIVE}
        ${IS_DIVIDABLE_NODE_ALTERNATIVE}
        ${EQUAL_ADDRESS_NODE_ALTERNATIVE}
        `;

        equalAddressNodeIdAlternative = NodeId.fromNotation(
          EQUAL_ADDRESS_NODE_ALTERNATIVE,
          8,
        );
        isDividableUintNodeIdAlternative = NodeId.fromNotation(
          IS_DIVIDABLE_NODE_ALTERNATIVE,
          7,
        );
        equalStringsNodeIdAlternative = NodeId.fromNotation(
          EQUAL_STRING_NODE_ALTERNATIVE,
          6,
        );
        equalBytesNodeIdAlternative = NodeId.fromNotation(
          EQUAL_BYTES_NODE_ALTERNATIVE,
          5,
        );
        not1NodeIdAlternative = NodeId.fromNotation(NOT1_NODE_ALTERNATIVE, 4);
        andNodeIdAlternative = NodeId.fromNotation(AND_NODE_ALTERNATIVE, 3);
        or1NodeIdAlternative = NodeId.fromNotation(OR1_NODE_ALTERNATIVE, 2);
        or2NodeIdAlternative = NodeId.fromNotation(OR2_NODE_ALTERNATIVE, 1);
        not2NodeIdAlternative = NodeId.fromNotation(NOT2_NODE_ALTERNATIVE, 0);

        rootNodeId = not2NodeIdAlternative;
      });

      it('should update policy', async () => {
        const parser = ParserWithValidation.fromOnchainSource(
          intermediateRepresentationUpgraded,
          adminSigner,
        );

        const initParams = await parser.process(); // policy onchain presentation as graph

        /* todo:
  
        await expect(
          policy.reset({
            rootNode,
            nodes: initData,
          }),
        ).to.be.revertedWith('T-005'); */
        const setTX = policyHandler.set({
          rootNode: rootNodeId,
          nodes: initParams,
        });

        await checkRevert(setTX, 'T-004');

        const resetTx = policyHandler.reset({
          rootNode: rootNodeId,
          nodes: initParams,
        });

        await checkEvent(
          resetTx,
          policyHandler,
          'Upgraded',
          rootNodeId,
          initParams.length,
        );
      });

      it('should evaluate policy', async () => {
        const evaluateParams = [
          {
            nodeId: equalAddressNodeIdAlternative,
            values: MockedExecParams.withNormalizedArgs(
              SolidityAddressType.create(faker.finance.ethereumAddress()),
            ).params,
          },
          {
            nodeId: isDividableUintNodeIdAlternative,
            values: MockedExecParams.withNormalizedArgs(4).params,
          },
          {
            nodeId: equalStringsNodeIdAlternative,
            values: MockedExecParams.withNormalizedArgs('ref').params,
          },
          {
            nodeId: equalBytesNodeIdAlternative,
            values: MockedExecParams.withNormalizedArgs(
              SolidityBytesType.create('0xdead'),
            ).params,
          },
          {
            nodeId: not1NodeIdAlternative,
            values: [],
          },
          {
            nodeId: andNodeIdAlternative,
            values: [],
          },
          {
            nodeId: or1NodeIdAlternative,
            values: [],
          },
          {
            nodeId: or2NodeIdAlternative,
            values: [],
          },
          {
            nodeId: not2NodeIdAlternative,
            values: [],
          },
        ];

        const tx = policyHandler.evaluate(evaluateParams);

        await checkEvent(tx, policyHandler, 'Evaluated', false, rootNodeId);
      });
    });

    describe('Incorrect policy rules', () => {
      let adminSigner: SignerWithAddress;

      // logical
      let andArtifact: AND;
      let xorArtifact: XOR;

      // entrypoint
      let policyHandler: PolicyHandler;

      before(async () => {
        [adminSigner] = await ethers.getSigners();

        ({
          PolicyHandlerInstance: policyHandler,
          and: andArtifact,
          xor: xorArtifact,
        } = await deployPolicyHandlerAndArtifacts(adminSigner));
      });

      describe('Two linked artifacts and one unlinked artifact', () => {
        let dsl: string;

        before(async () => {
          dsl =
            testPolicyDslFramework.simple.two_artifacts.one_variable.one_constant.incorrect_artifacts_state.unlinked_artifact(
              await andArtifact.getAddress(),
              await xorArtifact.getAddress(),
            );
        });

        it('should not init policy', async () => {
          const compiler = LacLangCompiler.fromSources(dsl, {
            provider: adminSigner.provider,
            checkTypesAgainstDslDeclarations: true,
          });
          const compiled = await compiler.compile();

          const tx = policyHandler.set(compiled);

          await expect(tx).to.be.revertedWith('DWPM-003');
        });
      });
    });
  });
});
