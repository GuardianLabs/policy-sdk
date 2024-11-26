import { ContractRunner } from 'ethers';
import { ParsingResult } from '../../..';
import { IArbitraryDataArtifact__factory } from '../../../../../../policy-contracts/src/typechain';
import { MinTypedValue } from '../../../../dsl/transpiler/helpers';
import {
  ExecTypesDoNotMatchError,
  InitTypesDoNotMatchError,
  SubstitutionTypesDoNotMatchError,
} from '../../errors';
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
        throw new InitTypesDoNotMatchError(
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
          throw new SubstitutionTypesDoNotMatchError(
            <string>instance.id,
            argsNames[Number(refNode.index)],
            argsTypes[Number(refNode.index)],
            <string>refNode.value,
            returnType,
          );
      }
    }
  };
