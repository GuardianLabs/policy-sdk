import {
  ContractTransactionReceipt,
  ContractTransactionResponse,
  EventLog,
} from 'ethers';
import { ArtifactsGraph } from '../../types';

export async function decodeEvaluationResult(
  txResponse: ContractTransactionResponse,
  contract: ArtifactsGraph,
): Promise<boolean> {
  // Wait for the transaction to be mined
  const receipt: ContractTransactionReceipt = <ContractTransactionReceipt>(
    await txResponse.wait()
  );

  // Find the specific EvaluationResult event in the transaction receipt
  const event = receipt.logs
    .filter((log) => log instanceof EventLog)
    .find((el: EventLog) => el.eventName == 'EvaluationResult');

  if (event && event.args) {
    const result = event.args.result as boolean; // Decode the boolean result from the event args
    return result;
  } else {
    throw new Error('EvaluationResult event not found in transaction logs');
  }
}
