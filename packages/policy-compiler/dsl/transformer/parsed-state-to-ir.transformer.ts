import { mapToArray, TypedValue } from '../transpiler/helpers';
import { LatentState } from '../transpiler/state/LatentState';
import { InstanceConfig } from '../transpiler/state/types';

const formatArtifactClause = (artifactAddress: string) =>
  `{${artifactAddress}}`;
const formatExecArgumentsClause = (args: TypedValue[]) =>
  `(${args.map((el) => el.value).join(',')})`;
const formatInitArgumentsClause = (args: TypedValue[]) =>
  `<${args.map((el) => el.value).join(',')}>`;

export class IRTransformer {
  public static buildIRFromInstanceDeclaration({
    artifactAddress,
    execArguments,
    initArguments,
  }: InstanceConfig): string {
    return `${formatArtifactClause(artifactAddress)} ${formatExecArgumentsClause(execArguments)} ${formatInitArgumentsClause(initArguments)}`;
  }

  public static buildFullIR(state: LatentState): {
    rootNode: string;
    definitions: string[];
    typings: InstanceConfig[];
  } {
    const sortedInstances = mapToArray(state.instances).sort(
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
