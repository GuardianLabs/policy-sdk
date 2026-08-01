import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { check } from './test-helpers';
import {
  AND,
  ApprovalFlow,
  BasicTimeSource,
  BusinessHoursValidation,
  DestinationBlacklist,
  DestinationWhitelist,
  EqualAddress,
  EqualBytes,
  EqualString,
  EqualUint,
  GtUint,
  GteUint,
  IsDividableUint,
  Keccak256String,
  Keccak256Uint,
  LtUint,
  LteUint,
  NOT,
  OR,
  XOR,
} from './types';
import {
  deployApprovalFlowInstance,
  deployArtifacts,
  deployBusinessHoursInstance,
} from './utils';

// note: can be skipped to speed up test running
describe('Artifacts: Description getter', () => {
  let adminSigner: SignerWithAddress;

  // Comparison artifacts
  let equalAddress: EqualAddress;
  let equalBytes: EqualBytes;
  let equalString: EqualString;
  let equalUint: EqualUint;
  let gtUint: GtUint;
  let gteUint: GteUint;
  let ltUint: LtUint;
  let lteUint: LteUint;

  // Logical artifacts
  let and: AND;
  let or: OR;
  let xor: XOR;
  let not: NOT;

  // Hash artifacts
  let keccak256String: Keccak256String;
  let keccak256Uint: Keccak256Uint;

  // Arithmetic artifacts
  let isDividableUint: IsDividableUint;

  // Utils artifacts
  let currentTimestamp: BasicTimeSource;
  let businessHoursValidation: BusinessHoursValidation;
  let destinationBlacklist: DestinationBlacklist;
  let destinationWhitelist: DestinationWhitelist;

  // Stateful artifacts
  let approvalFlow: ApprovalFlow;

  before(async () => {
    [adminSigner] = await ethers.getSigners();

    // Deploy all artifacts
    const artifacts = await deployArtifacts(adminSigner);
    equalAddress = artifacts.equalAddresses;
    equalBytes = artifacts.equalBytes;
    equalString = artifacts.equalString;
    equalUint = artifacts.equalUint;
    gtUint = artifacts.gtUint;
    gteUint = artifacts.gteUint;
    ltUint = artifacts.ltUint;
    lteUint = artifacts.lteUint;
    and = artifacts.and;
    or = artifacts.or;
    xor = artifacts.xor;
    not = artifacts.not;
    keccak256String = artifacts.keccak256String;
    keccak256Uint = artifacts.keccak256Uint;
    isDividableUint = artifacts.isDividiableUint;
    currentTimestamp = artifacts.currentTimestamp;
    destinationBlacklist = artifacts.destinationBlacklist;
    destinationWhitelist = artifacts.destinationWhitelist;

    businessHoursValidation = await deployBusinessHoursInstance(adminSigner);

    const approvalFlowDeployment =
      await deployApprovalFlowInstance(adminSigner);
    approvalFlow = approvalFlowDeployment.approvalFlow;
  });

  describe('Logical Artifacts', () => {
    it('should have correct description for logical artifacts', async () => {
      const andDesc = await and.description();
      check(
        andDesc,
        'Stateless artifact: used to perform logical AND operation on two boolean values. First parameter - argA, second one - argB. Returns bool representing (argA && argB).',
      );

      const orDesc = await or.description();
      check(
        orDesc,
        'Stateless artifact: used to perform logical OR operation on two boolean values. First parameter - argA, second one - argB. Returns bool representing (argA || argB).',
      );

      const xorDesc = await xor.description();
      check(
        xorDesc,
        'Stateless artifact: used to perform logical XOR operation on two boolean values. First parameter - argA, second one - argB. Returns bool representing exclusive OR (true when exactly one argument is true).',
      );

      const notDesc = await not.description();
      check(
        notDesc,
        'Stateless artifact: used to perform logical NOT operation on a boolean value. Parameter - argA. Returns bool representing (!argA).',
      );
    });
  });

  describe('Comparison Artifacts', () => {
    it('should have correct description for EqualAddress', async () => {
      const desc = await equalAddress.description();
      check(
        desc,
        'Stateless artifact: used to compare two addresses. First address parameter - argA, second one - argB. Returns bool representing whether two address arguments are equal or not.',
      );
    });

    it('should have correct description for EqualBytes', async () => {
      const desc = await equalBytes.description();
      check(
        desc,
        'Stateless artifact: used to compare two bytes values. First address parameter - argA, second one - argB. Returns bool representing whether hashes of two bytes arguments are equal or not.',
      );
    });

    it('should have correct description for EqualString', async () => {
      const desc = await equalString.description();
      check(
        desc,
        'Stateless artifact: used to compare two string values. First parameter - argA, second one - argB. Returns bool representing whether hashes of two string arguments are equal or not.',
      );
    });

    it('should have correct description for EqualUint', async () => {
      const desc = await equalUint.description();
      check(
        desc,
        'Stateless artifact: used to compare two uint values. First parameter - argA, second one - argB. Returns bool representing whether two uint arguments are equal or not.',
      );
    });

    it('should have correct description for Uint comparison artifacts', async () => {
      const gtDesc = await gtUint.description();
      check(
        gtDesc,
        'Stateless artifact: used to check if first uint is greater than second uint. First parameter - argA, second one - argB. Returns bool representing whether argA > argB.',
      );

      const gteDesc = await gteUint.description();
      check(
        gteDesc,
        'Stateless artifact: used to check if first uint is greater than or equal to second uint. First parameter - argA, second one - argB. Returns bool representing whether argA >= argB.',
      );

      const ltDesc = await ltUint.description();
      check(
        ltDesc,
        'Stateless artifact: used to check if first uint is less than second uint. First parameter - argA, second one - argB. Returns bool representing whether argA < argB.',
      );

      const lteDesc = await lteUint.description();
      check(
        lteDesc,
        'Stateless artifact: used to check if first uint is less than or equal to second uint. First parameter - argA, second one - argB. Returns bool representing whether argA <= argB.',
      );
    });
  });

  describe('Hash Artifacts', () => {
    it('should have correct description for hash artifacts', async () => {
      const stringHashDesc = await keccak256String.description();
      check(
        stringHashDesc,
        'Stateless artifact: used to compute keccak256 hash of a string value. Parameter - string value to hash. Returns bytes representing the computed hash.',
      );

      const uintHashDesc = await keccak256Uint.description();
      check(
        uintHashDesc,
        'Stateless artifact: used to compute keccak256 hash of a uint value. Parameter - uint value to hash. Returns bytes representing the computed hash.',
      );
    });
  });

  describe('Arithmetic Artifacts', () => {
    it('should have correct description for IsDividableUint', async () => {
      const desc = await isDividableUint.description();
      check(
        desc,
        'Stateless artifact: used to check if first uint is evenly divisible by second uint. First parameter - argA, second one - argB. Returns bool representing whether argA % argB == 0.',
      );
    });
  });

  describe('Approval-flow Artifact', () => {
    it('should have correct description for ApprovalFlow', async () => {
      const desc = await approvalFlow.description();
      check(
        desc,
        'Stateful artifact: used to validate signatures from a predefined list of approvers. Requires a quorum of valid signatures to approve. First parameter - messageHash packed as bytes, second one - signatures packed as bytes array. Returns bool representing whether enough valid signatures were provided.',
      );
    });
  });

  describe('Utils Artifacts', () => {
    it('should have correct description for utility artifacts', async () => {
      const timestampDesc = await currentTimestamp.description();
      check(
        timestampDesc,
        'Stateless artifact: used to get current block timestamp. Returns uint256 representing current block timestamp in seconds.',
      );

      const businessHoursDesc = await businessHoursValidation.description();
      check(
        businessHoursDesc,
        'Stateful artifact: used to validate if current time falls within configured business hours for a specific timezone. Returns bool representing whether current time is within business hours.',
      );

      const blacklistDesc = await destinationBlacklist.description();
      check(
        blacklistDesc,
        'Stateful artifact: used to check if an address is blacklisted. Parameter - receiver address to check. Returns bool representing whether the address is blacklisted.',
      );

      const whitelistDesc = await destinationWhitelist.description();
      check(
        whitelistDesc,
        'Stateful artifact: used to check if an address is whitelisted. Parameter - receiver address to check. Returns bool representing whether the address is whitelisted.',
      );
    });
  });
});
