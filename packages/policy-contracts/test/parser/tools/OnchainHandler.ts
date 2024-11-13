import { ContractRunner } from 'ethers';
import {
  IArbitraryDataArtifact,
  IArbitraryDataArtifact__factory,
} from '../../types';
import { Descriptors, IOnchainHandler } from '../types';

export class OnchainHandler implements IOnchainHandler {
  private artifactInstance!: IArbitraryDataArtifact;

  constructor(private provider: ContractRunner) {}

  private getExecDescriptorValue = async (instanceAddress: string) => {
    this.connectInstance(instanceAddress);
    return this.artifactInstance.getExecDescriptor();
  };

  private getInitDescriptorValue = async (instanceAddress: string) => {
    this.connectInstance(instanceAddress);
    return this.artifactInstance.getInitDescriptor();
  };

  private getDescriptorsValues = async (instanceAddress: string) => {
    const execDescriptorValue =
      await this.getExecDescriptorValue(instanceAddress);
    const initDescriptorValue =
      await this.getInitDescriptorValue(instanceAddress);

    return { execDescriptorValue, initDescriptorValue };
  };

  protected connectInstance = (artifactAddress: string) => {
    this.artifactInstance = IArbitraryDataArtifact__factory.connect(
      artifactAddress,
      this.provider,
    );
  };

  getDescriptors = async (instanceAddress: string): Promise<Descriptors> => {
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
}
