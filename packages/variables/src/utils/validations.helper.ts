import {
  verifyAddress,
  verifyBytes,
} from '@guardian-network/shared/src/solidity-types/solidity-types-verification.helper';
import { SupportedSolidityType } from '@guardian-network/shared/src/types/intermediate-representation.types';
import { ErrorFactory } from '../errors';
import {
  AllowedVariablesType,
  NodeVariablesConfig,
  SuppliedVariables,
  VarDescription,
} from '../types';

export const validateVarValueTypeWithErr = (
  varValue: AllowedVariablesType,
  expectedTypeAsString: string,
) => {
  const isValid = validateVarValueType(varValue, expectedTypeAsString);

  if (!isValid) {
    throw ErrorFactory.variableTypeNotMet(
      varValue.toString(),
      expectedTypeAsString,
    );
  }
};

// note: this validates that value complies with required solidity type
const validateVarValueType = (
  varValue: AllowedVariablesType,
  expectedTypeString: string,
  // todo: expectedTypeString: SupportedSolidityType
): boolean => {
  let verified = false;
  // todo: apply safer approach instead assertion, since this gives no safe at this point
  const vatiableSolidityType = expectedTypeString as SupportedSolidityType;

  switch (vatiableSolidityType) {
    // todo: case SupportedSolidityTypesEnum.String
    case 'string':
      verified ||= typeof varValue == 'string';
      break;
    case 'uint256':
      verified ||= typeof varValue == 'number';
      break;
    case 'bool':
      verified ||= typeof varValue == 'boolean';
      break;
    case 'address':
      try {
        verifyAddress(varValue as any as string);
        verified = true;
      } catch (e: unknown) {
        verified = false;
      }
      break;
    case 'bytes':
      try {
        verifyBytes(varValue as any as string);
        verified = true;
      } catch (e: unknown) {
        verified = false;
      }
      break;
    // note: handles when unknown (Solidty) type provided
    default:
      throw ErrorFactory.providedVariableWithNotKnownType(
        varValue.toString(),
        vatiableSolidityType,
      );
  }

  return verified;
};

const defaultExtraCondition = (_: VarDescription) => false;

export const validateAllVariablesSupplied = (
  varsConfig: NodeVariablesConfig[],
  knownVariables: SuppliedVariables[],
  // note: usually has to be "isInjection" method; when not, then instead default blank method consumed
  isVariableInjectable: (
    varDescription: VarDescription,
  ) => boolean = defaultExtraCondition,
) => {
  for (let i = 0; i < varsConfig.length; i++) {
    const suppliedVars = knownVariables[i];
    const expectedVarsConfig = varsConfig[i];

    for (let j = 0; j < expectedVarsConfig.variables.length; j++) {
      const variable = expectedVarsConfig.variables[j];

      // "defaultExtraCondition" gives "false" value, which treats each variable as NOT-AN-INJECTION
      const isInjection = isVariableInjectable(variable);
      const isVariableSupplied = suppliedVars.values[j] != undefined;

      // when not supplied and not injection
      if (!isVariableSupplied && !isInjection) {
        throw ErrorFactory.variableNotFilled(
          variable.uniqueName,
          variable.injection,
        );
      }
    }
  }
};
