export class BaseError extends Error {
  protected static build<R>(
    this: new (message: string) => R,
    message: string,
  ): R {
    return new this(message);
  }

  constructor(erroMessage: string) {
    super(erroMessage);
  }
}

export class InitTypesDoNotMatchError extends BaseError {
  static create = (
    value: string,
    onchainName: string,
    onchainType: string,
    offchainType: string,
  ) => {
    const errorMessage = `Initialization value ${value} (onchain name: ${onchainName}) is not matched by type: \r\n Expected onchain: ${onchainType} \r\n Got from DSL: ${offchainType}`;
    return this.build(errorMessage);
  };
}

export class ExecTypesDoNotMatchError extends BaseError {
  static create = (
    value: string,
    onchainName: string,
    onchainType: string,
    offchainType: string,
  ) => {
    const errorMessage = `Execution value ${value} (onchain name: ${onchainName}) is not matched by type: \r\n Expected onchain: ${onchainType} \r\n Got from DSL: ${offchainType}`;
    return this.build(errorMessage);
  };
}

export class SubstitutionTypesDoNotMatchError extends BaseError {
  static create = (
    selfInstanceId: string,
    refInstanceId: string,
    selfExecArgName: string,
    selfExecArgType: string,
    refInstanceReturnType: string,
  ) => {
    const errorMessage = `Instance ${selfInstanceId} has exec argument ${selfExecArgName} of type ${selfExecArgType} that is being substituted with instance ${refInstanceId} of type ${refInstanceReturnType}`;
    return this.build(errorMessage);
  };
}
