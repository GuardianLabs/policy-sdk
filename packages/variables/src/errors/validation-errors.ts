import { BaseError } from '@guardian-network/shared/src/errors';

export class CannotLookupVariableValueError extends BaseError {
  static create = (varName: string, injectionName: string) => {
    const errorMessage = `No injection or default value for ${varName} (attribute ${injectionName}) is provided`;
    return this.build(errorMessage);
  };
}

export class VariableNotFoundError extends BaseError {
  static create = (varName: string) => {
    const errorMessage = `Cannot find variable ${varName} among known policy variables`;
    return this.build(errorMessage);
  };
}

export class VariableTypeNotMetError extends BaseError {
  static create = (varValue: string, expectedType: string) => {
    const errorMessage = `Variable of value ${varValue} is not one of allowed Solidity types ${expectedType}`;
    return this.build(errorMessage);
  };
}

export class VariableNodeNotFoundError extends BaseError {
  static create = (varName: string) => {
    const errorMessage = `Not found node id for variable ${varName}`;
    return this.build(errorMessage);
  };
}

export class NodeHasNoVariablesError extends BaseError {
  static create = (targetNode: string) => {
    const errorMessage = `Variables record not found for node id: ${targetNode}`;
    return this.build(errorMessage);
  };
}

export class InjectionFormattingError extends BaseError {
  static create = (injectionValue: string, injectionIndex: number) => {
    const errorMessage = `Failed formatting variables description onchain output. Problems with injection ${injectionValue}:${injectionIndex}`;
    return this.build(errorMessage);
  };
}

export class VariableNotFilledError extends BaseError {
  static create = (varName: string, injection?: string) => {
    const errorMessage = `Variable ${varName} ${injection ? `(injection: ${injection})` : ''} was not filled`;
    return this.build(errorMessage);
  };
}

export class VariableTypeNotKnownError extends BaseError {
  static create = (varValue: string, expectedType: string) => {
    const errorMessage = `Variable of value ${varValue} type is not allowed Solidity type ${expectedType}`;
    return this.build(errorMessage);
  };
}
