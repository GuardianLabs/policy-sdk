export class CyclicReferenceError extends Error {
  constructor(selfNode: string, referencedNode: string) {
    const msg = `Node ${selfNode} cyclically references ${referencedNode}`;

    super(msg);
  }
}

export class SelfReferenceError extends Error {
  constructor(selfNode: string) {
    const msg = `Node ${selfNode} cyclically references itself`;

    super(msg);
  }
}

export class NoProviderError extends Error {
  constructor() {
    const msg = `Provider needed if typing checks enabled`;

    super(msg);
  }
}
