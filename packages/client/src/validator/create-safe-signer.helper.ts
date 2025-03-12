import { Signer, TransactionRequest } from 'ethers';
import { IBalanceValidator } from '../interfaces';

export const createSafeSigner = (
  signer: Signer,
  validator: IBalanceValidator,
) => {
  return new Proxy(signer, {
    get(target, prop, receiver) {
      // note: intercepts this way all outcoiming transactions
      if (prop === 'sendTransaction') {
        return async function (...args: [TransactionRequest]) {
          const txRequest = args[0];

          await validator.validateSenderBalance(signer, txRequest);

          const result = Reflect.get(target, prop, receiver).apply(
            target,
            args,
          );
          return result;
        };
      }

      return Reflect.get(target, prop, receiver);
    },
  });
};
