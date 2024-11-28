import {
  ExecTypesDoNotMatchError,
  InitTypesDoNotMatchError,
  SubstitutionTypesDoNotMatchError,
} from './validation-errors';

export class ErrorFactory {
  static initTypesNotMacth = (
    ...params: Parameters<typeof InitTypesDoNotMatchError.create>
  ) => {
    return InitTypesDoNotMatchError.create(...params);
  };

  static execTypesNotMacth = (
    ...params: Parameters<typeof ExecTypesDoNotMatchError.create>
  ) => {
    return ExecTypesDoNotMatchError.create(...params);
  };

  static substitutionTypesNotMatch = (
    ...params: Parameters<typeof SubstitutionTypesDoNotMatchError.create>
  ) => {
    return SubstitutionTypesDoNotMatchError.create(...params);
  };
}
