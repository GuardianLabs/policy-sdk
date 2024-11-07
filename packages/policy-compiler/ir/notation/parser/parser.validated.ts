import { Provider } from 'ethers';
import { IArbitraryDataArtifact__factory } from '../../../../policy-contracts/src/typechain';
import { TranspilerOutput } from '../../../dsl';
import { InstanceConfig } from '../../../dsl/transpiler/state';
import { ExecTypesDoNotMatchError, InitTypesDoNotMatchError } from '../errors';
import { DSLTypesToIRTypes } from '../helpers';
import {
  parseIRByDSLTypesWithInterceptor,
  parseIRByOnchainTypesWithInterceptor,
} from './parser.unvalidated';

const DSLToOnchainTypingsValidator =
  (provider: Provider) =>
  async (artifactAddress: string, currentInstanceConfig: InstanceConfig) => {
    const instance = IArbitraryDataArtifact__factory.connect(
      artifactAddress,
      provider,
    );

    const { argsNames, argsTypes, returnType } =
      await instance.getExecDescriptor();

    const { argsNames: initArgsNames, argsTypes: initArgsTypes } =
      await instance.getInitDescriptor();

    for (let i = 0; i < initArgsNames.length; i++) {
      const mirroredDslParameter = currentInstanceConfig.initArguments[i];
      const parsedType = DSLTypesToIRTypes(mirroredDslParameter.type);
      if (initArgsTypes[i] !== parsedType) {
        throw new InitTypesDoNotMatchError(
          mirroredDslParameter.value,
          initArgsNames[i],
          initArgsTypes[i],
          parsedType,
        );
      }
    }

    for (let i = 0; i < argsNames.length; i++) {
      const mirroredDslParameter = currentInstanceConfig.execArguments[i];
      const parsedType = DSLTypesToIRTypes(mirroredDslParameter.type);
      if (argsTypes[i] !== parsedType) {
        throw new ExecTypesDoNotMatchError(
          mirroredDslParameter.value,
          argsNames[i],
          argsTypes[i],
          parsedType,
        );
      }
    }

    // todo: instance return type => exec arg type validation
  };

export const getIRParser = (input: TranspilerOutput, provider?: Provider) => {
  return {
    validated: {
      DSL_TYPING: async () =>
        await parseIRByDSLTypesWithInterceptor(
          input,
          DSLToOnchainTypingsValidator(provider!),
        ),
      ONCHAIN_TYPING: async () =>
        await parseIRByOnchainTypesWithInterceptor(
          input,
          provider!,
          DSLToOnchainTypingsValidator(provider!),
        ),
    },
    unvalidated: {
      DSL_TYPING: async () => await parseIRByDSLTypesWithInterceptor(input),
    },
  };
};
