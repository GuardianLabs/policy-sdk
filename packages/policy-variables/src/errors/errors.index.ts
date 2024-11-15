export class CannotLookupVariableValueError extends Error {
    constructor(varUniqeName: string, injectionName: string) {
      const msg = `No injection or default value for ${varUniqeName} (attribute ${injectionName}) found`;
  
      super(msg);
    }
  }

export class VariableNodeNotFoundError extends Error {
    constructor(variableUniqueName: string) {
      const msg = `Not found node id for variable ${variableUniqueName}`;
  
      super(msg);
    }
  }
  