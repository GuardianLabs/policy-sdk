import {
  solidityDecode,
  solidityEncode,
} from '@guardian-network/shared/src/solidity-encode-decode';
import {
  SolidityAddressType,
  SolidityBytesType,
} from '@guardian-network/shared/src/solidity-types';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  ApproveTransactionPayloadStruct,
  ExecParams,
  InitParams,
  PayloadHasher,
} from '../types';
import {
  deployPayloadHasher,
  randomBytes,
  randomBytes32,
  randomEthAddress,
  randomString,
  randomUint,
} from '../utils';

describe('Payload-hasher Artifact', () => {
  let adminSigner: SignerWithAddress;
  let payloadHasherInstance: PayloadHasher;

  before(async () => {
    [adminSigner] = await ethers.getSigners();

    ({ payloadHasher: payloadHasherInstance } =
      await deployPayloadHasher(adminSigner));
  });

  describe('Payload-hasher Artifact: Initialization', () => {
    describe('success', async () => {
      it('when correct config provided', async () => {
        const veryfyingContract = randomEthAddress();

        const verifyinContractPacked =
          SolidityAddressType.create(veryfyingContract);

        const init = InitParams.create(
          await payloadHasherInstance.getInitDescriptor(),
          verifyinContractPacked,
        );

        const correctInitTx = await payloadHasherInstance.init(init.params);
        await correctInitTx.wait();

        await expect(correctInitTx)
          .to.emit(payloadHasherInstance, 'PayloadHasherInited')
          .withArgs(veryfyingContract);
      });
    });

    describe('failure', async () => {
      let payloadHasherInstanceLocal: PayloadHasher;

      before(async () => {
        [adminSigner] = await ethers.getSigners();

        ({ payloadHasher: payloadHasherInstanceLocal } =
          await deployPayloadHasher(adminSigner));
      });

      it('when artifact is already inited', async () => {
        const veryfyingContract = randomEthAddress();

        const verifyinContractPacked =
          SolidityAddressType.create(veryfyingContract);

        const init = InitParams.create(
          await payloadHasherInstance.getInitDescriptor(),
          verifyinContractPacked,
        );

        const tx = payloadHasherInstance.init(init.params);
        await expect(tx).to.be.revertedWith('PD-003');
      });

      it('when veryfing contract address is un-valid', async () => {
        const veryfyingContract = ethers.ZeroAddress;

        const verifyinContractPacked =
          SolidityAddressType.create(veryfyingContract);

        const init = InitParams.create(
          await payloadHasherInstanceLocal.getInitDescriptor(),
          verifyinContractPacked,
        );

        const tx = payloadHasherInstanceLocal.init(init.params);
        await expect(tx).to.be.revertedWith('EAFFO-001');
      });
    });
  });

  describe('Payload-hasher Artifact: calculate message eip712-hash', () => {
    let payloadHasherInstanceLocal: PayloadHasher;

    before(async () => {
      ({ payloadHasher: payloadHasherInstanceLocal } =
        await deployPayloadHasher(adminSigner));

      const verifyingContractPacked = SolidityAddressType.create(
        await payloadHasherInstanceLocal.getAddress(),
      );
      const init = InitParams.create(
        await payloadHasherInstanceLocal.getInitDescriptor(),
        verifyingContractPacked,
      );

      const tx = await payloadHasherInstanceLocal.init(init.params);
      await tx.wait();
    });

    describe('success', () => {
      it('when valid payload is supplied', async () => {
        const payload: ApproveTransactionPayloadStruct = {
          nonce: randomUint(),
          data: randomBytes(),
          asset: randomEthAddress(),
          destination: randomString(),
          amount: randomUint(),
          hashA: randomBytes32(),
          hashB: randomBytes32(),
          mandatoryTagHashed: randomBytes32(),
        };

        const payloadBytes = solidityEncode(
          [
            'tuple(uint256,bytes,address,string,uint256,bytes32,bytes32,bytes32)',
          ],
          [
            [
              payload.nonce,
              payload.data,
              payload.asset,
              payload.destination,
              payload.amount,
              payload.hashA,
              payload.hashB,
              payload.mandatoryTagHashed,
            ],
          ],
        );
        const payloadPacked = SolidityBytesType.create(payloadBytes);

        const exec = ExecParams.create(
          await payloadHasherInstanceLocal.getExecDescriptor(),
          payloadPacked,
        );

        const encodedResult = await payloadHasherInstanceLocal.exec.staticCall(
          exec.params,
        );
        const [decodedResult] = solidityDecode(
          ['bytes'],
          encodedResult,
        ).toArray();
        const [decodedResultB] = solidityDecode(
          ['bytes32'],
          decodedResult,
        ).toArray();
      });
    });

    describe('failure', () => {
      it('when supplied incorrect payload', async () => {
        const incorrectPayload: ApproveTransactionPayloadStruct = {
          nonce: randomUint(),
          data: randomBytes(),
          asset: ethers.ZeroAddress,
          destination: randomString(),
          amount: randomUint(),
          hashA: randomBytes32(),
          hashB: randomBytes32(),
          mandatoryTagHashed: randomBytes32(),
        };

        const payloadBytes = solidityEncode(
          [
            'tuple(uint256,bytes,address,string,uint256,bytes32,bytes32,bytes32)',
          ],
          [Object.values(incorrectPayload)],
        );
        const payloadPacked = SolidityBytesType.create(payloadBytes);

        const exec = ExecParams.create(
          await payloadHasherInstanceLocal.getExecDescriptor(),
          payloadPacked,
        );

        const tx = payloadHasherInstanceLocal.exec(exec.params);
        await expect(tx).to.be.revertedWith('EAFFO-001');
      });
    });
  });
});
