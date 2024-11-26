import {
  CannotLookupVariableValueError,
  InjectionFormattingError,
  VariableNodeNotFoundError,
  VariableNotFilledError,
  VariableNotFoundError,
  VariableTypeNotMatchedError,
  VariableTypeNotMetError,
} from './validation-errors';

export class ErrorFactory {
  static variableTypeNotMet = (
    ...params: Parameters<typeof VariableTypeNotMetError.create>
  ) => {
    return VariableTypeNotMetError.create(...params);
  };

  static cannotLookupVariableValue = (
    ...params: Parameters<typeof CannotLookupVariableValueError.create>
  ) => {
    return CannotLookupVariableValueError.create(...params);
  };

  static variableNotFound = (
    ...params: Parameters<typeof VariableNotFoundError.create>
  ) => {
    return VariableNotFoundError.create(...params);
  };

  static injectionFormatting = (
    ...params: Parameters<typeof InjectionFormattingError.create>
  ) => {
    return InjectionFormattingError.create(...params);
  };

  static variableNodeNotFound = (
    ...params: Parameters<typeof VariableNodeNotFoundError.create>
  ) => {
    return VariableNodeNotFoundError.create(...params);
  };

  static variableTypeNotMatched = (
    ...params: Parameters<typeof VariableTypeNotMatchedError.create>
  ) => {
    return VariableTypeNotMatchedError.create(...params);
  };

  static variableNotFilled = (
    ...params: Parameters<typeof VariableNotFilledError.create>
  ) => {
    return VariableNotFilledError.create(...params);
  };
}
