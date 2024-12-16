import { execOrPropagate } from '../errors';

export const propagateWithAnnotation = (annotation: string) => {
  const decorator = (
    target: Object,
    methodName: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      return execOrPropagate(
        () => originalMethod.apply(this, args),
        annotation,
      );
    };

    return descriptor;
  };

  return decorator;
};
