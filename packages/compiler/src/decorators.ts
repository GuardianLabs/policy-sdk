import { execOrPropagate } from './errors';

export const propagateWithAnnotation = (annotation: string) => {
  const decorator = (
    target: Object,
    methodName: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor => {
    const originalValue = descriptor.value;

    descriptor.value = function (...args: any[]) {
      return execOrPropagate(() => originalValue.apply(this, args), annotation);
    };

    return descriptor;
  };

  return decorator;
};
