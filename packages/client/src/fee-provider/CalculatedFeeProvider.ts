import { Provider } from 'ethers';
import { AMORTIZE_RATIO } from '../constants';
import { IFeeProvider } from '../interfaces';
import { FeeDataEip1559 } from '../types';
import { AbstractFeeProvider } from './AbstractFeeProvider';

export class CalculatedFeeProvider
  extends AbstractFeeProvider
  implements IFeeProvider
{
  static fromDefaultProvider = (provider: Provider) => {
    return new CalculatedFeeProvider(provider);
  };

  private constructor(provider: Provider) {
    super(provider);
  }

  getFeeData = async (): Promise<FeeDataEip1559> => {
    const { networkBaseFeePerGas } = await this.getNetworkBaseFee();

    const { maxPriorityFeePerGas: networkMaxPriorityFeePerGas } =
      await this.networkMaxPriorityFee();

    const { maxPriorityFeePerGas, maxFeePerGas } = this.increasedFee(
      networkBaseFeePerGas,
      networkMaxPriorityFeePerGas,
    );
    return {
      maxPriorityFeePerGas,
      maxFeePerGas,
      baseFee: networkBaseFeePerGas,
    };
  };

  // Get network's suggested priority fee
  private networkMaxPriorityFee = async () => {
    const { maxPriorityFeePerGas } = await this.provider.getFeeData();

    if (!maxPriorityFeePerGas) {
      throw new Error('Could not get priority fee data from network');
    }

    return { maxPriorityFeePerGas };
  };

  private increasedFee = (
    networkBaseFeePerGas: bigint,
    networkMaxPriorityFeePerGas: bigint,
  ) => {
    const maxPriorityFeePerGas = networkMaxPriorityFeePerGas;
    const maxPriorityFeePerGasAmortized =
      (maxPriorityFeePerGas * AMORTIZE_RATIO) / 100n;

    // Calculate max fee: networkBaseFeePerGas + maxPriorityFee
    // note: might not work as expected (greatly increased gas params)
    // this way if networkBaseFeePerGas value is close to networkMaxPriorityFeePerGas.
    // example:
    // networkMaxPriorityFeePerGas = 1000000000n
    // networkBaseFeePerGas = 1000000000n
    // solution: use increased base fee (done in getNetworkBaseFee); or apply own maxFeePerGas calculation
    const maxFeePerGas = networkBaseFeePerGas + maxPriorityFeePerGas;
    const maxFeePerGasAmortized = (maxFeePerGas * AMORTIZE_RATIO) / 100n;

    return {
      maxFeePerGas: maxFeePerGasAmortized,
      maxPriorityFeePerGas: maxPriorityFeePerGasAmortized,
    };
  };
}
