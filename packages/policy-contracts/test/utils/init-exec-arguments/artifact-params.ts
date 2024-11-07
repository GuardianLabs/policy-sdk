import { BytesLike } from 'ethers';
import {
  EncodedParamType as NormalizedParamType,
  solidityEncodeMultipleParams,
  solidityEncodeSingleParam,
} from '../solidity-encode-decode';
import {
  ExecParamsBase,
  InitParamsBase,
  UnnormalizedExecParamsBase,
  UnnormalizedInitParamsBase,
} from './base/ArtifactParamsBase';
import {
  ExecParamsDescriptorType,
  ExecParamsDescriptorValueType,
  InitParamsDescriptorType,
  InitParamsDescriptorValueType,
  ParamsConfig,
  Unnormalized,
  UnnormalizedParamType,
} from './types';
import {
  normalizeParams,
  unwrapUnnormalized,
  wrapUnnormalized,
} from './validations.helper';

export class InitParams extends InitParamsBase {
  static async createWithDescriptor(
    descriptor: InitParamsDescriptorType,
    ...params: Array<NormalizedParamType>
  ) {
    const descriptorValue = await descriptor.getInitDescriptor();

    return this.create(descriptorValue, ...params);
  }

  static create(
    descriptorValue?: InitParamsDescriptorValueType,
    ...params: Array<NormalizedParamType>
  ) {
    const config: ParamsConfig<
      InitParamsDescriptorValueType,
      NormalizedParamType
    > = {
      paramsDescriptorValue: descriptorValue,
      params,
    };
    return this.build(config);
  }

  // processed init arguments
  public get params(): BytesLike {
    this.validateTotalParamsCount();

    const processdArgs = solidityEncodeMultipleParams(...this.args);

    return processdArgs;
  }

  protected normalizeParams(
    params: Array<NormalizedParamType>,
  ): Array<NormalizedParamType> {
    return params;
  }
}

export class ExecParams extends ExecParamsBase {
  static async createWithDescriptor(
    descriptor: ExecParamsDescriptorType,
    ...params: Array<NormalizedParamType>
  ) {
    const descriptorValue = await descriptor.getExecDescriptor();

    return this.create(descriptorValue, ...params);
  }

  static create(
    descriptorValue?: ExecParamsDescriptorValueType,
    ...params: Array<NormalizedParamType>
  ) {
    const config: ParamsConfig<
      ExecParamsDescriptorValueType,
      NormalizedParamType
    > = {
      paramsDescriptorValue: descriptorValue,
      params,
    };
    return this.build(config);
  }

  // processed exec arguments
  public get params(): Array<BytesLike> {
    this.validateTotalParamsCount();

    const processdArgs: BytesLike[] = this.args.map((v) =>
      solidityEncodeSingleParam(v),
    );

    return processdArgs;
  }

  // note: consume only a "method notation" when accessing parent class method, not "arrow function"; as well as in parent class
  // otherwise it will not override parent method
  // protected validateNewParam(...params: Array<EncodedParamType>): void {
  //   super.validateNewParam(...params);
  // }

  protected normalizeParams(
    params: Array<NormalizedParamType>,
  ): Array<NormalizedParamType> {
    return params;
  }
}

export class UnnormalizedExecParams extends UnnormalizedExecParamsBase {
  static async createWithDescriptor(
    descriptor: ExecParamsDescriptorType,
    ...params: Array<Unnormalized>
  ) {
    const descriptorValue = await descriptor.getExecDescriptor();

    return this.create(descriptorValue, ...params);
  }

  static create(
    descriptorValue?: ExecParamsDescriptorValueType,
    ...params: Array<Unnormalized>
  ) {
    // this is needed just in case type guard facilitation
    const wrappedParams = wrapUnnormalized(params);

    const config: ParamsConfig<
      ExecParamsDescriptorValueType,
      UnnormalizedParamType
    > = {
      paramsDescriptorValue: descriptorValue,
      params: wrappedParams,
    };
    return this.build(config);
  }

  public get params(): Array<BytesLike> {
    this.validateTotalParamsCount();

    const processdArgs: BytesLike[] = this.args.map((v) =>
      solidityEncodeSingleParam(v),
    );

    return processdArgs;
  }

  // note: consume only a "method notation" when accessing parent class method, not "arrow function"; as well as in parent class
  // otherwise it will not override parent method
  // protected validateNewParam(...params: Array<EncodedParamType>): void {
  //   super.validateNewParam(...params);
  // }

  protected normalizeParams(
    params: Array<UnnormalizedParamType>,
  ): Array<NormalizedParamType> {
    const unwrappedParams: Array<Unnormalized> = unwrapUnnormalized(params);

    return normalizeParams(
      this.expectedTypes,
      this.args.length,
      unwrappedParams,
    );
  }
}

export class UnnormalizedInitParams extends UnnormalizedInitParamsBase {
  static async createWithDescriptor(
    descriptor: InitParamsDescriptorType,
    ...params: Array<Unnormalized>
  ) {
    const descriptorValue = await descriptor.getInitDescriptor();

    return this.create(descriptorValue, ...params);
  }

  static create(
    descriptorValue?: InitParamsDescriptorValueType,
    ...params: Array<Unnormalized>
  ) {
    // this is needed just in case type guard facilitation
    const wrappedParams = wrapUnnormalized(params);

    const config: ParamsConfig<
      InitParamsDescriptorValueType,
      UnnormalizedParamType
    > = {
      paramsDescriptorValue: descriptorValue,
      params: wrappedParams,
    };
    return this.build(config);
  }

  public get params(): BytesLike {
    this.validateTotalParamsCount();

    const processdArgs = solidityEncodeMultipleParams(...this.args);

    return processdArgs;
  }

  protected normalizeParams(
    params: Array<UnnormalizedParamType>,
  ): Array<NormalizedParamType> {
    const unwrappedParams: Array<Unnormalized> = unwrapUnnormalized(params);

    return normalizeParams(
      this.expectedTypes,
      this.args.length,
      unwrappedParams,
    );
  }
}
