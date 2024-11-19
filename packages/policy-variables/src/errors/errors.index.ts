export class CannotLookupVariableValueError extends Error {
  constructor(varUniqeName: string, injectionName: string) {
    const msg = `No injection or default value for ${varUniqeName} (attribute ${injectionName}) found`;

    super(msg);
  }
}

export class VariableNotFoundError extends Error {
  constructor(varUniqeName: string) {
    const msg = `Cannot find variable ${varUniqeName} among known policy variables`;

    super(msg);
  }
}

export class VariableNodeNotFoundError extends Error {
  constructor(variableUniqueName: string) {
    const msg = `Not found node id for variable ${variableUniqueName}`;

    super(msg);
  }
}

export class InjectionFormattingError extends Error {
  constructor({ value, index }: { value: string; index: number }) {
    const msg = `Failed formatting variables description onchain output. Problems with injection ${value}:${index}`;

    super(msg);
  }
}

export class VariableTypeNotMatchedError extends Error {
  constructor(varValue: string, expectedType: string) {
    const msg = `Variable of value ${varValue} has an unexpected type ${expectedType}`;

    super(msg);
  }
}

export class VariableTypeNotMetError extends Error {
  constructor(varValue: string, expectedType: string) {
    const msg = `Variable of value ${varValue} is not of an expected type ${expectedType}`;

    super(msg);
  }
}

export class VariableNotFilledError extends Error {
  constructor(variableUniqueName: string, injection?: string) {
    const msg = `Variable ${variableUniqueName} ${injection ? `(injection: ${injection})` : ''} was not filled`;

    super(msg);
  }
}
