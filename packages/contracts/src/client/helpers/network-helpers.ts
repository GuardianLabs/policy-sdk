import {
  ContractTransactionReceipt,
  ContractTransactionResponse,
  EventLog,
  Provider,
  Signer,
  TransactionRequest,
} from 'ethers';
import {
  PolicyFactory,
  PolicyFactory__factory,
  PolicyHandler,
  PolicyHandler__factory,
} from '../..';
import {
  NO_VIABLE_PROVIDER_ERR,
  TRANSACTION_RECEIPT_IS_NULL_ERR,
} from '../errors';

const POLICY_DEPLOYED_EVENT_SIGNATURE = 'PolicyDeployed(address)';

const extractProvider = (signerWithProvider: Signer): Provider => {
  const provider = signerWithProvider.provider;
  if (!!provider) {
    return provider;
  }

  throw new Error(NO_VIABLE_PROVIDER_ERR);
};

export const extractUserAndTxData = async (
  signerWithProvider: Signer,
  tx: TransactionRequest,
) => {
  const userAddress = await signerWithProvider.getAddress();
  const provider = extractProvider(signerWithProvider);
  return {
    userAddress,
    userBalance: await provider.getBalance(userAddress),
    estimatedTxGas: await provider.estimateGas(tx),
  };
};

export const connectPolicyInstance = (
  policyAddress: string,
  signer: Signer,
): PolicyHandler => {
  return PolicyHandler__factory.connect(policyAddress, signer);
};

export const decodePolicyAddressFromTx = async (
  txResponse: ContractTransactionResponse,
): Promise<string> => {
  const receipt: ContractTransactionReceipt | null = await txResponse.wait();
  if (receipt === null) {
    throw new Error(TRANSACTION_RECEIPT_IS_NULL_ERR);
  }

  const event = receipt.logs
    .filter((log) => log instanceof EventLog)
    .find(
      (el: EventLog) => el.eventSignature == POLICY_DEPLOYED_EVENT_SIGNATURE,
    );

  if (!!event && !!event.args) {
    const result = event.args[0] as string;
    return result;
  } else {
    throw new Error('Policy deployment event not found in transaction logs');
  }
};

export const connectPolicyFactoryInstance = (
  factoryAddress: string,
  signer: Signer,
): PolicyFactory => {
  return PolicyFactory__factory.connect(factoryAddress, signer);
};

export const deployPolicyFactoryInstance = async (
  signer: Signer,
): Promise<PolicyFactory> => {
  const DeployerFactory = new PolicyFactory__factory(signer);
  const policyFactory = await DeployerFactory.deploy();
  await policyFactory.waitForDeployment();

  return policyFactory;
};
