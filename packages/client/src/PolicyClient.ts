import {
  ExecVariablesStruct,
  InitParamsStruct,
  PolicyHandler,
} from '@guardian-network/policy-contracts';
import { Signer } from 'ethers';
import { AbstractPolicyClient } from './base-client';
import { TryCatch } from './decorators';
import { BuildExisting, Flow } from './errors/error-codes.enum';
import { connectGraph } from './helpers';
import { IFeeProvider, IValidator } from './interfaces';
import { createSafeSigner, StaticValidator, Validator } from './validator';

// Policy client with validations and error handling
export class PolicyClient extends AbstractPolicyClient {
  protected static build<R>(
    this: new (
      adminSigner: Signer,
      gateway: PolicyHandler,
      feeProvider: IFeeProvider,
      validator?: IValidator,
    ) => R,
    adminSigner: Signer,
    policyHandler: PolicyHandler,
    feeProvider: IFeeProvider,
    validator?: IValidator,
  ): R {
    return new this(adminSigner, policyHandler, feeProvider, validator);
  }

  @TryCatch(BuildExisting.FROM_POLICY)
  static async buildFromPolicyInstance(
    instanceAddress: string,
    adminSigner: Signer,
    feeProvider: IFeeProvider,
  ) {
    const gateway = connectGraph(instanceAddress, adminSigner);

    await StaticValidator.validateAdminAccess(
      await adminSigner.getAddress(),
      gateway,
    );

    return this.build(adminSigner, gateway, feeProvider);
  }

  @TryCatch(BuildExisting.FROM_POLICY_WITH_CONFIG)
  static async buildFromPolicyInstanceWithConfig(
    instanceAddress: string,
    adminSigner: Signer,
    config: InitParamsStruct,
    feeProvider: IFeeProvider,
  ) {
    const client = await this.buildFromPolicyInstance(
      instanceAddress,
      adminSigner,
      feeProvider,
    );
    client.initialize(config);

    return client;
  }

  constructor(
    adminSigner: Signer,
    policyHandler: PolicyHandler,
    protected feeProvider: IFeeProvider,
    protected validator: IValidator = new Validator(feeProvider),
  ) {
    super(adminSigner, policyHandler);

    this.setSigner(createSafeSigner(this.signer, this.validator));
  }

  @TryCatch(Flow.INITIALIZE)
  public async initialize(policyConfig: InitParamsStruct): Promise<void> {
    return super.initialize(policyConfig);
  }

  @TryCatch(Flow.RESET_POLICY)
  public async reset(policyConfig: InitParamsStruct): Promise<void> {
    return super.reset(policyConfig);
  }

  @TryCatch(Flow.EVALUATE)
  public async evaluate(variables: ExecVariablesStruct[]): Promise<boolean> {
    return super.evaluate(variables);
  }

  @TryCatch(Flow.EVALUATE_DRY_RUN)
  public async evaluateDryRun(
    variables: ExecVariablesStruct[],
  ): Promise<boolean> {
    return super.evaluateDryRun(variables);
  }
}
