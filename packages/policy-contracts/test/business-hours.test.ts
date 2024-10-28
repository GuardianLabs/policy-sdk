import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { time } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SolidityAddressType, SolidityUint24ListType } from './solidity-types';
import { check } from './test-helpers';
import { BusinessHoursValidation, TrustedTimezoneOffsetSource } from './types';
import {
  deployBusinessHoursContracts,
  solidityDecodeSingleParam,
} from './utils';
import { TimezoneOffset, toSeconds } from './utils/business-hours';
import { InitParams, MockedExecParams } from './utils/init-exec-arguments';

describe('Business Hours', () => {
  const TIMEZONE_ID: string = 'Europe/Kyiv';
  const timezoneOffset: number = 2 * 60;
  const timezoneOffsetIsNegative = false;

  const openingSeconds = [
    toSeconds(0), // SUNDAY
    toSeconds(0), // MONDAY
    toSeconds(10), // TUESDAY
    toSeconds(10), // WEDNESDAY
    toSeconds(10), // THURSDAY
    toSeconds(10), // FRIDAY
    toSeconds(0), // SATURDAY
  ];
  const closingSeconds = [
    toSeconds(0), // SUNDAY
    toSeconds(24), // MONDAY
    toSeconds(18), // TUESDAY
    toSeconds(18), // WEDNESDAY
    toSeconds(18), // THURSDAY
    toSeconds(18), // FRIDAY
    toSeconds(0), // SATURDAY
  ];

  let adminSigner: SignerWithAddress;
  let trustedSourceSigner: SignerWithAddress;

  let trustedTimezoneOffsetSourceInstance: TrustedTimezoneOffsetSource;
  let businessHoursInstance: BusinessHoursValidation;

  before(async () => {
    [adminSigner, trustedSourceSigner] = await ethers.getSigners();

    const offsetParams: TimezoneOffset = [
      TIMEZONE_ID,
      timezoneOffset,
      timezoneOffsetIsNegative,
    ];

    ({
      businessHours: businessHoursInstance,
      trustedTimezoneSource: trustedTimezoneOffsetSourceInstance,
    } = await deployBusinessHoursContracts(adminSigner, offsetParams));
  });

  describe('Timezone Oracle: Add trusted supplier', () => {
    it('should add a trusted offset data supplier ', async () => {
      const supplier = trustedSourceSigner.address;
      const tx = await trustedTimezoneOffsetSourceInstance
        .connect(adminSigner)
        .modifyPermittedCallersList(supplier, true);
      await tx.wait();

      const isAuthorized =
        await trustedTimezoneOffsetSourceInstance.authorizedSupplier(supplier);
      check(isAuthorized, true);
    });
  });

  describe('Business Hours Artifact: Initialization', () => {
    it('should init Business hours artifact', async () => {
      const openingSecondsUint24List = SolidityUint24ListType.create([
        ...openingSeconds,
      ]);
      const closingSecondsUint24List = SolidityUint24ListType.create([
        ...closingSeconds,
      ]);
      const trustedTimezoneSourceAddress = SolidityAddressType.create(
        await trustedTimezoneOffsetSourceInstance.getAddress(),
      );

      const init = InitParams.create(businessHoursInstance).add(
        TIMEZONE_ID,
        trustedTimezoneSourceAddress,
        openingSecondsUint24List,
        closingSecondsUint24List,
      );

      const correctInitTx = await businessHoursInstance.init(init.params);
      const initTimestamp = await time.latest();
      await expect(correctInitTx)
        .to.emit(businessHoursInstance, 'BusinessHoursInited')
        .withArgs(initTimestamp);

      const incorrectInitTx = businessHoursInstance.init(init.params);
      await expect(incorrectInitTx).to.be.revertedWith('PD-003');
    });
  });

  describe('Business Hours Artifact: Check if business is open', () => {
    describe('failure', () => {
      let businessHoursInstance: BusinessHoursValidation;
      let openingSecondsUint24List: SolidityUint24ListType;
      let closingSecondsUint24List: SolidityUint24ListType;
      let trustedTimezoneSourceAddress: SolidityAddressType;

      before(async () => {
        let trustedTimezoneOffsetSourceInstance: TrustedTimezoneOffsetSource;
        const offsetParams: TimezoneOffset = [
          TIMEZONE_ID,
          timezoneOffset,
          timezoneOffsetIsNegative,
        ];

        ({
          businessHours: businessHoursInstance,
          trustedTimezoneSource: trustedTimezoneOffsetSourceInstance,
        } = await deployBusinessHoursContracts(adminSigner, offsetParams));

        openingSecondsUint24List = SolidityUint24ListType.create([
          ...openingSeconds,
        ]);
        closingSecondsUint24List = SolidityUint24ListType.create([
          ...closingSeconds,
        ]);
        trustedTimezoneSourceAddress = SolidityAddressType.create(
          await trustedTimezoneOffsetSourceInstance.getAddress(),
        );
      });

      it('when closing time is earlier than opening time', async () => {
        openingSecondsUint24List.uintArray[0] = 5;
        closingSecondsUint24List.uintArray[0] = 4;

        const init = InitParams.create(businessHoursInstance).add(
          TIMEZONE_ID,
          trustedTimezoneSourceAddress,
          openingSecondsUint24List,
          closingSecondsUint24List,
        );

        const incorrectInitTx = businessHoursInstance.init(init.params);
        await expect(incorrectInitTx).to.be.revertedWith('BH-005');
      });

      it('when opening period during single day last less than 60 seconds', async () => {
        openingSecondsUint24List.uintArray[0] = 40;
        closingSecondsUint24List.uintArray[0] = 50;

        const init = InitParams.create(businessHoursInstance).add(
          TIMEZONE_ID,
          trustedTimezoneSourceAddress,
          openingSecondsUint24List,
          closingSecondsUint24List,
        );

        const incorrectInitTx = businessHoursInstance.init(init.params);
        await expect(incorrectInitTx).to.be.revertedWith('BH-006');
      });

      it('when closing time passed as seconds is higher than 24 * 3600 (one day in seconds)', async () => {
        openingSecondsUint24List.uintArray[0] = 40;
        closingSecondsUint24List.uintArray[0] = 86401;

        const init = InitParams.create(businessHoursInstance).add(
          TIMEZONE_ID,
          trustedTimezoneSourceAddress,
          openingSecondsUint24List,
          closingSecondsUint24List,
        );

        const incorrectInitTx = businessHoursInstance.init(init.params);
        await expect(incorrectInitTx).to.be.revertedWith('BH-004');
      });
    });

    describe('success', () => {
      it('when open at 23:59:59 on Monday, 23 January 2040 23:59:59 GMT+02:00 (Kyiv)', async () => {
        // Monday, 23 January 2040 23:59:59 GMT+02:00 (Kyiv)
        const nextTimeStamp = 2210968799;
        await time.increaseTo(nextTimeStamp);

        const encodedResult = await businessHoursInstance.exec(
          MockedExecParams.make({ argsCount: 0 }).params,
        );
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, true);
      });

      it(`when open on Monday 23 January 2040 at 24 pm due to 24:00:00 --> 23:59:59 transform
              (last second does not count if 24 pm supplied)`, async () => {
        // Tuesday, 24 January 2040 00:00:00 GMT+02:00 (Kyiv)
        const nextTimeStamp = 2210968800;
        await time.increaseTo(nextTimeStamp);

        const encodedResult = await businessHoursInstance.exec(
          MockedExecParams.make({ argsCount: 0 }).params,
        );
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, false);
      });

      it('when closed before the Tuesday, 24 January 2040 08:00:00 GMT+02:00 (Kyiv)', async () => {
        // Tuesday, 24 January 2040 08:00:00 GMT+02:00 (Kyiv)
        const nextTimeStamp = 2210997600;
        await time.increaseTo(nextTimeStamp);

        const encodedResult = await businessHoursInstance.exec(
          MockedExecParams.make({ argsCount: 0 }).params,
        );
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, false);
      });

      it('when open on the Tuesday, 24 January 2040 12:00:00 GMT+02:00 (Kyiv)', async () => {
        // Tuesday, 24 January 2040 12:00:00 GMT+02:00 (Kyiv)
        const nextTimeStamp = 2211012000;
        await time.increaseTo(nextTimeStamp);

        const encodedResult = await businessHoursInstance.exec(
          MockedExecParams.make({ argsCount: 0 }).params,
        );
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, true);
      });

      it('when closed after the Tuesday, 24 January 2040 18:03:00 GMT+02:00 (Kyiv)', async () => {
        // Tuesday, 24 January 2040 18:03:00 GMT+02:00 (Kyiv)
        const nextTimeStamp = 2211033780;
        await time.increaseTo(nextTimeStamp);

        const encodedResult = await businessHoursInstance.exec(
          MockedExecParams.make({ argsCount: 0 }).params,
        );
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, false);
      });

      it('when closed on Saturday, 28 January 2040 14:00:00 GMT+02:00 (Kyiv)', async () => {
        // Saturday, 28 January 2040 14:00:00 GMT+02:00 (Kyiv)
        const nextTimeStamp = 2211364800;
        await time.increaseTo(nextTimeStamp);

        const encodedResult = await businessHoursInstance.exec(
          MockedExecParams.make({ argsCount: 0 }).params,
        );
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, false);
      });
    });
  });
});
