import {
  verifyAddress,
  verifyBytes,
} from '@guardian-network/policy-contracts/src/solidity-types';
import { SupportedSolidityType } from '@guardian-network/policy-intermediate-representation/src';
import { ErrorFactory } from '../errors';
import { AllowedVariablesType } from '../types';

export const valueCompliesExpectedType = (
  value: AllowedVariablesType,
  expectedType: string,
): boolean => {
  let verified = false;

  switch (expectedType) {
    case SupportedSolidityType.Uint256:
      verified ||= typeof value == 'number';
      break;
    case SupportedSolidityType.Bool:
      verified ||= typeof value == 'boolean';
      break;
    case SupportedSolidityType.Address:
      try {
        verifyAddress(<string>value);
        verified ||= true;
      } catch (e: unknown) {
        console.error((<Error>e).message);
        throw ErrorFactory.variableTypeNotMet(value.toString(), expectedType);
      }
      break;
    case SupportedSolidityType.Bytes:
      try {
        verifyBytes(<string>value);
        verified ||= true;
      } catch (e: unknown) {
        console.error((<Error>e).message);
        throw ErrorFactory.variableTypeNotMet(value.toString(), expectedType);
      }
      break;
    case SupportedSolidityType.String:
      verified ||= typeof value == 'string';
      break;
    default:
      throw ErrorFactory.variableTypeNotMatched(value.toString(), expectedType);
  }

  return verified;
};
