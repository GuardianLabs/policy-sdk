import {
  NormalizedParamType,
  UnnormalizedOrNormalizedParamType,
} from '../types';
import {
  validateAppendedParamsCount,
  validateParamTypes,
  validateParamsCount,
  validateSupportedArgTypeValues,
} from '../validations.helper';

// note: loose or strict any validation by overriding in child class if needed
export abstract class ParamsValidations<
  T,
  ParamType extends UnnormalizedOrNormalizedParamType,
> {
  protected abstract args: NormalizedParamType[];
  protected abstract argsDescriptorValue: T;

  protected abstract get expectedTypes(): Array<string>;

  protected abstract normalizeParams(
    params: Array<ParamType>,
  ): Array<NormalizedParamType>;

  // note: params count is ok + supplied params types are expected types (+ params normalization, if needed)
  protected validateNewParam(
    ...params: Array<ParamType>
  ): NormalizedParamType[] {
    if (!this.argsDescriptorValue) {
      throw new Error('Descriptor is not set');
    }

    this.validatePostAppendParamsCount(params.length);

    const normalizedParams = this.normalizeParams(params);
    this.validateParamsType(normalizedParams);
    return normalizedParams;
  }

  // note: supplied params types must exactly match descriptor-defined params types
  protected validateParamsType(params: Array<NormalizedParamType>): void {
    validateParamTypes(this.expectedTypes, this.args.length, params);
  }

  // note: this helps to verify that an exact amount of params are supplied (according to descriptor-defined information)
  protected validateTotalParamsCount(): void {
    validateParamsCount(this.expectedTypes.length, this.args.length);
  }

  // note: this prevents to supply more params than artifact requires (according to descriptor-defined information)
  protected validatePostAppendParamsCount(paramsLength: number): void {
    validateAppendedParamsCount(
      this.expectedTypes.length,
      this.args.length,
      paramsLength,
    );
  }

  // note: prevents working with un-supported params types (when descriptor-defined params
  // types somehaw differ from known params type)
  protected validateSupportedArgTypeValues(values: string[]) {
    validateSupportedArgTypeValues(values);
  }
}
