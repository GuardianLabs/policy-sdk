import {
  ExecParams,
  ExecParamsDescriptorValueType,
  EncodedParamType as NormalizedParamType,
} from '../types';
import { duplicatedValuesArray, randomBoolean } from '../utils/random.helper';
import { DEFAULT_MOCKED_DATA_LIST_LENGTH } from './constants';

type MockecExecArgumentsConfig = {
  argsCount?: number;
  // when supplied, the list is created with length 'argsCount' and filled with 'defaultValue'
  defaultValue?: NormalizedParamType;
  // when supplied, and 'defaultValue' is undefined, the list is created with length 'argsCount' and filled with random values
  // type?: PrimitiveEncodeParamTypes;
};

export class MockedExecParams extends ExecParams {
  static make = (config?: MockecExecArgumentsConfig) => {
    return this.makeWithDescriptor(undefined, config);
  };

  static withNormalizedArgs = (...params: Array<NormalizedParamType>) => {
    return this.create(undefined, ...params);
  };

  static makeWithDescriptor = (
    descriptorValue?: ExecParamsDescriptorValueType,
    config?: MockecExecArgumentsConfig,
  ) => {
    // when 'config' not supplied, the list with length '3' is created and filled with random-booleans
    const argsCount = config?.argsCount ?? DEFAULT_MOCKED_DATA_LIST_LENGTH;
    const defaultValue = config?.defaultValue ?? randomBoolean();

    const mockedParams = duplicatedValuesArray(argsCount, defaultValue);

    return this.create(descriptorValue, ...mockedParams);
  };

  // the 'validateNewParam' is overrided to loose some of validations
  protected validateNewParam(
    ...params: Array<NormalizedParamType>
  ): NormalizedParamType[] {
    // this.omitValidations();
    return params;
  }

  protected validateTotalParamsCount(): void {
    this.omitValidations();
  }

  private omitValidations(): void {
    if (!!this.argsDescriptorValue) {
      // do validations
    }
    // otherwise
    // no params validations, therefore allowing 'paramsDescriptor' to be not defined
  }
}
