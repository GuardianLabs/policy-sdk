import { faker } from '@faker-js/faker';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { time } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  pickNextClosedTime,
  pickNextOpenTime,
  TimezoneOffset,
  toSeconds,
} from './business-hours';
import {
  SolidityAddressType,
  SolidityBytesType,
  SolidityUint24ListType,
} from './solidity-types';
import { check } from './test-helpers';
import {
  AND,
  BusinessHoursValidation,
  CurrentTimestamp,
  EqualAddress,
  EqualBytes,
  EqualString,
  EqualUint,
  GteUint,
  GtUint,
  IsDividableUint,
  Keccak256String,
  Keccak256Uint,
  LteUint,
  LtUint,
  NOT,
  OR,
  TrustedTimezoneOffsetSource,
  XOR,
} from './types';
import {
  deployArtifacts,
  deployBusinessHoursContracts,
  keccak256Hash,
  randomBoolean,
  randomEthAddress,
  randomHex,
  randomString,
  randomUint,
  solidityDecodeSingleParam,
} from './utils';
import {
  ExecParams,
  InitParams,
  MockedExecParams,
  UnnormalizedExecParams,
} from './utils/init-exec-arguments';

describe('Artifacts: Pre defined', () => {
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
  // utils
  let isDividableUintArtifact: IsDividableUint;
  let currentTimestampArtifact: CurrentTimestamp;

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
    isDividableUintArtifact = isDividiableUint;
    currentTimestampArtifact = currentTimestamp;
  });

  describe('Logical', () => {
    describe('AND', () => {
      it('success', async () => {
        const exec = await ExecParams.createWithDescriptor(
          andArtifact,
          false,
          true,
        );
        let encodedResult = await andArtifact.exec(exec.params);
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, false);

        exec.clear().add(true, true);
        encodedResult = await andArtifact.exec(exec.params);
        const decoded2 = solidityDecodeSingleParam('bool', encodedResult);
        check(decoded2, true);
      });

      it('failure', async () => {
        const exec = MockedExecParams.make({
          argsCount: 3,
          defaultValue: true,
        });

        await expect(andArtifact.exec(exec.params)).to.be.revertedWith(
          'PD-001',
        );
      });
    });

    describe('NOT', () => {
      it('success', async () => {
        const exec = UnnormalizedExecParams.create(
          await notArtifact.getExecDescriptor(),
          false,
        );
        const encodedResult = await notArtifact.exec(exec.params);
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, true);
      });

      it('failure', async () => {
        const exec = MockedExecParams.make({ argsCount: 2 });

        await expect(notArtifact.exec(exec.params)).to.be.revertedWith(
          'PD-001',
        );
      });
    });

    describe('OR', () => {
      it('success', async () => {
        const exec = (await ExecParams.createWithDescriptor(orArtifact)).add(
          true,
          false,
        );
        const encodedResult = await orArtifact.exec(exec.params);
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, true);
      });

      it('failure', async () => {
        const exec = MockedExecParams.make({ argsCount: 3 });

        await expect(orArtifact.exec(exec.params)).to.be.revertedWith('PD-001');
      });
    });

    describe('XOR', () => {
      it('success', async () => {
        const exec = (await ExecParams.createWithDescriptor(xorArtifact)).add(
          true,
          true,
        );
        const encodedResult = await xorArtifact.exec(exec.params);
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, false);
      });

      it('failure', async () => {
        const exec = MockedExecParams.make({
          defaultValue: randomBoolean(),
        });

        await expect(xorArtifact.exec(exec.params)).to.be.revertedWith(
          'PD-001',
        );
      });
    });
  });

  describe('Hashing', () => {
    describe('Keccak256: String', () => {
      it('success', async () => {
        const toHash = faker.commerce.product();
        const exec = ExecParams.create(
          await keccakStringArtifact.getExecDescriptor(),
          toHash,
        );
        const encodedResult = await keccakStringArtifact.exec(exec.params);
        const decodedResult = solidityDecodeSingleParam(
          'bytes32',
          encodedResult,
        );

        const expectedResult = keccak256Hash(['string'], [toHash]);
        check(decodedResult, expectedResult);
      });

      it('failure', async () => {
        const exec = MockedExecParams.make({
          argsCount: 2,
          defaultValue: randomString(),
        });

        await expect(keccakStringArtifact.exec(exec.params)).to.be.revertedWith(
          'PD-001',
        );
      });
    });

    describe('Keccak256: Uint', () => {
      it('success', async () => {
        const toHash = randomUint();
        const exec = await ExecParams.createWithDescriptor(
          keccakUintArtifact,
          toHash,
        );
        const encodedResult = await keccakUintArtifact.exec(exec.params);
        const decodedResult = solidityDecodeSingleParam(
          'bytes32',
          encodedResult,
        );

        const expectedResult = keccak256Hash(['uint256'], [toHash]);
        check(decodedResult, expectedResult);
      });

      it('failure', async () => {
        const exec = MockedExecParams.make({
          argsCount: 2,
          defaultValue: randomUint(),
        });

        await expect(keccakUintArtifact.exec(exec.params)).to.be.revertedWith(
          'PD-001',
        );
      });
    });
  });

  describe('Comparison', () => {
    describe('Greater than or equal uint', () => {
      it('success', async () => {
        const exec = ExecParams.create(
          await gteUintArtifact.getExecDescriptor(),
        ).add(10, 10);
        const encodedResult = await gteUintArtifact.exec(exec.params);
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, true);
      });

      it('failure', async () => {
        const exec = MockedExecParams.make({
          argsCount: 3,
          defaultValue: randomUint(),
        });

        await expect(gteUintArtifact.exec(exec.params)).to.be.revertedWith(
          'PD-001',
        );
      });
    });

    describe('Greater than uint', () => {
      it('success', async () => {
        const exec = ExecParams.create(
          await gtUintArtifact.getExecDescriptor(),
        ).add(15, 10);
        const encodedResult = await gtUintArtifact.exec(exec.params);
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, true);
      });

      it('failure', async () => {
        const exec = MockedExecParams.make({
          argsCount: 3,
          defaultValue: randomUint(),
        });

        await expect(gtUintArtifact.exec(exec.params)).to.be.revertedWith(
          'PD-001',
        );
      });
    });

    describe('Less than or equal uint', () => {
      it('success', async () => {
        const exec = ExecParams.create(
          await lteUintArtifact.getExecDescriptor(),
        ).add(10, 10);
        const encodedResult = await lteUintArtifact.exec(exec.params);
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, true);
      });

      it('failure', async () => {
        const exec = MockedExecParams.make({
          argsCount: 3,
          defaultValue: randomUint(),
        });

        await expect(lteUintArtifact.exec(exec.params)).to.be.revertedWith(
          'PD-001',
        );
      });
    });

    describe('Less than uint', () => {
      it('success', async () => {
        let encodedResult = await ltUintArtifact.exec(
          ExecParams.create(await ltUintArtifact.getExecDescriptor(), 9, 10)
            .params,
        );
        let decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, true);

        encodedResult = await ltUintArtifact.exec(
          ExecParams.create(await ltUintArtifact.getExecDescriptor(), 10, 10)
            .params,
        );
        decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, false);
      });

      it('failure', async () => {
        const exec = MockedExecParams.make({
          argsCount: 3,
          defaultValue: randomUint(),
        });

        await expect(ltUintArtifact.exec(exec.params)).to.be.revertedWith(
          'PD-001',
        );
      });
    });

    describe('Equal uints', () => {
      it('success', async () => {
        const paramA = randomUint();
        const paramB = paramA;
        const exec = ExecParams.create(
          await equalUintsArtifact.getExecDescriptor(),
          paramA,
          paramB,
        );

        const encodedResult = await equalUintsArtifact.exec(exec.params);
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, true);
      });

      it('failure', async () => {
        const exec = MockedExecParams.make({
          argsCount: 3,
          defaultValue: randomUint(),
        });

        await expect(equalUintsArtifact.exec(exec.params)).to.be.revertedWith(
          'PD-001',
        );
      });
    });

    describe('Equal Addresses', () => {
      it('success', async () => {
        const mockedAddress = randomEthAddress();
        const paramA = SolidityAddressType.create(mockedAddress);
        const paramB = SolidityAddressType.create(mockedAddress);
        const exec = ExecParams.create(
          await equalAddressesArtifact.getExecDescriptor(),
          paramA,
          paramB,
        );

        const encodedResult = await equalAddressesArtifact.exec(exec.params);
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, true);
      });

      it('failure', async () => {
        const exec = MockedExecParams.make({
          argsCount: 3,
          defaultValue: SolidityAddressType.create(randomEthAddress()),
        });

        await expect(
          equalAddressesArtifact.exec(exec.params),
        ).to.be.revertedWith('PD-001');
      });
    });

    describe('Equal strings', () => {
      it('success', async () => {
        const paramA = randomString();
        const paramB = paramA;
        const exec = ExecParams.create(
          await equalStringsArtifact.getExecDescriptor(),
          paramA,
          paramB,
        );

        const encodedResult = await equalStringsArtifact.exec(exec.params);
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, true);
      });

      it('failure', async () => {
        const exec = MockedExecParams.make({
          argsCount: 3,
          defaultValue: randomString(),
        });

        await expect(equalStringsArtifact.exec(exec.params)).to.be.revertedWith(
          'PD-001',
        );
      });
    });

    describe('Equal bytes', () => {
      it('success', async () => {
        const mockedBytesParams = randomHex();
        const paramA = SolidityBytesType.create(mockedBytesParams);
        const paramB = SolidityBytesType.create(mockedBytesParams);
        const exec = ExecParams.create(
          await equalBytesArtifact.getExecDescriptor(),
          paramA,
          paramB,
        );

        const encodedResult = await equalBytesArtifact.exec(exec.params);
        const decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, true);
      });

      it('failure', async () => {
        const exec = MockedExecParams.make({
          argsCount: 3,
          defaultValue: SolidityBytesType.create(randomHex()),
        });

        await expect(equalBytesArtifact.exec(exec.params)).to.be.revertedWith(
          'PD-001',
        );
      });
    });
  });

  describe('Utils artifacts', () => {
    let businessHoursArtifact: BusinessHoursValidation;
    let trustedTimezoneSourceOracle: TrustedTimezoneOffsetSource;

    let DEFAULT_SIGNER: SignerWithAddress;

    const TIMEZONE_ID = 'Europe/London';
    const DEFAULT_OFFSET_PARAMS: TimezoneOffset = [
      TIMEZONE_ID,
      /* offset in minutes */ 1 * 60,
      /* is negative offset */ false,
    ];

    before(async () => {
      [DEFAULT_SIGNER] = await ethers.getSigners();

      // 'DEFAULT_SIGNER' is also an initial admin of 'trustedTimezoneSourceOracle'
      const businessHoursDeployments = await deployBusinessHoursContracts(
        DEFAULT_SIGNER,
        DEFAULT_OFFSET_PARAMS,
      );

      trustedTimezoneSourceOracle =
        businessHoursDeployments.trustedTimezoneSource;
      businessHoursArtifact = businessHoursDeployments.businessHours;
    });

    describe('Arithmetical: Is dividiable uint', () => {
      it('success', async () => {
        const paramA = 5;
        const incorrectParamB = 4;
        const correctParamB = 5;

        const exec = (
          await ExecParams.createWithDescriptor(isDividableUintArtifact)
        ).add(paramA, correctParamB);
        let encodedResult = await isDividableUintArtifact.exec(exec.params);
        let decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, paramA % correctParamB === 0);

        exec.clear().add(paramA, incorrectParamB);
        encodedResult = await isDividableUintArtifact.exec(exec.params);
        decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, paramA % incorrectParamB === 0);
      });

      it('failure', async () => {
        const exec = MockedExecParams.make({
          argsCount: 3,
          defaultValue: randomUint(),
        });

        await expect(
          isDividableUintArtifact.exec(exec.params),
        ).to.be.revertedWith('PD-001');
      });
    });

    describe('Current timestamp', () => {
      it('success', async () => {
        const exec = await ExecParams.createWithDescriptor(
          currentTimestampArtifact,
        );
        const encodedResult = await currentTimestampArtifact.exec(exec.params);
        const decodedResult = solidityDecodeSingleParam(
          'uint256',
          encodedResult,
        );
        const expectedResult = BigInt(await time.latest());
        check(expectedResult, decodedResult);
      });
    });

    describe('Business Hours', () => {
      it('failure', async () => {
        const { businessHours: businessHoursArtifact } =
          await deployBusinessHoursContracts(DEFAULT_SIGNER);
        const exec = MockedExecParams.make({ argsCount: 0 });

        await expect(
          businessHoursArtifact.exec(exec.params),
        ).to.be.revertedWith('PD-002');
      });

      it('successful check', async () => {
        const openingSeconds = SolidityUint24ListType.create(
          new Array<number>(7).fill(toSeconds(10)), // every day open from 10 am
        );
        const closingSeconds = SolidityUint24ListType.create(
          new Array<number>(7).fill(toSeconds(18)), // closed at 6 pm daily
        );
        const trustedTimezoneSourceAddress = SolidityAddressType.create(
          await trustedTimezoneSourceOracle.getAddress(),
        );

        const init = InitParams.create(
          await businessHoursArtifact.getInitDescriptor(),
          TIMEZONE_ID,
          trustedTimezoneSourceAddress,
          openingSeconds,
          closingSeconds,
        );
        const tx = await businessHoursArtifact.init(init.params);
        await tx.wait();

        // note: check if open
        const nextOpenTime = pickNextOpenTime(
          openingSeconds.value,
          closingSeconds.value,
          DEFAULT_OFFSET_PARAMS,
          await time.latest(),
        );
        await time.increaseTo(nextOpenTime);

        let encodedResult = await businessHoursArtifact.exec(
          (await ExecParams.createWithDescriptor(businessHoursArtifact)).params,
        );
        let decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, true);

        // note: check if closed
        const nextClosedTime = pickNextClosedTime(
          openingSeconds.value,
          closingSeconds.value,
          DEFAULT_OFFSET_PARAMS,
          await time.latest(),
        );
        await time.increaseTo(nextClosedTime);

        encodedResult = await businessHoursArtifact.exec(
          ExecParams.create(await businessHoursArtifact.getExecDescriptor())
            .params,
        );
        decodedResult = solidityDecodeSingleParam('bool', encodedResult);
        check(decodedResult, false);
      });
    });
  });
});
