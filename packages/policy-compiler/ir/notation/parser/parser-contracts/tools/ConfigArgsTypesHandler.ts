import { InstanceConfig } from '../../../../../dsl/transpiler/state/types';
import { DSLTypesToIRTypes } from '../../../helpers';
import { Descriptors, IGetArgsTypes } from '../types';

export class ConfigArgsTypesHandler implements IGetArgsTypes {
  static build = (
    ipArtifactInstanceConfigList: InstanceConfig[],
  ): ConfigArgsTypesHandler => {
    return new ConfigArgsTypesHandler(ipArtifactInstanceConfigList);
  };

  constructor(private configList: InstanceConfig[]) {}

  private getArtifactConfig = (
    instanceAddress: string,
    pos?: number,
  ): InstanceConfig => {
    const isPosProvided = typeof pos !== 'undefined';
    if (!isPosProvided) {
      throw new Error('Config index in index list is not provided');
    }

    const config = this.configList.find(
      (v, index) => v.artifactAddress === instanceAddress && index == pos,
    );

    if (!config) {
      throw new Error(
        `The artifact config of ${instanceAddress} is not found within config list at pos ${pos}`,
      );
    }
    return config;
  };

  getDescriptors = async (
    instanceAddress: string,
    posAtConfigList?: number,
  ): Promise<Descriptors> => {
    const { initArguments: initArgsRaw, execArguments: execArgsRaw } =
      this.getArtifactConfig(instanceAddress, posAtConfigList);

    const initParamsTypes = initArgsRaw
      .map((v) => v.type)
      .map(DSLTypesToIRTypes);
    const execParamsTypes = execArgsRaw
      .map((v) => v.type)
      .map(DSLTypesToIRTypes);

    return { initParamsTypes, execParamsTypes };
  };
}
