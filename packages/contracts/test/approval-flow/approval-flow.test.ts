import {
  SolidityBytes32Type,
  SolidityBytesListPacked,
} from '@guardian-network/shared/src/solidity-types';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { check } from '../test-helpers';
import {
  ApprovalFlow,
  ExecParams,
  InitParams,
  SolidityAddressListPacked,
  SolidityBytesType,
} from '../types';
import {
  deployApprovalFlowInstance,
  getRandomSigBytes,
  keccak256Hash,
  randomBytes,
  randomEthAddress,
  solidityDecodeSingleParam,
  solidityEncode,
} from '../utils';
import { hashMessage } from './utils.helper';

describe('Approval-Flow Artifact', () => {
  let adminSigner: SignerWithAddress;
  let approvalFlowInstance: ApprovalFlow;

  before(async () => {
    [adminSigner] = await ethers.getSigners();

    ({ approvalFlow: approvalFlowInstance } =
      await deployApprovalFlowInstance(adminSigner));
  });

  describe('Approval-Flow Artifact: Initialization', () => {
    describe('success', async () => {
      it('when correct config provided', async () => {
        const approversList = [
          randomEthAddress(),
          randomEthAddress(),
          randomEthAddress(),
          randomEthAddress(),
          randomEthAddress(),
        ];

        const serializedList =
          SolidityAddressListPacked.fromList(approversList);
        const quorum = Math.round(approversList.length / 2); // 5 / 2 = 3;

        const init = InitParams.create(
          await approvalFlowInstance.getInitDescriptor(),
          serializedList,
          quorum,
        );

        const correctInitTx = await approvalFlowInstance.init(init.params);
        await correctInitTx.wait();

        await expect(correctInitTx)
          .to.emit(approvalFlowInstance, 'ApprovalFlowInited')
          .withArgs(keccak256Hash(['address[]'], [approversList]), quorum);
      });
    });

    describe('failure', async () => {
      let approvalFlowInstanceLocal: ApprovalFlow;

      const defaultQuorum = 3;
      const APPROVERS_LENGTH = 5;

      before(async () => {
        [adminSigner] = await ethers.getSigners();

        ({ approvalFlow: approvalFlowInstanceLocal } =
          await deployApprovalFlowInstance(adminSigner));
      });

      it('when artifact is already inited', async () => {
        const approvers = [...Array<string>(APPROVERS_LENGTH)].map(() =>
          randomEthAddress(),
        );

        const encodedList = solidityEncode(['address[]'], [approvers]);
        const serializedList = SolidityBytesType.create(encodedList);

        const init = InitParams.create(
          await approvalFlowInstance.getInitDescriptor(),
          serializedList,
          defaultQuorum,
        );

        const tx = approvalFlowInstance.init(init.params);
        await expect(tx).to.be.revertedWith('PD-003');
      });

      it('when approver is un-valid', async () => {
        const validApprovers = [...Array<string>(APPROVERS_LENGTH)].map(() =>
          randomEthAddress(),
        );

        let unvalidApprovers = validApprovers.slice();
        unvalidApprovers[3] = unvalidApprovers[4];

        let serializedList =
          SolidityAddressListPacked.fromList(unvalidApprovers);

        let init = InitParams.create(
          await approvalFlowInstanceLocal.getInitDescriptor(),
          serializedList,
          defaultQuorum,
        );

        // duplicate
        let tx = approvalFlowInstanceLocal.init(init.params);
        await expect(tx).to.be.revertedWith('AF-003');

        unvalidApprovers = validApprovers.slice();
        unvalidApprovers[3] = ethers.ZeroAddress;

        serializedList = SolidityAddressListPacked.fromList(unvalidApprovers);

        init = InitParams.create(
          await approvalFlowInstanceLocal.getInitDescriptor(),
          serializedList,
          defaultQuorum,
        );

        // zero-address
        tx = approvalFlowInstanceLocal.init(init.params);
        await expect(tx).to.be.revertedWith('AF-004');

        init = InitParams.create(
          await approvalFlowInstanceLocal.getInitDescriptor(),
          SolidityAddressListPacked.fromList([randomEthAddress()]),
          defaultQuorum,
        );

        // less than quorum
        tx = approvalFlowInstanceLocal.init(init.params);
        await expect(tx).to.be.revertedWith('AF-010');
      });

      it('when quorum is un-valid', async () => {
        const approvers = [...Array<string>(APPROVERS_LENGTH)].map(() =>
          randomEthAddress(),
        );

        let unvalidQuorum = approvers.length + 1;

        const serializedList = SolidityAddressListPacked.fromList(approvers);

        let init = InitParams.create(
          await approvalFlowInstanceLocal.getInitDescriptor(),
          serializedList,
          unvalidQuorum,
        );

        let tx = approvalFlowInstanceLocal.init(init.params);
        await expect(tx).to.be.revertedWith('AF-005');

        unvalidQuorum = 0;
        init = InitParams.create(
          await approvalFlowInstanceLocal.getInitDescriptor(),
          serializedList,
          unvalidQuorum,
        );

        tx = approvalFlowInstanceLocal.init(init.params);
        await expect(tx).to.be.revertedWith('AF-002');

        unvalidQuorum = 2;
        init = InitParams.create(
          await approvalFlowInstanceLocal.getInitDescriptor(),
          serializedList,
          unvalidQuorum,
        );

        tx = approvalFlowInstanceLocal.init(init.params);
        await expect(tx).to.be.revertedWith('AF-006');
      });
    });
  });

  describe('Approval-Flow Artifact: Check if approvers approve', () => {
    let approvalFlowInstanceLocal: ApprovalFlow;
    let approversSignersList: SignerWithAddress[];
    let approversList: string[];

    const APPROVERS_LENGTH = 5;
    const DEFAULT_QUORUM = Math.round(APPROVERS_LENGTH / 2);

    before(async () => {
      let [adminSigner, ...restSignersList] = await ethers.getSigners();

      ({ approvalFlow: approvalFlowInstanceLocal } =
        await deployApprovalFlowInstance(adminSigner));

      approversSignersList = [...restSignersList.slice(0, APPROVERS_LENGTH)];
      approversList = approversSignersList.map((v) => v.address);

      const serializedList = SolidityAddressListPacked.fromList(approversList);

      const init = InitParams.create(
        await approvalFlowInstanceLocal.getInitDescriptor(),
        serializedList,
        DEFAULT_QUORUM,
      );

      const correctInitTx = await approvalFlowInstanceLocal.init(init.params);
      await correctInitTx.wait();
    });

    describe('success', () => {
      it('when at least quorum of approvers sign approve payload', async () => {
        const payload = 'newmessage';
        const quorumOfApprovers = approversSignersList.slice(0, DEFAULT_QUORUM);

        const signatures: string[] = [];
        const messageHash = hashMessage(payload);

        for (const approverSigner of quorumOfApprovers) {
          signatures.push(await approverSigner.signMessage(payload));
        }

        const hashPacked = SolidityBytes32Type.fromString(messageHash);
        const signaturesPacked = SolidityBytesListPacked.fromList(signatures);

        const exec = ExecParams.create(
          await approvalFlowInstanceLocal.getExecDescriptor(),
          hashPacked,
          signaturesPacked,
        );

        const encodedResult = await approvalFlowInstanceLocal.exec.staticCall(
          exec.params,
        );
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, true);
      });
    });

    describe('failure', () => {
      it('when provided duplicated signature', async () => {
        const payload = 'newmessage';
        const signaturesListMock = [...Array<string>(APPROVERS_LENGTH)].map(
          () => getRandomSigBytes(),
        );
        signaturesListMock[3] = signaturesListMock[4];
        const messageHash = hashMessage(payload);

        const hashPacked = SolidityBytes32Type.fromString(messageHash);
        const signaturesPacked =
          SolidityBytesListPacked.fromList(signaturesListMock);

        const exec = ExecParams.create(
          await approvalFlowInstanceLocal.getExecDescriptor(),
          hashPacked,
          signaturesPacked,
        );

        const tx = approvalFlowInstanceLocal.exec(exec.params);
        await expect(tx).to.be.revertedWith('AF-011');
      });

      it('when provided signature length is incorrect', async () => {
        const payload = 'newmessage';
        const signaturesListMock = [...Array<string>(APPROVERS_LENGTH)].map(
          () => getRandomSigBytes(),
        );
        signaturesListMock[3] = randomBytes();
        const messageHash = hashMessage(payload);

        const hashPacked = SolidityBytes32Type.fromString(messageHash);
        const signaturesPacked =
          SolidityBytesListPacked.fromList(signaturesListMock);

        const exec = ExecParams.create(
          await approvalFlowInstanceLocal.getExecDescriptor(),
          hashPacked,
          signaturesPacked,
        );

        const tx = approvalFlowInstanceLocal.exec(exec.params);
        await expect(tx).to.be.revertedWith('AF-009');
      });

      it('when signatures list length is incorrect', async () => {
        const payload = 'newmessage';
        let signaturesListMock = [...Array<string>(DEFAULT_QUORUM - 1)].map(
          () => getRandomSigBytes(),
        );
        const messageHash = hashMessage(payload);

        const hashPacked = SolidityBytes32Type.fromString(messageHash);
        let signaturesPacked =
          SolidityBytesListPacked.fromList(signaturesListMock);

        let exec = ExecParams.create(
          await approvalFlowInstanceLocal.getExecDescriptor(),
          hashPacked,
          signaturesPacked,
        );

        let tx = approvalFlowInstanceLocal.exec(exec.params);
        await expect(tx).to.be.revertedWith('AF-008');

        signaturesListMock = [...Array<string>(APPROVERS_LENGTH + 1)].map(() =>
          getRandomSigBytes(),
        );
        signaturesPacked = SolidityBytesListPacked.fromList(signaturesListMock);

        exec = ExecParams.create(
          await approvalFlowInstanceLocal.getExecDescriptor(),
          hashPacked,
          signaturesPacked,
        );

        tx = approvalFlowInstanceLocal.exec(exec.params);
        await expect(tx).to.be.revertedWith('AF-007');
      });

      it('when provided signatures do not match expected signatories', async () => {
        const payload = 'newmessage';
        const signaturesListMock = [...Array<string>(APPROVERS_LENGTH)].map(
          () => getRandomSigBytes(),
        );
        const messageHash = hashMessage(payload);

        const hashPacked = SolidityBytes32Type.fromString(messageHash);
        const signaturesPacked =
          SolidityBytesListPacked.fromList(signaturesListMock);

        const exec = ExecParams.create(
          await approvalFlowInstanceLocal.getExecDescriptor(),
          hashPacked,
          signaturesPacked,
        );

        const encodedResult = await approvalFlowInstanceLocal.exec.staticCall(
          exec.params,
        );
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, false);
      });
    });
  });
});
