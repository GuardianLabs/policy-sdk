import {
  InstanceConfigArgumentsOnly,
  NodeTreeInitData as ParsingResult,
} from '@guardian-network/shared';

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

export type TranspilerConfig = {
  partialSources?: boolean;
  sourcesDir: string;
};
