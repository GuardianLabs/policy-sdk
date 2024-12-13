import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { MockedExecParams } from './mocked-init-exec-arguments';
import { check } from './test-helpers';
import {
  DestinationBlacklist,
  DestinationWhitelist,
  ExecParams,
  InitParams,
  SolidityAddressType,
  SolidityBytesType,
} from './types';
import {
  deployDestinationArtifacts,
  randomEthAddress,
  randomHex,
  solidityDecodeSingleParam,
  solidityEncode,
} from './utils';

describe('Destination', () => {
  let adminSigner: SignerWithAddress;
  let destinationWhitelistArtifact: DestinationWhitelist;
  let destinationBlacklistArtifact: DestinationBlacklist;

  before(async () => {
    [adminSigner] = await ethers.getSigners();

    ({
      destinationBlacklist: destinationBlacklistArtifact,
      destinationWhitelist: destinationWhitelistArtifact,
    } = await deployDestinationArtifacts(adminSigner));
  });

  describe('Whtelist', () => {
    let whitelistedDestinations: string[] = [];
    let prohibitedAddress: string;

    before(async () => {
      prohibitedAddress = randomEthAddress();
      whitelistedDestinations.push(
        randomEthAddress(),
        randomEthAddress(),
        randomEthAddress(),
        randomEthAddress(),
      );

      const encodedList = solidityEncode(
        ['address[]'],
        [whitelistedDestinations],
      );
      const serializedList = SolidityBytesType.create(encodedList);

      const init = InitParams.create(
        await destinationWhitelistArtifact.getInitDescriptor(),
        serializedList,
      );
      const tx = await destinationWhitelistArtifact.init(init.params);
      await tx.wait();
    });

    describe('successfully checked', () => {
      it('when destination is whitelisted', async () => {
        const whitelistedDestination = SolidityAddressType.create(
          whitelistedDestinations[0],
        );
        const exec = ExecParams.create(
          await destinationWhitelistArtifact.getExecDescriptor(),
          whitelistedDestination,
        );

        const encodedResult =
          await destinationWhitelistArtifact.exec.staticCall(exec.params);
        const isWhitelisted = solidityDecodeSingleParam('bool', encodedResult);
        check(isWhitelisted, true);
      });

      it('when destination is not whitelisted', async () => {
        const notWhitelistedDestination =
          SolidityAddressType.create(prohibitedAddress);
        const exec = ExecParams.create(
          await destinationWhitelistArtifact.getExecDescriptor(),
          notWhitelistedDestination,
        );

        const encodedResult =
          await destinationWhitelistArtifact.exec.staticCall(exec.params);
        const isWhitelisted = solidityDecodeSingleParam('bool', encodedResult);
        check(isWhitelisted, false);
      });
    });

    describe('failure', () => {
      it('when incorrect exec params supplied', async () => {
        const exec = MockedExecParams.make({
          argsCount: 2,
          defaultValue: SolidityBytesType.create(randomHex()),
        });

        await expect(
          destinationWhitelistArtifact.exec.staticCall(exec.params),
        ).to.be.revertedWith('PD-001');
      });
    });
  });

  describe('Blacklist', () => {
    let blacklistedDestinations: string[] = [];
    let notBlacklistedAddress: string;

    before(async () => {
      notBlacklistedAddress = randomEthAddress();
      blacklistedDestinations.push(
        randomEthAddress(),
        randomEthAddress(),
        randomEthAddress(),
        randomEthAddress(),
      );

      const encodedList = solidityEncode(
        ['address[]'],
        [blacklistedDestinations],
      );
      const serializedList = SolidityBytesType.create(encodedList);

      const init = InitParams.create(
        await destinationBlacklistArtifact.getInitDescriptor(),
        serializedList,
      );
      const tx = await destinationBlacklistArtifact.init(init.params);
      await tx.wait();
    });

    describe('successfully checked', () => {
      it('when destination is blacklisted', async () => {
        const blacklistedDestination = SolidityAddressType.create(
          blacklistedDestinations[0],
        );
        const exec = ExecParams.create(
          await destinationBlacklistArtifact.getExecDescriptor(),
          blacklistedDestination,
        );

        const encodedResult =
          await destinationBlacklistArtifact.exec.staticCall(exec.params);
        const isBlacklisted = solidityDecodeSingleParam('bool', encodedResult);
        check(isBlacklisted, true);
      });

      it('when destination is not blacklisted', async () => {
        const notBlacklistedDestination = SolidityAddressType.create(
          notBlacklistedAddress,
        );
        const exec = ExecParams.create(
          await destinationBlacklistArtifact.getExecDescriptor(),
          notBlacklistedDestination,
        );

        const encodedResult =
          await destinationBlacklistArtifact.exec.staticCall(exec.params);
        const isBlacklisted = solidityDecodeSingleParam('bool', encodedResult);
        check(isBlacklisted, false);
      });
    });

    describe('failure', () => {
      it('when incorrect exec params supplied', async () => {
        const exec = MockedExecParams.make({
          argsCount: 2,
          defaultValue: SolidityBytesType.create(randomHex()),
        });

        await expect(
          destinationBlacklistArtifact.exec.staticCall(exec.params),
        ).to.be.revertedWith('PD-001');
      });
    });
  });
});
