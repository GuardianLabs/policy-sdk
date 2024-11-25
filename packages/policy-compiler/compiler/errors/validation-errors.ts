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

export class CyclicReferenceError extends BaseError {
  static create = (referencedNode: string, selfNode: string) => {
    const errorMessage = `Node ${selfNode} cyclically references ${referencedNode}`;
    return this.build(errorMessage);
  };
}

export class SelfReferenceError extends BaseError {
  static create = (selfNode: string) => {
    const errorMessage = `Node ${selfNode} cyclically references itself`;
    return this.build(errorMessage);
  };
}

export class NoProviderError extends BaseError {
  static create = () => {
    const errorMessage = 'Provider needed if typing checks enabled';
    return this.build(errorMessage);
  };
}
