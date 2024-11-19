import { ContractRunner } from 'ethers';
import {
  IArbitraryDataArtifact,
  IArbitraryDataArtifact__factory,
} from '../../../../../../../policy-contracts/src/typechain';
import {
  ExecInitArtifactTypes,
  ExecInitArtifactTypesAndNames,
  IArgsTypesAndNamesSource,
  IArgsTypesSource,
} from '../../types';

export class OnchainDescriptorArgsTypesSource
  implements IArgsTypesAndNamesSource, IArgsTypesSource
{
  private artifactInstance!: IArbitraryDataArtifact;

  constructor(private provider: ContractRunner) {}

  protected connectInstance = (artifactAddress: string) => {
    this.artifactInstance = IArbitraryDataArtifact__factory.connect(
      artifactAddress,
      this.provider,
    );

    return this;
  };

  private getDescriptorsValues = async (instanceAddress: string) => {
    this.connectInstance(instanceAddress);

    const execDescriptorValue = await this.artifactInstance.getExecDescriptor();

    const initDescriptorValue = await this.artifactInstance.getInitDescriptor();

    return { execDescriptorValue, initDescriptorValue };
  };

  getDescriptors = async (
    instanceAddress: string,
  ): Promise<ExecInitArtifactTypes> => {
    const {
      execDescriptorValue: { argsTypes: execParamsTypes },
      initDescriptorValue: { argsTypes: initParamsTypes },
    } = await this.getDescriptorsValues(instanceAddress);

    // note: this requires spread to omit wrappers
    return {
      initParamsTypes: [...initParamsTypes],
      execParamsTypes: [...execParamsTypes],
    };
  };

  getAllDescriptors = async (
    instanceAddress: string,
  ): Promise<ExecInitArtifactTypesAndNames> => {
    const {
      execDescriptorValue: {
        argsTypes: execParamsTypes,
        argsNames: execParamsNames,
      },
      initDescriptorValue: {
        argsTypes: initParamsTypes,
        argsNames: initParamsNames,
      },
    } = await this.getDescriptorsValues(instanceAddress);

    // note: this requires spread to omit wrappers
    return {
      initParamsTypes: [...initParamsTypes],
      initParamsNames: [...initParamsNames],
      execParamsTypes: [...execParamsTypes],
      execParamsNames: [...execParamsNames],
    };
  };
}
