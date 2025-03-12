import { ClientError } from '../errors';
import { BuildExisting, BuildNew, Flow } from '../errors/error-codes.enum';

export function TryCatch(
  ...descriptors: Flow[] | BuildExisting[] | BuildNew[]
) {
  return function (
    _: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (caughtErr) {
        if (caughtErr instanceof ClientError) {
          caughtErr.addPropagationStep(propertyKey, descriptors);

          throw caughtErr;
        } else {
          const err = new ClientError((<Error>caughtErr).message);

          err.addPropagationStep(propertyKey, descriptors);

          throw err;
        }
      }
    };

    return descriptor;
  };
}
