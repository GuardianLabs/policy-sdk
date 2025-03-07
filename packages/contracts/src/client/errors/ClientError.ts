import { BuildExisting, BuildNew, Flow } from './error-codes.enum';

export class ClientError extends Error {
  protected callStack: string[] = [];
  protected stageStack: string[] = [];
  protected originalErrorMessage: string;

  constructor(message: string) {
    super();
    this.originalErrorMessage = message;
  }

  get stack() {
    return this.stageStack.join(' ');
  }

  get message() {
    const latestCall = this.callStack[this.callStack.length - 1];
    const stageTrace = this.stageStack.reverse().join('<-');
    const callTrace = this.callStack.reverse().join('<-');

    const formattedMessage = `Client failed with error: "${this.originalErrorMessage}" in "${latestCall}" method. Stages passed: ${stageTrace}. Calls passed: ${callTrace}`;
    return formattedMessage;
  }

  addPropagationStep(
    propertyKey: string,
    steps: (Flow | BuildExisting | BuildNew)[],
  ) {
    this.callStack.push(propertyKey);
    this.stageStack = this.stageStack.concat(steps);
  }
}
