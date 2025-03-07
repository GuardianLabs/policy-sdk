import { Signer, TransactionRequest } from 'ethers';
import { PolicyHandler } from '../..';
import { IFeeProvider, IValidator } from '../interfaces/common-interfaces';
import { StaticValidator } from './StaticValidator';

export class Validator implements IValidator {
  constructor(private feeProvider: IFeeProvider) {}

  async validateSenderBalance(
    signerWithProvider: Signer,
    tx: TransactionRequest,
  ): Promise<void> {
    return StaticValidator.validateSenderBalance(
      signerWithProvider,
      tx,
      await this.feeProvider.getFeeData(),
    );
  }

  async validateAdminAccess(
    adminAddress: string,
    gateway: PolicyHandler,
  ): Promise<void> {
    return StaticValidator.validateAdminAccess(adminAddress, gateway);
  }
}
