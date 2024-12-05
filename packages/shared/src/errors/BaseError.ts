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
