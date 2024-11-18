import { Provider } from 'ethers';
import { TranspilerOutput } from '../../../dsl';
import {
  dslTypesToOnchainTypesParamsValidation,
  onchainSubstitutionToReturnTypesValidation,
} from '../helpers';
import { parseIRByDSLTypesWithInterceptor, parseIRByOnchainTypesWithInterceptor } from './parser.unvalidated';

const TypingsValidator = (provider: Provider) => ({
  innerValidations: dslTypesToOnchainTypesParamsValidation(provider),
  outerValidations: onchainSubstitutionToReturnTypesValidation(provider),
});

export const getIRParser = (input: TranspilerOutput, provider?: Provider) => {
  return {
    validated: {
      DSL_TYPING: async () =>
        await parseIRByDSLTypesWithInterceptor(
          input,
          TypingsValidator(provider!),
        ),
        ONCHAIN_TYPING: async () =>
          await parseIRByOnchainTypesWithInterceptor(
            input,
            provider!,
            TypingsValidator(provider!),
          ),  
    },
    unvalidated: {
      DSL_TYPING: async () => await parseIRByDSLTypesWithInterceptor(input),
    },
  };
};
