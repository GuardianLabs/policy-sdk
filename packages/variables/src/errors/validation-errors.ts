import { BaseError } from '@guardian-network/shared/src/errors';

export class CannotLookupVariableValueError extends BaseError {
  static create = (varUniqeName: string, injectionName: string) => {
    const errorMessage = `No injection or default value for ${varUniqeName} (attribute ${injectionName}) found`;
    return this.build(errorMessage);
  };
}

export class VariableNotFoundError extends BaseError {
  static create = (varUniqeName: string) => {
    const errorMessage = `Cannot find variable ${varUniqeName} among known policy variables`;
    return this.build(errorMessage);
  };
}

export class VariableTypeNotMetError extends BaseError {
  static create = (varValue: string, expectedType: string) => {
    const errorMessage = `Variable of value ${varValue} is not of an expected type ${expectedType}`;
    return this.build(errorMessage);
  };
}

export class VariableNodeNotFoundError extends BaseError {
  static create = (variableUniqueName: string) => {
    const errorMessage = `Not found node id for variable ${variableUniqueName}`;
    return this.build(errorMessage);
  };
}

export class InjectionFormattingError extends BaseError {
  static create = (value: string, index: number) => {
    const errorMessage = `Failed formatting variables description onchain output. Problems with injection ${value}:${index}`;
    return this.build(errorMessage);
  };
}

export class VariableTypeNotMatchedError extends BaseError {
  static create = (varValue: string, expectedType: string) => {
    const errorMessage = `Variable of value ${varValue} has an unexpected type ${expectedType}`;
    return this.build(errorMessage);
  };
}

export class VariableNotFilledError extends BaseError {
  static create = (variableUniqueName: string, injection?: string) => {
    const errorMessage = `Variable ${variableUniqueName} ${injection ? `(injection: ${injection})` : ''} was not filled`;
    return this.build(errorMessage);
  };
}
