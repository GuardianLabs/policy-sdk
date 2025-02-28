import { ErrorFactory } from '../errors';
import {
  AllowedVariablesType,
  IAsyncMapGetter,
  NodeId,
  NodeVariablesConfig,
  SuppliedVariables,
  VarIndex,
  VarName,
  VarValue,
} from '../types';

// note: insert variable value
export class Inserter implements IAsyncMapGetter<AllowedVariablesType> {
  // static fromDump = (
  //   varsConfig: VariablesFormattedDescription[],
  //   dump: FilledVariables[],
  // ): Inserter => {
  //   const inserter = new Inserter(varsConfig);
  //   inserter.importDump(dump);
  //   return inserter;
  // };

  // the node-with-no-variables list
  private spareNodes: NodeVariablesConfig[] = [];

  // variable-unique-name => its-node-id
  private varNameToNodeId: Map<VarName, NodeId> = new Map();

  // variable-unique-name => its-index-in-node-vars-list
  private varNameToVarIndex: Map<VarName, VarIndex> = new Map();

  // node-id => its-filled-variables
  private nodeToVars: Map<NodeId, Array<VarValue>> = new Map();

  constructor(
    varsConfig /* expectedVarsConfig */ : NodeVariablesConfig[], // nodes-variables-config list
  ) {
    this.initialize(varsConfig);
  }

  private initialize = (varsConfig: NodeVariablesConfig[]) => {
    for (const nodeVars of varsConfig) {
      this.nodeToVars.set(nodeVars.nodeId, []);

      // if (varsByNode.variables) { // ERROR in legacy code

      if (nodeVars.variables.length === 0) {
        this.spareNodes.push(nodeVars);
      } else {
        for (const variable of nodeVars.variables) {
          this.varNameToNodeId.set(variable.uniqueName, nodeVars.nodeId);
          this.varNameToVarIndex.set(variable.uniqueName, variable.index);
        }
      }
    }
  };

  insert = (name: string, value: AllowedVariablesType) => {
    const targetNodeId = this.varNameToNodeId.get(name);

    if (!targetNodeId) throw ErrorFactory.variableNodeNotFound(name);

    if (!this.nodeToVars.get(targetNodeId))
      throw ErrorFactory.variableNodeNotFound(name);

    this.nodeToVars.get(targetNodeId)!.push({
      index: this.varNameToVarIndex.get(name)!,
      value,
    });
  };

  get = (varName: string): AllowedVariablesType | undefined => {
    const nodeId = this.varNameToNodeId.get(varName)!;

    const result = this.nodeToVars
      .get(nodeId)!
      .find((el) => el.index == this.varNameToVarIndex.get(varName))?.value;

    return result;
  };

  importDump = (dump: Array<SuppliedVariables>) => {
    for (const { nodeId, values } of dump) {
      this.nodeToVars.set(
        nodeId,
        values.map((value, index) => ({ index, value })),
      );
    }
  };

  get filledVars(): SuppliedVariables[] {
    const alreadyFilledVars: SuppliedVariables[] = [];

    for (let [targetNodeId, filledVariablesByNode] of this.nodeToVars) {
      let filledVariable: SuppliedVariables = {} as SuppliedVariables;
      filledVariable.nodeId = targetNodeId;

      const filledVariableValues = new Array<AllowedVariablesType>(
        filledVariablesByNode.length,
      );

      for (let variableValueConfig of filledVariablesByNode) {
        filledVariableValues[variableValueConfig.index] =
          variableValueConfig.value;
      }

      filledVariable.values = filledVariableValues;
      alreadyFilledVars.push(filledVariable);
    }

    const emptyVars: SuppliedVariables[] = this.spareNodes.map(
      ({ nodeId }) => ({
        nodeId,
        values: [],
      }),
    );

    // also push nodes without variables so they are processed anyways
    const result = [...alreadyFilledVars, ...emptyVars];
    return result;
  }
}
