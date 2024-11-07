export class NoRpcUrlError extends Error {
  constructor() {
    const msg = `Need to provide JSON RPC URL to use typing validations`;

    super(msg);
  }
}
