import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { TimezoneOffset } from '../../business-hours';
import {
  AND__factory,
  ArtifactsGraph__factory,
  BusinessHoursValidation,
  BusinessHoursValidation__factory,
  CurrentTimestamp__factory,
  DestinationBlacklist__factory,
  DestinationWhitelist__factory,
  EqualAddress__factory,
  EqualBytes__factory,
  EqualString__factory,
  EqualUint__factory,
  GteUint__factory,
  GtUint__factory,
  IsDividableUint__factory,
  Keccak256String__factory,
  Keccak256Uint__factory,
  LteUint__factory,
  LtUint__factory,
  NOT__factory,
  OR__factory,
  TrustedTimezoneOffsetSource,
  TrustedTimezoneOffsetSource__factory,
  XOR__factory,
} from '../../types';

type SupportedDeployments =
  | AND__factory
  | OR__factory
  | NOT__factory
  | BusinessHoursValidation__factory
  | XOR__factory
  | Keccak256Uint__factory
  | Keccak256String__factory
  | GteUint__factory
  | EqualAddress__factory
  | IsDividableUint__factory
  | LteUint__factory
  | LtUint__factory
  | EqualBytes__factory
  | EqualString__factory
  | GtUint__factory
  | EqualUint__factory
  | CurrentTimestamp__factory
  | BusinessHoursValidation__factory
  | DestinationWhitelist__factory;

export const deployArtifacts = async (deploySigner: SignerWithAddress) => {
  const and = await deployWithFactory(new AND__factory(deploySigner));
  const or = await deployWithFactory(new OR__factory(deploySigner));
  const not = await deployWithFactory(new NOT__factory(deploySigner));
  const xor = await deployWithFactory(new XOR__factory(deploySigner));
  const keccak256Uint = await deployWithFactory(
    new Keccak256Uint__factory(deploySigner),
  );
  const keccak256String = await deployWithFactory(
    new Keccak256String__factory(deploySigner),
  );
  const gteUint = await deployWithFactory(new GteUint__factory(deploySigner));
  const equalAddresses = await deployWithFactory(
    new EqualAddress__factory(deploySigner),
  );
  const isDividiableUint = await deployWithFactory(
    new IsDividableUint__factory(deploySigner),
  );
  const ltUint = await deployWithFactory(new LtUint__factory(deploySigner));
  const gtUint = await deployWithFactory(new GtUint__factory(deploySigner));
  const lteUint = await deployWithFactory(new LteUint__factory(deploySigner));
  const equalUint = await deployWithFactory(
    new EqualUint__factory(deploySigner),
  );
  const equalString = await deployWithFactory(
    new EqualString__factory(deploySigner),
  );
  const equalBytes = await deployWithFactory(
    new EqualBytes__factory(deploySigner),
  );
  const currentTimestamp = await deployWithFactory(
    new CurrentTimestamp__factory(deploySigner),
  );
  const businessHours = await deployWithFactory(
    new BusinessHoursValidation__factory(deploySigner),
  );
  const destinationWhitelist = await deployWithFactory(
    new DestinationWhitelist__factory(deploySigner),
  );
  const destinationBlacklist = await deployWithFactory(
    new DestinationBlacklist__factory(deploySigner),
  );

  return {
    and,
    or,
    not,
    keccak256Uint,
    xor,
    keccak256String,
    isDividiableUint,
    gteUint,
    equalAddresses,
    ltUint,
    lteUint,
    gtUint,
    equalUint,
    equalString,
    equalBytes,
    currentTimestamp,
    destinationWhitelist,
    destinationBlacklist,
    businessHours,
  };
};

const deployWithFactory = async <
  T extends SupportedDeployments,
  R extends Awaited<ReturnType<T['deploy']>>,
>(
  factory: T,
): Promise<R> => {
  const instance = await factory.deploy();
  await instance.waitForDeployment();

  return instance as R;
};

export const deployBusinessHoursContracts = async (
  deploySigner: SignerWithAddress,
  defaultOffsetParams?: TimezoneOffset,
): Promise<{
  trustedTimezoneSource: TrustedTimezoneOffsetSource;
  businessHours: BusinessHoursValidation;
}> => {
  const timezoneFactory = new TrustedTimezoneOffsetSource__factory(
    deploySigner,
  );
  const timezoneInstance = await timezoneFactory.deploy(deploySigner.address);
  await timezoneInstance.waitForDeployment();

  // set the offset-params if default params are supplied
  if (!!defaultOffsetParams) {
    const tx = await timezoneInstance.supplyTimezoneOffset(
      ...defaultOffsetParams,
    );
    await tx.wait();
  }

  // can go this way since 'BusinessHoursValidation' excludes constructor method
  const businessHoursInstance = await deployWithFactory(
    new BusinessHoursValidation__factory(deploySigner),
  );

  return {
    trustedTimezoneSource: timezoneInstance,
    businessHours: businessHoursInstance,
  };
};

// an explicit deploy-helper (just in case)
export const deployBusinessHoursInstance = async (
  deploySigner: SignerWithAddress,
): Promise<BusinessHoursValidation> => {
  return deployWithFactory(new BusinessHoursValidation__factory(deploySigner));
};

export const deployGraphAndArtifacts = async (
  deploySigner: SignerWithAddress,
) => {
  const artifacts = await deployArtifacts(deploySigner);

  const artifactsGraphFactory = new ArtifactsGraph__factory(deploySigner);
  const adminUser = deploySigner.address;
  const artifactsGraphInstance = await artifactsGraphFactory.deploy(adminUser);
  await artifactsGraphInstance.waitForDeployment();

  return {
    artifactsGraphInstance,
    ...artifacts,
  };
};
