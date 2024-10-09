import { BytesLike } from 'ethers';
import {
  EncodedParamType,
  solidityEncodeMultipleParams,
  solidityEncodeSingleParam,
} from '../solidity-encode-decode';
import { ExecParamsDescriptorType, InitParamsDescriptorType } from './types';

type ParamsConfig<T> = {
  descriptor?: T;
  params?: Array<EncodedParamType>;
};

abstract class ArtifactParams<T> {
  protected args: EncodedParamType[];
  protected paramsDescriptor!: T;

  protected static build<T, R>(
    this: new (config: ParamsConfig<T>) => R,
    config: ParamsConfig<T>,
  ): R {
    return new this(config);
  }

  constructor(config: ParamsConfig<T>) {
    const { params } = config;
    this.args = [];

    if (!!config.descriptor) {
      this.paramsDescriptor = config.descriptor;
    }

    if (!!params && params.length > 0) {
      this.appendParams(...params);
    }
  }

  add = (...params: Array<EncodedParamType>): this => {
    this.appendParams(...params);

    return this;
  };

  clear = (): this => {
    this.args.length = 0;
    return this;
  };

  descriptor = (newDescriptor: T): this => {
    this.paramsDescriptor = newDescriptor;
    return this;
  };

  public abstract get params(): Array<BytesLike> | BytesLike;

  // raw (not processed) init (or exec) arguments
  public get rawParams(): Array<EncodedParamType> {
    return this.args;
  }

  protected appendParams = (...params: Array<EncodedParamType>): void => {
    this.validateNewParam(...params);
    this.args.push(...params);
  };

  protected validateNewParam(...params: Array<EncodedParamType>): void {
    if (!this.paramsDescriptor) {
      throw new Error('Descriptor is not set');
    }
  }
}

export class InitParams extends ArtifactParams<InitParamsDescriptorType> {
  static create = (
    descriptor?: InitParamsDescriptorType,
    ...params: Array<EncodedParamType>
  ) => {
    const config: ParamsConfig<InitParamsDescriptorType> = {
      descriptor,
      params,
    };
    return this.build(config);
  };

  // processed init arguments
  public get params(): BytesLike {
    const processdArgs = solidityEncodeMultipleParams(...this.args);

    return processdArgs;
  }

  protected validateNewParam(...params: Array<EncodedParamType>): void {
    super.validateNewParam(...params);
  }
}

export class ExecParams extends ArtifactParams<ExecParamsDescriptorType> {
  static create(
    descriptor?: ExecParamsDescriptorType,
    ...params: Array<EncodedParamType>
  ) {
    const config: ParamsConfig<ExecParamsDescriptorType> = {
      descriptor,
      params,
    };
    return this.build(config);
  }

  // processed exec arguments
  public get params(): Array<BytesLike> {
    const processdArgs: BytesLike[] = this.args.map((v) =>
      solidityEncodeSingleParam(v),
    );

    return processdArgs;
  }

  // note: consume only a "method notation" when accessing parent class method, not "arrow function"; as well as in parent class
  // otherwise it will not override parent method
  protected validateNewParam(...params: Array<EncodedParamType>): void {
    super.validateNewParam(...params);
  }
}
