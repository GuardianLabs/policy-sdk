import { InitParamsStruct } from '@guardian-network/policy-contracts/src';
import { Signer } from 'ethers';
import { PolicyClient } from './PolicyClient';
import { TryCatch } from './decorators';
import { BuildNew } from './errors/error-codes.enum';
import { IFeeProvider } from './interfaces';
import { PolicyDeployer } from './policy-deployer';
import { createSafeSigner, Validator } from './validator';

// note: this is expected behaviour when PolicyClient does not usually deploy but instead consumes already deployed instances of
// artifacts-graph (see PolicyClient class); still under certain circumstances, it is convenient to deploy and use the new PolicyClient immediatelly, which
// is reflected in the following class
export class PolicyClientBuildable extends PolicyClient {
  // todo: add buildFromMnemonic buliding method

  // todo: add buildFromDsl building method

  @TryCatch(BuildNew.FROM_EMPTY_POLICY)
  static async buildEmptyPolicy(
    // todo: create safeSigner through a param decorator which also consumer other surrounding params such as fee provider
    adminSigner: Signer, // also a deploy signer
    feeProvider: IFeeProvider,
    policyDeployer: PolicyDeployer = new PolicyDeployer(adminSigner),
  ) {
    const safeAdminSigner = createSafeSigner(
      adminSigner,
      new Validator(feeProvider),
    );

    const policyHandler = await policyDeployer.deployPolicy(
      await safeAdminSigner.getAddress(),
    );

    return this.build(safeAdminSigner, policyHandler, feeProvider);
  }

  @TryCatch(BuildNew.FROM_EMPTY_POLICY_WITH_CONFIG)
  static async buildConfiguredPolicy(
    adminSigner: Signer, // also a deploy signer
    config: InitParamsStruct,
    feeProvider: IFeeProvider,
    policyDeployer: PolicyDeployer = new PolicyDeployer(adminSigner),
  ) {
    const safeAdminSigner = createSafeSigner(
      adminSigner,
      new Validator(feeProvider),
    );

    const gateway = await policyDeployer.deployAndConfigure(
      await safeAdminSigner.getAddress(),
      config,
    );

    return this.build(safeAdminSigner, gateway, feeProvider);
  }
}
