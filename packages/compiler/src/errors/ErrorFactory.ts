import {
  CyclicReferenceError,
  NoProviderError,
  SelfReferenceError,
} from './validation-errors';

export class ErrorFactory {
  static selfReference = (
    ...params: Parameters<typeof SelfReferenceError.create>
  ) => {
    return SelfReferenceError.create(...params);
  };

  static cyclicfReference = (
    ...params: Parameters<typeof CyclicReferenceError.create>
  ) => {
    return CyclicReferenceError.create(...params);
  };

  static noProvider = (
    ...params: Parameters<typeof NoProviderError.create>
  ) => {
    return NoProviderError.create(...params);
  };
}
