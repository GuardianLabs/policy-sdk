import { BigNumberish, BytesLike } from 'ethers';

export interface TypedSigner {
  address: string;

  signMessage(message: string): Promise<string>;

  _signTypedData(...params: any): Promise<string>;

  getChainId(): Promise<number>;
}

export type ApproveTxMessage = {
  nonce: BigNumberish;
  data: BytesLike;
  asset: string;
  destination: string;
  amount: BigNumberish;
  hashA: BytesLike;
  hashB: BytesLike;
  mandatoryTagHashed: BytesLike;
};
