import { mapToArray } from '@guardian-network/shared/src/misc-utils/data-structure-transformation.helper';
import {
  InstanceConfig,
  TypedValue,
} from '@guardian-network/shared/src/types/dsl.types';
import { LatentState } from '../transpiler/state/LatentState';

export class IRTransformer {
  public static buildIRFromInstanceDeclaration(config: InstanceConfig): string {
    return formatDeclaration(config);
  }

  public static buildFullIR(state: LatentState): {
    rootNode: string;
    definitions: string[];
    typings: InstanceConfig[];
  } {
    const sortedInstances = mapToArray(state.instancesByName).sort(
      (a, b) => a.index - b.index,
    );

    return {
      definitions: sortedInstances.map((el) =>
        this.buildIRFromInstanceDeclaration(el.config),
      ),
      rootNode: state.evaluateRelativeTo!.nodeId,
      typings: sortedInstances.map((el) => el.config),
    };
  }
}

const formatArtifactClause = (artifactAddress: string) =>
  `{${artifactAddress}}`;

const formatExecArgumentsClause = (args: TypedValue[]) =>
  `(${args.map((el) => el.value).join(',')})`;

const formatInitArgumentsClause = (args: TypedValue[]) =>
  `<${args.map((el) => el.value).join(',')}>`;

const formatDeclaration = (config: InstanceConfig) => {
  const { artifactAddress, initArguments, execArguments } = config;

  const formatted = `${formatArtifactClause(artifactAddress)} ${formatExecArgumentsClause(execArguments)} ${formatInitArgumentsClause(initArguments)}`;
  return formatted;
};
