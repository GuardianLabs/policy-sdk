import { NodeTreeInitData as ParsingResult } from '@guardian-network/shared/src/types/contracts.types';
import { MinTypedValue } from '@guardian-network/shared/src/types/dsl.types';
import { ContractRunner } from 'ethers';
import { ErrorFactory } from '../../errors';
import { IArbitraryDataArtifact__factory } from '../../types';
import { DSLTypesToIRTypes } from '../formatters';

type InitExecArgumentsConfig = {
  execArguments: Array<MinTypedValue>;
  initArguments: Array<MinTypedValue>;
};

export const dslTypesToOnchainTypesParamsValidation =
  (provider: ContractRunner) =>
  async (
    artifactAddress: string,
    initExecArgumentsConfig: InitExecArgumentsConfig,
  ) => {
    const instance = IArbitraryDataArtifact__factory.connect(
      artifactAddress,
      provider,
    );

    const { argsNames, argsTypes } = await instance.getExecDescriptor();

    const { argsNames: initArgsNames, argsTypes: initArgsTypes } =
      await instance.getInitDescriptor();

    for (let i = 0; i < initArgsNames.length; i++) {
      const mirroredDslParameter = initExecArgumentsConfig.initArguments[i];
      const parsedType = DSLTypesToIRTypes(mirroredDslParameter.type);
      if (initArgsTypes[i] !== parsedType) {
        throw ErrorFactory.initTypesNotMacth(
          mirroredDslParameter.value,
          initArgsNames[i],
          initArgsTypes[i],
          parsedType,
        );
      }
    }

    for (let i = 0; i < argsNames.length; i++) {
      const mirroredDslParameter = initExecArgumentsConfig.execArguments[i];
      const parsedType = DSLTypesToIRTypes(mirroredDslParameter.type);
      if (argsTypes[i] !== parsedType) {
        throw ErrorFactory.execTypesNotMacth(
          mirroredDslParameter.value,
          argsNames[i],
          argsTypes[i],
          parsedType,
        );
      }
    }
  };

export const onchainSubstitutionToReturnTypesValidation =
  (provider: ContractRunner) => async (output: ParsingResult[]) => {
    for (const instance of output) {
      const currentInstance = IArbitraryDataArtifact__factory.connect(
        <string>instance.artifactAddress,
        provider,
      );

      for (const refNode of instance.substitutions) {
        const refDeclaration = output.find((el) => el.id == refNode.value)!;
        const refArtifactInstance = IArbitraryDataArtifact__factory.connect(
          <string>refDeclaration?.artifactAddress,
          provider,
        );

        const { returnType } = await refArtifactInstance.getExecDescriptor();
        const { argsTypes, argsNames } =
          await currentInstance.getExecDescriptor();

        if (!(argsTypes[Number(refNode.index)] == returnType))
          throw ErrorFactory.substitutionTypesNotMatch(
            <string>instance.id,
            argsNames[Number(refNode.index)],
            argsTypes[Number(refNode.index)],
            <string>refNode.value,
            returnType,
          );
      }
    }
  };
