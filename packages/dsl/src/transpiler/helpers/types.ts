import { NodeTreeInitData as ParsingResult } from '@guardian-network/shared/src/types/contracts.types';
import { InstanceConfigArgumentsOnly } from '@guardian-network/shared/src/types/dsl.types';

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
