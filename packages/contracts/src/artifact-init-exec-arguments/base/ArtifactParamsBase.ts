import { BytesLike } from 'ethers';
import {
  ArtifactParamsConfig,
  ExecParamsDescriptorValueType,
  InitParamsDescriptorValueType,
  NormalizedParamType,
  ParamsDescriptorValueType,
  UnnormalizedOrNormalizedParamType,
  UnnormalizedParamType,
} from '../types';
import { ParamsValidations } from './ParamsValidations';

abstract class ArtifactParamsBase<
  T extends ParamsDescriptorValueType,
  ParamType extends UnnormalizedOrNormalizedParamType,
> extends ParamsValidations<T, ParamType> {
  protected args: NormalizedParamType[];
  protected argsDescriptorValue!: T;

  // note: can not use 'ParamType' in static therefore a dedicated 'K' is apllied
  protected static build<T, R, K extends UnnormalizedOrNormalizedParamType>(
    this: new (config: ArtifactParamsConfig<T, K>) => R,
    config: ArtifactParamsConfig<T, K>,
  ): R {
    return new this(config);
  }

  constructor(config: ArtifactParamsConfig<T, ParamType>) {
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
    config: ArtifactParamsConfig<
      ExecParamsDescriptorValueType,
      NormalizedParamType
    >,
  ) {
    super(config);
  }
}

export abstract class InitParamsBase extends ArtifactParamsBase<
  InitParamsDescriptorValueType,
  NormalizedParamType
> {
  constructor(
    config: ArtifactParamsConfig<
      InitParamsDescriptorValueType,
      NormalizedParamType
    >,
  ) {
    super(config);
  }
}

export abstract class UnnormalizedInitParamsBase extends ArtifactParamsBase<
  InitParamsDescriptorValueType,
  UnnormalizedParamType
> {
  constructor(
    config: ArtifactParamsConfig<
      InitParamsDescriptorValueType,
      UnnormalizedParamType
    >,
  ) {
    super(config);
  }
}

export abstract class UnnormalizedExecParamsBase extends ArtifactParamsBase<
  ExecParamsDescriptorValueType,
  UnnormalizedParamType
> {
  constructor(
    config: ArtifactParamsConfig<
      ExecParamsDescriptorValueType,
      UnnormalizedParamType
    >,
  ) {
    super(config);
  }
}
