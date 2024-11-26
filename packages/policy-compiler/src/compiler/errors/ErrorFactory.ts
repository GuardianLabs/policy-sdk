import {
  CyclicReferenceError,
  NoProviderError,
  SelfReferenceError,
} from './validation-errors';

export class ErrorFactory {
  static selfReference = (arg: string) => {
    return SelfReferenceError.create(arg);
  };

  static cyclicfReference = (argA: string, argB: string) => {
    return CyclicReferenceError.create(argA, argB);
  };

  static noProvider = () => {
    return NoProviderError.create();
  };
}
