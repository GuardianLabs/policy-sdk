import { Provider } from 'ethers';
import {
  NO_MAX_FEE_PER_GAS_ERR,
  NO_MAX_PRIORITY_FEE_VALUE_ERR,
} from '../errors';
import { IFeeProvider } from '../interfaces';
import { FeeDataEip1559 } from '../types';
import { AbstractFeeProvider } from './AbstractFeeProvider';

// note: do not use in production; rather for testing purpose
export class SimplestFeeProvider
  extends AbstractFeeProvider
  implements IFeeProvider
{
  static fromDefaultProvider = (provider: Provider) => {
    return new SimplestFeeProvider(provider);
  };

  private constructor(provider: Provider) {
    super(provider);
  }

  async getFeeData(): Promise<FeeDataEip1559> {
    const { maxPriorityFeePerGas, maxFeePerGas } =
      await this.provider.getFeeData();
    const { networkBaseFeePerGas } = await this.getNetworkBaseFee();

    if (!maxFeePerGas) {
      throw new Error(NO_MAX_FEE_PER_GAS_ERR);
    }

    if (!maxPriorityFeePerGas) {
      throw new Error(NO_MAX_PRIORITY_FEE_VALUE_ERR);
    }

    return {
      maxFeePerGas,
      maxPriorityFeePerGas,
      baseFee: networkBaseFeePerGas,
    };
  }
}
