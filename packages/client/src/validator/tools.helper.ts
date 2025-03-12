import { AMORTIZE_RATIO } from '../constants';

export const calculateActionPrice = (
  estimatedGas: bigint,
  effectiveFeePerGas: bigint,
): bigint => {
  const price = estimatedGas * effectiveFeePerGas;
  const priceAmortized = (price * AMORTIZE_RATIO) / 100n;

  return priceAmortized;
};

export const minValue = (...args: bigint[]) =>
  args.reduce((m, e) => (e < m ? e : m));
