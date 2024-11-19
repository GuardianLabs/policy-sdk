import { VariableNodeNotFoundError } from '../errors';
import {
  AllowedVariablesType,
  FilledVariables,
  IAsyncMapGetter,
  VariablesFormattedDescription,
} from '../types';

export class VariablesInserter
  implements IAsyncMapGetter<AllowedVariablesType>
{
  private nameToNodeId: Map<string, string> = new Map(); // variable unique name to its node id
  private nameToVariableIndex: Map<string, number> = new Map(); // variable unique name to its index in node's variables list
  private variablesValues: Map<
    string,
    {
      index: number;
      value: AllowedVariablesType;
    }[]
  > = new Map(); // node id to its filled variables values
  private spareNodes: VariablesFormattedDescription[] = []; // nodes without variables

  constructor(expectedVariablesConfig: VariablesFormattedDescription[]) {
    for (const expectedVariablesByNode of expectedVariablesConfig) {
      this.variablesValues.set(expectedVariablesByNode.nodeId, []);
      if (expectedVariablesByNode.variables) {
        for (const variable of expectedVariablesByNode.variables) {
          this.nameToNodeId.set(
            variable.uniqueName,
            expectedVariablesByNode.nodeId,
          );
          this.nameToVariableIndex.set(variable.uniqueName, variable.index);
        }
      } else this.spareNodes.push(expectedVariablesByNode);
    }
  }

  public insert(variableUniqueName: string, value: AllowedVariablesType) {
    const targetNodeId = this.nameToNodeId.get(variableUniqueName);
    if (!targetNodeId) throw new VariableNodeNotFoundError(variableUniqueName);
    if (!this.variablesValues.get(targetNodeId))
      throw new VariableNodeNotFoundError(variableUniqueName);

    this.variablesValues.get(targetNodeId)!.push({
      index: this.nameToVariableIndex.get(variableUniqueName)!,
      value,
    });
  }

  public get(variableUniqueName: string): AllowedVariablesType | undefined {
    const nodeId = this.nameToNodeId.get(variableUniqueName)!;
    return this.variablesValues
      .get(nodeId)!
      .find(
        (el) => el.index == this.nameToVariableIndex.get(variableUniqueName),
      )?.value;
  }

  public import(dump: FilledVariables[]) {
    for (const { nodeId, values } of dump) {
      this.variablesValues.set(
        nodeId,
        values.map((value, index) => ({ index, value })),
      );
    }
  }

  public getFilledVariables(): FilledVariables[] {
    let filledVariablesValuesByNode: FilledVariables[] = [];

    for (let [targetNodeId, filledVariablesByNode] of this.variablesValues) {
      let filledVariable: FilledVariables = {} as FilledVariables;
      filledVariable.nodeId = targetNodeId;

      const filledVariableValues = new Array<AllowedVariablesType>(
        filledVariablesByNode.length,
      );
      for (let variableValueConfig of filledVariablesByNode) {
        filledVariableValues[variableValueConfig.index] =
          variableValueConfig.value;
      }

      filledVariable.values = filledVariableValues;
      filledVariablesValuesByNode.push(filledVariable);
    }

    // push nodes without variables so they are processed anyways
    filledVariablesValuesByNode = filledVariablesValuesByNode.concat(
      this.spareNodes.map(({ nodeId }) => ({
        nodeId,
        values: [],
      })),
    );

    return filledVariablesValuesByNode;
  }
}
