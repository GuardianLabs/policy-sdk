export class InitTypesDoNotMatchError extends Error {
  constructor(
    value: string,
    onchainName: string,
    onchainType: string,
    offchainType: string,
  ) {
    const msg = `Initialization value ${value} (onchain name: ${onchainName}) is not matched by type: \r\n Expected onchain: ${onchainType} \r\n Got from DSL: ${offchainType}`;

    super(msg);
  }
}

export class ExecTypesDoNotMatchError extends Error {
  constructor(
    value: string,
    onchainName: string,
    onchainType: string,
    offchainType: string,
  ) {
    const msg = `Execution value ${value} (onchain name: ${onchainName}) is not matched by type: \r\n Expected onchain: ${onchainType} \r\n Got from DSL: ${offchainType}`;

    super(msg);
  }
}

export class SubstitutionTypesDoNotMatchError extends Error {
  constructor(
    selfInstanceId: string,
    refInstanceId: string,
    selfExecArgName: string,
    selfExecArgType: string,
    refInstanceReturnType: string,
  ) {
    const msg = `Instance ${selfInstanceId} has exec argument ${selfExecArgName} of type ${selfExecArgType} that is being substituted with instance ${refInstanceId} of type ${refInstanceReturnType}`;

    super(msg);
  }
}
