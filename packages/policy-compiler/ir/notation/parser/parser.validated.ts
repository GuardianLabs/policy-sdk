import { Provider } from 'ethers';
import { TranspilerOutput } from '../../../dsl';
import {
  dslTypesToOnchainTypesParamsValidation,
  onchainSubstitutionToReturnTypesValidation,
} from '../helpers';
import { IntermediatePresentationParserWithValidation } from './parser-contracts';
import { parseIRByDSLTypesWithInterceptor } from './parser.unvalidated';

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
      ONCHAIN_TYPING: async () => {
        const parser =
          IntermediatePresentationParserWithValidation.buildWithValidations(
            input.ir,
            provider!,
            TypingsValidator(provider!),
          );
        const parsed = await parser.process();
        return parsed;
        // const parsed = await parseIRByOnchainTypesWithInterceptor(
        //   input,
        //   provider!,
        //   TypingsValidator(provider!),
        // )
        // return parsed;
      },
    },
    unvalidated: {
      DSL_TYPING: async () => await parseIRByDSLTypesWithInterceptor(input),
    },
  };
};
