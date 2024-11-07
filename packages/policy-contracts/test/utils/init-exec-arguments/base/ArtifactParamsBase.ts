import { BytesLike } from 'ethers';
import { EncodedParamType as NormalizedParamType } from '../../solidity-encode-decode';
import {
  ExecParamsDescriptorValueType,
  InitParamsDescriptorValueType,
  ParamsConfig,
  ParamsDescriptorValueType,
  UnnormalizedOrNormalizedParamType,
  UnnormalizedParamType,
} from '../types';
import {
  validateAppendedParamsCount,
  validateParamsCount,
  validateParamTypes,
  validateSupportedArgTypeValues,
} from '../validations.helper';

// note: loose or strict any validation by overriding in child class if needed
abstract class ParamsValidations<
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

abstract class ArtifactParamsBase<
  T extends ParamsDescriptorValueType,
  ParamType extends UnnormalizedOrNormalizedParamType,
> extends ParamsValidations<T, ParamType> {
  protected args: NormalizedParamType[];
  protected argsDescriptorValue!: T;

  // can not use 'ParamType' in static therefore a dedicated 'K' is apllied
  protected static build<T, R, K extends UnnormalizedOrNormalizedParamType>(
    this: new (config: ParamsConfig<T, K>) => R,
    config: ParamsConfig<T, K>,
  ): R {
    return new this(config);
  }

  constructor(config: ParamsConfig<T, ParamType>) {
    super();

    const { params } = config;
    this.args = [];

    if (!!config.paramsDescriptorValue) {
      // note: validate that each descriptor-defined type is actually supported as artifact-params
      this.validateSupportedArgTypeValues([
        ...config.paramsDescriptorValue.argsTypes,
      ]);

      this.argsDescriptorValue = config.paramsDescriptorValue;
    }

    if (!!params && params.length > 0) {
      this.appendParams(...params);
    }
  }

  add = (...params: Array<ParamType>): this => {
    this.appendParams(...params);

    return this;
  };

  clear = (): this => {
    this.args.length = 0;
    return this;
  };

  // consider the need of the property??
  descriptorValue = (newDescriptorValue: T): this => {
    this.argsDescriptorValue = newDescriptorValue;
    return this;
  };

  public abstract get params(): Array<BytesLike> | BytesLike;

  // note: raw (not processed) init (or exec) arguments
  public get rawParams(): Array<NormalizedParamType> {
    return this.args;
  }

  protected get expectedTypes(): Array<string> {
    return [...this.argsDescriptorValue.argsTypes];
  }

  protected appendParams(...params: Array<ParamType>): void {
    const normalizedParams = this.validateNewParam(...params);
    this.args.push(...normalizedParams);
  }
}

export abstract class ExecParamsBase extends ArtifactParamsBase<
  ExecParamsDescriptorValueType,
  NormalizedParamType
> {
  constructor(
    config: ParamsConfig<ExecParamsDescriptorValueType, NormalizedParamType>,
  ) {
    super(config);
  }
}

export abstract class InitParamsBase extends ArtifactParamsBase<
  InitParamsDescriptorValueType,
  NormalizedParamType
> {
  constructor(
    config: ParamsConfig<InitParamsDescriptorValueType, NormalizedParamType>,
  ) {
    super(config);
  }
}

export abstract class UnnormalizedInitParamsBase extends ArtifactParamsBase<
  InitParamsDescriptorValueType,
  UnnormalizedParamType
> {
  constructor(
    config: ParamsConfig<InitParamsDescriptorValueType, UnnormalizedParamType>,
  ) {
    super(config);
  }
}

export abstract class UnnormalizedExecParamsBase extends ArtifactParamsBase<
  ExecParamsDescriptorValueType,
  UnnormalizedParamType
> {
  constructor(
    config: ParamsConfig<ExecParamsDescriptorValueType, UnnormalizedParamType>,
  ) {
    super(config);
  }
}
