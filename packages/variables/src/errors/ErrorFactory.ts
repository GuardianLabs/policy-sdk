import {
  InjectionFormattingError,
  NodeVariablesAreUndefinedErr,
  VariableNodeNotFoundError,
  VariableNotFilledError,
  VariableNotFoundError,
  VariableTypeNotKnownError,
  VariableTypeNotMetError,
} from './validation-errors';

export class ErrorFactory {
  static variableTypeNotMet = (
    ...params: Parameters<typeof VariableTypeNotMetError.create>
  ) => {
    return VariableTypeNotMetError.create(...params);
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

  static nodeVariablesAreUndefined = (
    ...params: Parameters<typeof NodeVariablesAreUndefinedErr.create>
  ) => {
    return NodeVariablesAreUndefinedErr.create(...params);
  };

  static variableNodeNotFound = (
    ...params: Parameters<typeof VariableNodeNotFoundError.create>
  ) => {
    return VariableNodeNotFoundError.create(...params);
  };

  static providedVariableWithNotKnownType = (
    ...params: Parameters<typeof VariableTypeNotKnownError.create>
  ) => {
    return VariableTypeNotKnownError.create(...params);
  };

  static variableNotFilled = (
    ...params: Parameters<typeof VariableNotFilledError.create>
  ) => {
    return VariableNotFilledError.create(...params);
  };
}
