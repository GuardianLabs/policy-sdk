import {
  ArtifactAlreadyDefinedError,
  ArtifactNotDefinedError,
  CannotInferValueTypeError,
  ConstantIsAlreadyDefinedError,
  ConstantNotDefinedError,
  CyclicReferenceDSLError,
  EvaluateAlreadyDeclaredError,
  EvaluateTypeNotBoolError,
  ImpropperInitArgsMutabilityError,
  InstanceAlreadyDefinedError,
  InstanceNotDefinedError,
  NoEvaluateStatementError,
  SelfReferenceDSLError,
  VariableAlreadyDefinedError,
  VariableNotDefinedError,
} from './validation-errors';

export class ErrorFactory {
  static constantIsAlreadyDefined = (
    ...params: Parameters<typeof ConstantIsAlreadyDefinedError.create>
  ) => {
    return ConstantIsAlreadyDefinedError.create(...params);
  };

  static variableAlreadyDefined = (
    ...params: Parameters<typeof VariableAlreadyDefinedError.create>
  ) => {
    return VariableAlreadyDefinedError.create(...params);
  };

  static artifactAlreadyDefined = (
    ...params: Parameters<typeof ArtifactAlreadyDefinedError.create>
  ) => {
    return ArtifactAlreadyDefinedError.create(...params);
  };

  static instanceAlreadyDefined = (
    ...params: Parameters<typeof InstanceAlreadyDefinedError.create>
  ) => {
    return InstanceAlreadyDefinedError.create(...params);
  };

  static evaluateAlreadyDeclared = (
    ...params: Parameters<typeof EvaluateAlreadyDeclaredError.create>
  ) => {
    return EvaluateAlreadyDeclaredError.create(...params);
  };

  static artifactNotDefined = (
    ...params: Parameters<typeof ArtifactNotDefinedError.create>
  ) => {
    return ArtifactNotDefinedError.create(...params);
  };

  static variableNotDefined = (
    ...params: Parameters<typeof VariableNotDefinedError.create>
  ) => {
    return VariableNotDefinedError.create(...params);
  };

  static constantNotDefined = (
    ...params: Parameters<typeof ConstantNotDefinedError.create>
  ) => {
    return ConstantNotDefinedError.create(...params);
  };

  static instanceNotDefined = (
    ...params: Parameters<typeof InstanceNotDefinedError.create>
  ) => {
    return InstanceNotDefinedError.create(...params);
  };

  static impropperInitArgsMutabilityMode = (
    ...params: Parameters<typeof ImpropperInitArgsMutabilityError.create>
  ) => {
    return ImpropperInitArgsMutabilityError.create(...params);
  };

  static evaluateTypeNotBool = (
    ...params: Parameters<typeof EvaluateTypeNotBoolError.create>
  ) => {
    return EvaluateTypeNotBoolError.create(...params);
  };

  static noEvaluateStatement = (
    ...params: Parameters<typeof NoEvaluateStatementError.create>
  ) => {
    return NoEvaluateStatementError.create(...params);
  };

  static cyclicReferenceDSL = (
    ...params: Parameters<typeof CyclicReferenceDSLError.create>
  ) => {
    return CyclicReferenceDSLError.create(...params);
  };

  static selfReferenceDSL = (
    ...params: Parameters<typeof SelfReferenceDSLError.create>
  ) => {
    return SelfReferenceDSLError.create(...params);
  };

  static cannotInferValueType = (
    ...params: Parameters<typeof CannotInferValueTypeError.create>
  ) => {
    return CannotInferValueTypeError.create(...params);
  };
}
