import { duplicatedValuesArray, randomBoolean } from '../random.helper';
import { ExecParams } from './artifact-params';
import { DEFAULT_MOCKED_DATA_LIST_LENGTH } from './constants';
import { ExecParamsDescriptorType, MockecExecArgumentsConfig } from './types';

export class MockedExecParams extends ExecParams {
  static make = (config?: MockecExecArgumentsConfig) => {
    return this.makeWithDescriptor(undefined, config);
  };

  static makeWithDescriptor = (
    descriptor?: ExecParamsDescriptorType,
    config?: MockecExecArgumentsConfig,
  ) => {
    // when 'config' not supplied, the list with length '3' is created and filled with random-booleans
    const argsCount = config?.argsCount ?? DEFAULT_MOCKED_DATA_LIST_LENGTH;
    const defaultValue = config?.defaultValue ?? randomBoolean();

    const mockedParams = duplicatedValuesArray(argsCount, defaultValue);

    return this.create(descriptor, ...mockedParams);
  };

  // the 'validateNewParam' is overrided to loose some of validations
  protected validateNewParam(): void {
    if (!!this.paramsDescriptor) {
      // do validations
    }
    // otherwise
    // no params validations, therefore allowing 'paramsDescriptor' to be not defined
  }
}
