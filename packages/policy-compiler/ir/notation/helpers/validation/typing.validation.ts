import { Provider } from 'ethers';
import { ParsingResult } from '../../..';
import { IArbitraryDataArtifact__factory } from '../../../../../policy-contracts/src/typechain';
import { InstanceConfig } from '../../../../dsl/transpiler/state';
import {
  ExecTypesDoNotMatchError,
  InitTypesDoNotMatchError,
  SubstitutionTypesDoNotMatchError,
} from '../../errors';
import { DSLTypesToIRTypes } from '../formatters';

export const dslTypesToOnchainTypesParamsValidation =
  (provider: Provider) =>
  async (artifactAddress: string, currentInstanceConfig: InstanceConfig) => {
    const instance = IArbitraryDataArtifact__factory.connect(
      artifactAddress,
      provider,
    );

    const { argsNames, argsTypes } = await instance.getExecDescriptor();

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
  };

export const onchainSubstitutionToReturnTypesValidation =
  (provider: Provider) => async (output: ParsingResult[]) => {
    for (const instance of output) {
      const currentInstance = IArbitraryDataArtifact__factory.connect(
        instance.artifactAddress,
        provider,
      );

      for (const refNode of instance.substitutions) {
        const refDeclaration = output.find((el) => el.id == refNode.value)!;
        const refArtifactInstance = IArbitraryDataArtifact__factory.connect(
          refDeclaration?.artifactAddress,
          provider,
        );

        const { returnType } = await refArtifactInstance.getExecDescriptor();
        const { argsTypes, argsNames } =
          await currentInstance.getExecDescriptor();

        if (!(argsTypes[refNode.index] == returnType))
          throw new SubstitutionTypesDoNotMatchError(
            instance.id,
            argsNames[refNode.index],
            argsTypes[refNode.index],
            refNode.value,
            returnType,
          );
      }
    }
  };
