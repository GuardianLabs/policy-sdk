import {
  verifyAddress,
  verifyBytes,
} from '@guardian-network/shared/src/solidity-types/solidity-types-verification.helper';
import { SupportedSolidityType } from '@guardian-network/shared/src/types/intermediate-representation.types';
import { ErrorFactory } from '../errors';
import { AllowedVariablesType } from '../types';

export const valueCompliesExpectedType = (
  value: AllowedVariablesType,
  expectedTypeString: string,
): boolean => {
  let verified = false;
  const expectedType = expectedTypeString as SupportedSolidityType;

  switch (expectedType) {
    case 'uint256':
      verified ||= typeof value == 'number';
      break;
    case 'bool':
      verified ||= typeof value == 'boolean';
      break;
    case 'address':
      try {
        verifyAddress(<string>value);
        verified ||= true;
      } catch (e: unknown) {
        console.error((<Error>e).message);
        throw ErrorFactory.variableTypeNotMet(value.toString(), expectedType);
      }
      break;
    case 'bytes':
      try {
        verifyBytes(<string>value);
        verified ||= true;
      } catch (e: unknown) {
        console.error((<Error>e).message);
        throw ErrorFactory.variableTypeNotMet(value.toString(), expectedType);
      }
      break;
    case 'string':
      verified ||= typeof value == 'string';
      break;
    default:
      throw ErrorFactory.variableTypeNotMatched(value.toString(), expectedType);
  }

  return verified;
};
