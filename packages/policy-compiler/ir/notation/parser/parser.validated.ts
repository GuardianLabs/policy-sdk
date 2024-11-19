import { ContractRunner } from 'ethers';
import { TranspilerOutput } from '../../../dsl';
import {
  dslTypesToOnchainTypesParamsValidation,
  onchainSubstitutionToReturnTypesValidation,
} from '../helpers';
import { ParserWithValidation } from './parser-contracts';

export const TypingsValidator = (provider: ContractRunner) => ({
  innerValidations: dslTypesToOnchainTypesParamsValidation(provider),
  outerValidations: onchainSubstitutionToReturnTypesValidation(provider),
});

export const getIRParser = (
  input: TranspilerOutput,
  provider: ContractRunner,
) => {
  const middlerware = TypingsValidator(provider);
  return {
    validated: {
      DSL_TYPING: async () => {
        const parser = ParserWithValidation.fromDSLBasedConfig(
          input.ir,
          input.typings,
          provider,
        );
        const parsed = await parser.process();
        return parsed;
        // const parsed = await parseIRByDSLTypesWithInterceptor(
        //   input,
        //   TypingsValidator(provider),
        // );
        // return parsed;
      },
      ONCHAIN_TYPING: async () => {
        const parser = ParserWithValidation.fromOnchainSource(
          input.ir,
          provider,
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
  };
};

export const getIRParserUnvalidate = (input: TranspilerOutput) => {
  const unvalidateParser = async () => {
    const parser = ParserWithValidation.fromDSLBasedConfig(
      input.ir,
      input.typings,
    );
    const parsed = await parser.process();
    return parsed;
    // const parsed = await parseIRByDSLTypesWithInterceptor(input);
    // return parsed;
  };

  return unvalidateParser;
};
