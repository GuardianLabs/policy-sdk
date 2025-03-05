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
  //   varsConfig: NodeVariablesConfig[],
  //   dump: SuppliedVariables[],
  // ): Inserter => {
  //   const inserter = new Inserter(varsConfig);
  //   inserter.import(dump);
  //   return inserter;
  // };

  // the node-with-no-variables list
  private spareNodesConfig: NodeVariablesConfig[] = [];

  // variable-unique-name => its-node-id
  private varNameToNodeId: Map<VarName, NodeId> = new Map();

  // variable-unique-name => its-index-in-node-vars-list (as defined in "this.nodeToVars")
  private varNameToVarIndex: Map<VarName, VarIndex> = new Map();

  // node-id => its-known-variables; known = filled
  private nodeToVars: Map<NodeId, Array<VarValue>> = new Map();

  constructor(
    varsConfig /* expectedVarsConfig */ : NodeVariablesConfig[], // nodes-variables-config list
  ) {
    this.initialize(varsConfig);
  }

  private initialize = (varsConfig: NodeVariablesConfig[]) => {
    for (const nodeVars of varsConfig) {
      this.nodeToVars.set(nodeVars.nodeId, []);

      // if (varsByNode.variables) { // note: legacy code has and ERROR at this point

      if (nodeVars.variables.length === 0) {
        this.spareNodesConfig.push(nodeVars);
      } else {
        for (const { index, uniqueName } of nodeVars.variables) {
          this.varNameToNodeId.set(uniqueName, nodeVars.nodeId);
          this.varNameToVarIndex.set(uniqueName, index);
        }
      }
    }
  };

  insert = (varName: string, varValue: AllowedVariablesType) => {
    const targetNodeId = this.varNameToNodeId.get(varName);
    if (!targetNodeId) throw ErrorFactory.variableNodeNotFound(varName);

    const nodeVariables = this.nodeToVars.get(targetNodeId);
    if (!nodeVariables)
      throw ErrorFactory.nodeVariablesAreUndefined(targetNodeId);

    nodeVariables.push({
      // todo: safer approach
      index: this.varNameToVarIndex.get(varName)!,
      value: varValue,
    });
  };

  get = (varName: string): AllowedVariablesType | undefined => {
    const nodeId = this.varNameToNodeId.get(varName)!;

    const result = this.nodeToVars
      // todo: safer approach
      .get(nodeId)!
      .find((el) => el.index == this.varNameToVarIndex.get(varName))?.value;

    return result;
  };

  import = (dump: Array<SuppliedVariables>) => {
    for (const { nodeId, values } of dump) {
      this.nodeToVars.set(
        nodeId,
        values.map((value, index) => ({ index, value })),
      );
    }
  };

  get filledVars(): SuppliedVariables[] {
    const suppliedVars: SuppliedVariables[] = [];

    for (let [targetNodeId, nodeVars] of this.nodeToVars) {
      let filledVariable: SuppliedVariables = {} as SuppliedVariables;

      const variableValuesTmp = new Array<AllowedVariablesType>(
        nodeVars.length,
      );

      for (let { index, value } of nodeVars) {
        // important: preserve index??; otherwise use nodeVars.map
        variableValuesTmp[index] = value;
      }

      filledVariable.values = variableValuesTmp;
      filledVariable.nodeId = targetNodeId;
      suppliedVars.push(filledVariable);
    }

    const emptyVars: SuppliedVariables[] = this.spareNodesConfig.map(
      ({ nodeId }) => ({
        nodeId,
        values: [],
      }),
    );

    // note: also push nodes without variables so they are processed anyways
    const result = [...suppliedVars, ...emptyVars];
    return result;
  }
}
