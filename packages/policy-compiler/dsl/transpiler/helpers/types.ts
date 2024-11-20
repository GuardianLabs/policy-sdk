import { ParsingResult } from '../../../ir';
import { InstanceConfigArgumentsOnly } from '../state';

export type MinTypedValue = {
  type: string;
  value: string;
};

export type TypedValue = MinTypedValue & {
  substitution?: boolean;
  constant?: boolean;
};

export type InnerValidationMiddleware = (
  artifactAddress: string,
  currentInstanceConfig: InstanceConfigArgumentsOnly,
) => Promise<void>;

export type OuterValidationMiddlerware = (
  output: ParsingResult[],
) => Promise<void>;

export type ValidationMiddlware = {
  innerValidations: InnerValidationMiddleware;
  outerValidations: OuterValidationMiddlerware;
};
