import { Provider } from 'ethers';
import { IFeeProvider } from '../interfaces';
import { FeeDataEip1559 } from '../types';

export abstract class AbstractFeeProvider implements IFeeProvider {
  constructor(protected readonly provider: Provider) {}

  abstract getFeeData(): Promise<FeeDataEip1559>;

  // Get the latest block to calculate base fee
  public getNetworkBaseFee = async () => {
    const latestBlock = await this.provider.getBlock('latest');

    if (!latestBlock?.baseFeePerGas) {
      throw new Error('Could not get base fee from latest block');
    }

    // note: just in case increased by 12.5%
    const networkBaseFeePerGas = (latestBlock?.baseFeePerGas * 112n) / 100n;
    return { networkBaseFeePerGas };
  };
}
