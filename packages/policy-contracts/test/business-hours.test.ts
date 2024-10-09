import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { time } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { ethers } from 'hardhat';
import { TrustedTimezoneOffsetSource } from './types';
// import { BusinessHoursValidation, TrustedTimezoneOffsetSource } from './types';
import { expect } from 'chai';
import { check } from './test-helpers';
import { deployBusinessHoursContracts } from './utils';
import { toSeconds } from './utils/business-hours';

const deployBusinessHoursInstance = async (...args: any[]): Promise<any> => {};

describe('BusinessHours', () => {
  const timezoneId: string = 'Europe/Kyiv';
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

  let arbitrarySigner: SignerWithAddress;
  let adminSigner: SignerWithAddress;
  let trustedSourceSigner: SignerWithAddress;

  let trustedTimezoneOffsetSourceInstance: TrustedTimezoneOffsetSource;
  let businessHoursInstance: any /* BusinessHoursValidation */;

  before(async () => {
    [arbitrarySigner, adminSigner, trustedSourceSigner] =
      await ethers.getSigners();

    // deploy bh-related instances
    const instances = await deployBusinessHoursContracts(adminSigner);
    trustedTimezoneOffsetSourceInstance = instances.trustedTimezoneSource;

    // add trusted supplier
    const addTrustedSourceTx = await trustedTimezoneOffsetSourceInstance
      .connect(adminSigner)
      .modifyPermittedCallersList(trustedSourceSigner.address, true);

    await addTrustedSourceTx.wait();

    // provide the offset to the trusted source using authorized supplier
    const provideOffsetTx = await trustedTimezoneOffsetSourceInstance
      .connect(adminSigner)
      .supplyTimezoneOffset(
        timezoneId,
        timezoneOffset,
        timezoneOffsetIsNegative,
      );

    await provideOffsetTx.wait();

    businessHoursInstance = await deployBusinessHoursInstance(
      arbitrarySigner,
      timezoneId,
      (await trustedTimezoneOffsetSourceInstance.getAddress()).slice(2),
      openingSeconds,
      closingSeconds,
    );
  });

  describe('#checkBusinessHours', () => {
    describe('successful call', () => {
      it('should be open at 23:59:59 on Monday', async () => {
        // Monday, 23 January 2040 23:59:59 GMT+02:00 (Kyiv)
        const nextTimeStamp = 2210968799;
        await time.increaseTo(nextTimeStamp);

        check(await businessHoursInstance.checkBusinessHours(), true);
      });

      it('should be open on Monday at 24 pm due to 24:00:00 --> 23:59:59 transform (last second does not count if 24 pm supplied)', async () => {
        // Tuesday, 24 January 2040 00:00:00 GMT+02:00 (Kyiv)
        const nextTimeStamp = 2210968800;
        await time.increaseTo(nextTimeStamp);

        check(await businessHoursInstance.checkBusinessHours(), false);
      });

      it('should be closed before the Tuesaday business hours', async () => {
        // Tuesday, 24 January 2040 08:00:00 GMT+02:00 (Kyiv)
        const nextTimeStamp = 2210997600;
        await time.increaseTo(nextTimeStamp);

        check(await businessHoursInstance.checkBusinessHours(), false);
      });

      it('should be open on the Tuesday business hours', async () => {
        // Tuesday, 24 January 2040 12:00:00 GMT+02:00 (Kyiv)
        const nextTimeStamp = 2211012000;
        await time.increaseTo(nextTimeStamp);

        check(await businessHoursInstance.checkBusinessHours(), true);
      });

      it('should be closed after the Tuesday business hours', async () => {
        // Tuesday, 24 January 2040 18:03:00 GMT+02:00 (Kyiv)
        const nextTimeStamp = 2211033780;
        await time.increaseTo(nextTimeStamp);

        check(await businessHoursInstance.checkBusinessHours(), false);
      });

      it('should be closed on Saturday', async () => {
        // Saturday, 28 January 2040 14:00:00 GMT+02:00 (Kyiv)
        const nextTimeStamp = 2211364800;
        await time.increaseTo(nextTimeStamp);

        check(await businessHoursInstance.checkBusinessHours(), false);
      });
    });

    describe('failure', () => {
      it('when closing time is earlier than opening time', async () => {
        openingSeconds[0] = 5;
        closingSeconds[0] = 4;

        await expect(
          deployBusinessHoursInstance(
            arbitrarySigner,
            timezoneId,
            (await trustedTimezoneOffsetSourceInstance.getAddress()).slice(2),
            openingSeconds,
            closingSeconds,
          ),
        ).to.be.revertedWith('BH-4');
      });

      it('when time passed in hours, not in seconds', async () => {
        openingSeconds[0] = 40;
        closingSeconds[0] = 50;

        await expect(
          deployBusinessHoursInstance(
            arbitrarySigner,
            timezoneId,
            (await trustedTimezoneOffsetSourceInstance.getAddress()).slice(2),
            openingSeconds,
            closingSeconds,
          ),
        ).to.be.revertedWith('BH-6');
      });

      it('when closing time passed as seconds is higher than 24 * 3600 (one day in seconds)', async () => {
        openingSeconds[0] = 40;
        closingSeconds[0] = 86401;

        await expect(
          deployBusinessHoursInstance(
            arbitrarySigner,
            timezoneId,
            (await trustedTimezoneOffsetSourceInstance.getAddress()).slice(2),
            openingSeconds,
            closingSeconds,
          ),
        ).to.be.revertedWith('BH-3');
      });
    });
  });
});
