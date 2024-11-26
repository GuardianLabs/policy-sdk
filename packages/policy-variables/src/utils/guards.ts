import { Type } from '../../../policy-compiler/src/intermediate-representation/notation/parser/types';
import {
  verifyAddress,
  verifyBytes,
} from '../../../policy-contracts/test/solidity-types';
import { ErrorFactory } from '../errors';
import { AllowedVariablesType } from '../types';

export const valueCompliesExpectedType = (
  value: AllowedVariablesType,
  expectedType: string,
): boolean => {
  let verified = false;

  switch (expectedType) {
    case Type.Uint256:
      verified ||= typeof value == 'number';
      break;
    case Type.Bool:
      verified ||= typeof value == 'boolean';
      break;
    case Type.Address:
      try {
        verifyAddress(<string>value);
        verified ||= true;
      } catch (e: unknown) {
        console.error((<Error>e).message);
        throw ErrorFactory.variableTypeNotMet(value.toString(), expectedType);
      }
      break;
    case Type.Bytes:
      try {
        verifyBytes(<string>value);
        verified ||= true;
      } catch (e: unknown) {
        console.error((<Error>e).message);
        throw ErrorFactory.variableTypeNotMet(value.toString(), expectedType);
      }
      break;
    case Type.String:
      verified ||= typeof value == 'string';
      break;
    default:
      throw ErrorFactory.variableTypeNotMatched(value.toString(), expectedType);
  }

  return verified;
};
