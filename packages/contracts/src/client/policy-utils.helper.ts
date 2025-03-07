import {
  ContractTransactionReceipt,
  ContractTransactionResponse,
  EventLog,
  Signer,
} from 'ethers';
import { PolicyHandler__factory } from '..';
import { TRANSACTION_RECEIPT_IS_NULL_ERR } from './errors';

const EVALUATED_EVENT_SIGNATURE = 'Evaluated(bool,bytes32)';

export const decodeEvaluationResultFromTx = async (
  txResponse: ContractTransactionResponse,
): Promise<boolean> => {
  const receipt: ContractTransactionReceipt | null = await txResponse.wait();
  if (receipt == null) {
    throw new Error(TRANSACTION_RECEIPT_IS_NULL_ERR);
  }

  // todo: consider handling scenario when receipt has three or more "Evaluated" events
  // note: Find the specific "Evaluated" event in the transaction receipt
  const event = receipt.logs
    .filter((log) => log instanceof EventLog)
    .find((el: EventLog) => el.eventSignature == EVALUATED_EVENT_SIGNATURE);

  if (!!event && !!event.args) {
    const result = event.args.result as boolean;
    return result;
  } else {
    throw new Error('Evaluated event not found in transaction logs');
  }
};

// APPLY
// export const deployGraph = async (
//   deployAndAdminSigner: Signer,
// ): Promise<PolicyHandler> => {
//   return StaticPolicyDeployer.deploy(
//     deployAndAdminSigner,
//     await deployAndAdminSigner.getAddress(),
//   );
// };

// // prev
// export const deployGraph11 = async (
//   deployAndAdminSigner: Signer,
// ): Promise<PolicyHandler> => {
//   const deployer = new PolicyHandler__factory(deployAndAdminSigner);

//   const gateway = await deployer.deploy(
//     await deployAndAdminSigner.getAddress(),
//   );
//   await gateway.waitForDeployment();

//   return gateway as PolicyHandler;
// };

// //  apply
// export const deployAndInitGraph = async (
//   deployAndAdminSigner: Signer,
//   params: GraphInitParamsStruct,
// ): Promise<PolicyHandler> => {
//   return StaticPolicyDeployer.deployAndConfigure(
//     deployAndAdminSigner,
//     await deployAndAdminSigner.getAddress(),
//     params,
//   );
// };

export const connectGraph = (
  instanceAddress: string,
  instanceAdminSigner: Signer,
) => {
  return PolicyHandler__factory.connect(instanceAddress, instanceAdminSigner);
};
