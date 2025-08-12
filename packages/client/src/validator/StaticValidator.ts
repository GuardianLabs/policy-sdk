import { PolicyHandler } from '@guardian-network/policy-contracts';
import { Signer, TransactionRequest } from 'ethers';
import { extractUserAndTxData } from '../helpers';
import { FeeDataEip1559 } from '../types';
import { calculateActionPrice, minValue } from './tools.helper';

export class StaticValidator {
  static async validateSenderBalance(
    signerWithProvider: Signer,
    tx: TransactionRequest,
    feeData: FeeDataEip1559, // note: it is a class member when non-static
  ): Promise<void> {
    const { userBalance, estimatedTxGas, userAddress } =
      await extractUserAndTxData(signerWithProvider, tx);

    const transactionPrice = calculateActionPrice(
      estimatedTxGas,
      minValue(
        feeData.maxFeePerGas,
        feeData.maxPriorityFeePerGas + feeData.baseFee,
      ),
    );

    if (transactionPrice >= userBalance)
      throw new Error(
        `Address ${userAddress} has insuffisient balance ${Number(userBalance)}, min required balance: ${Number(transactionPrice)}`,
      );
  }

  static async validateAdminAccess(
    adminAddress: string,
    gateway: PolicyHandler,
  ): Promise<void> {
    const isAdmin = await gateway.isAdmin(adminAddress);
    if (isAdmin) return;

    throw new Error(
      `Signer is not an admin for policy ${await gateway.getAddress()}`,
    );
  }
}
