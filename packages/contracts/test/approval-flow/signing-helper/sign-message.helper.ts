import { ApproveTxType, getDomainName, getDomainVersion } from './constants';
import { ApproveTxMessage, TypedSigner } from './types';

export const buildApproveTxMessage = (
  rawMessage: ApproveTxMessage,

  chainId: number,
  verifyingContract: string,
) => {
  const omittedMessage = (({ ...o }) => o)(rawMessage);
  const message = {
    ...omittedMessage,
  };

  return {
    domain: {
      chainId,
      name: getDomainName(),
      verifyingContract,
      version: getDomainVersion(),
    },
    message,
    primaryType: 'ApproveTx',
    types: {
      ApproveTx: ApproveTxType,
    },
  };
};

export const prepareApproveTxSignedMessage = async (
  struct: ApproveTxMessage,
  verifyingContract: string,
  signer: TypedSigner,
) => {
  const chainId = await signer.getChainId();
  const { domain, types, message } = buildApproveTxMessage(
    struct,

    chainId,
    verifyingContract,
  );

  const signature = await signer._signTypedData(domain, types, message);

  return {
    message: struct,
    signature,
  };
};
