import { InstanceConfig } from '@guardian-network/shared/src/types/dsl.types';
import { DSLTypesToIRTypes } from '../../../../helpers';
import { ExecInitArtifactTypes, IArgsTypesSource } from '../../types';

export class DSLConfigArgsTypesSource implements IArgsTypesSource {
  static build = (
    ipArtifactInstanceConfigList: InstanceConfig[],
  ): DSLConfigArgsTypesSource => {
    return new DSLConfigArgsTypesSource(ipArtifactInstanceConfigList);
  };

  constructor(private configList: InstanceConfig[]) {}

  private getArtifactConfiguration = (
    instanceAddress: string,
    pos?: number,
  ): InstanceConfig => {
    const isPosProvided = typeof pos !== 'undefined';
    if (!isPosProvided) {
      throw new Error('Config index in index list is not provided');
    }

    const config = this.configList.find(
      (value, index) =>
        value.artifactAddress === instanceAddress && index == pos,
    );

    if (!config) {
      throw new Error(
        `The artifact config of ${instanceAddress} is not found within config list at pos ${pos}`,
      );
    }
    return config;
  };

  getTypes = async (
    instanceAddress: string,
    posAtConfigList?: number,
  ): Promise<ExecInitArtifactTypes> => {
    const { initArguments: initArgsRaw, execArguments: execArgsRaw } =
      this.getArtifactConfiguration(instanceAddress, posAtConfigList);

    const initParamsTypes = initArgsRaw
      .map((v) => v.type)
      .map(DSLTypesToIRTypes);
    const execParamsTypes = execArgsRaw
      .map((v) => v.type)
      .map(DSLTypesToIRTypes);

    return { initParamsTypes, execParamsTypes };
  };
}
