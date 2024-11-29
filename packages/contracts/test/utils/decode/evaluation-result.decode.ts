import {
  ContractTransactionReceipt,
  ContractTransactionResponse,
  EventLog,
} from 'ethers';

export const decodeEvaluationResult = async (
  txResponse: ContractTransactionResponse,
): Promise<boolean> => {
  // Wait for the transaction to be mined
  const receipt: ContractTransactionReceipt = <ContractTransactionReceipt>(
    await txResponse.wait()
  );

  // Find the specific Evaluated event in the transaction receipt
  const event = receipt.logs
    .filter((log) => log instanceof EventLog)
    .find((el: EventLog) => el.eventName == 'Evaluated');

  if (event && event.args) {
    const result = event.args.result as boolean; // Decode the boolean result from the event args
    return result;
  } else {
    throw new Error('Evaluated event not found in transaction logs');
  }
};
