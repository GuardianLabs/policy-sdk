import {
  IgnitionModule,
  IgnitionModuleResult,
} from '@nomicfoundation/ignition-core';

export type IgnitionModuleResultType = IgnitionModuleResult<string>;

export type IgnitionModuleType = IgnitionModule<
  string,
  string,
  IgnitionModuleResultType
>;
