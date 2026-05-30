# PolicyHandler

The `PolicyHandler` is the core entry point for managing and evaluating onchain policies. It acts as the orchestrator that stores the policy rules (represented as a Directed Acyclic Graph - DAG) and evaluates them against runtime variables.

---

## 1. Overview

A policy in this framework is a set of linked artifacts (nodes) forming a DAG. The `PolicyHandler` is responsible for:
1. **Initialization**: Storing the DAG structure (nodes and their relationships).
2. **Upgrades**: Replacing an existing policy DAG with a new one.
3. **Evaluation**: Traversing the DAG from the root node, passing runtime variables to the respective artifacts, and returning the final boolean result.

The `PolicyHandler` uses `DAGWithPolicyMetadata` under the hood to store and traverse the graph. It also inherits from `OwnerBase`, ensuring that only the designated administrator (or the contract that deployed it) can modify or evaluate the policy.

---

## 2. Core Methods

### `constructor(address _adminUser)`
Initializes the `PolicyHandler` and sets the `_adminUser` as the owner. Only the owner can call the state-modifying methods (`set`, `reset`, `evaluate`).

### `set(PolicyInitParams memory params)`
Initializes the policy handler with a set of rules.
- **`params`**: A `PolicyInitParams` struct containing the `rootNode` ID and an array of `NodeInitData` (the artifacts).
- **Constraints**: Can only be called once (`isInitialized` must be false). The number of nodes must not exceed `MAX_NODES_LENGTH`.
- **Emits**: `Set(bytes32 rootNodeId, uint256 nodesLength)`

### `reset(PolicyInitParams memory params)`
Re-initializes the policy handler with a new set of rules, abandoning the previous configuration.
- **`params`**: The new `PolicyInitParams`.
- **Constraints**: Can only be called if the policy is already initialized (`isInitialized` must be true).
- **Emits**: `Upgraded(bytes32 rootNodeId, uint256 nodesLength)`

### `evaluate(ExecVariables[] memory variables) returns (bool result)`
Evaluates the policy by traversing the DAG starting from the root node.
- **`variables`**: An array of `ExecVariables` structs. Each struct contains a `nodeId` and the runtime `values` (encoded bytes) required by that specific node.
- **Returns**: A boolean indicating whether the policy conditions were met.
- **Emits**: `Evaluated(bool result, bytes32 rootNodeId)`

### `getVariablesList() returns (ExecVarsMetadata[] memory list)`
Returns a list of metadata describing the runtime variables required by the policy. This is useful for offchain clients or consumer contracts to know exactly what arguments need to be provided during evaluation.

---

## 3. Usage Example

Below is an example of how to deploy a `PolicyHandler`, set up a policy DAG, and evaluate it. This example is adapted from the test suite (`packages/contracts/test/base-flow.test.ts`).

### Step 1: Deployment and Setup

First, deploy the `PolicyHandler` and the necessary artifacts. Then, define the policy structure (e.g., `(variable1 ^ true) && variable2`) and initialize the handler.

```typescript
import { ethers } from 'hardhat';
import { NodeId } from '@guardian-network/shared';
import { ParserWithValidation } from './types';

// 1. Deploy PolicyHandler
const PolicyHandlerFactory = await ethers.getContractFactory("PolicyHandler");
const policyHandler = await PolicyHandlerFactory.deploy(adminSigner.address);

// 2. Define the policy intermediate representation (DSL)
// Example: (variable1 ^ true) && variable2
const XOR_NODE = `{${xorArtifactAddress}} (true,var0$"") <>`;
const AND_NODE = `{${andArtifactAddress}} (|${NodeId.fromNotation(XOR_NODE, 1)}|,var1$"") <>`;

const intermediateRepresentation = `
  ${AND_NODE}
  ${XOR_NODE}
`;

// 3. Parse the representation into onchain init params
const parser = ParserWithValidation.fromOnchainSource(
  intermediateRepresentation,
  adminSigner,
);
const initParams = await parser.process();
const rootNodeId = NodeId.fromNotation(AND_NODE, 0);

// 4. Initialize the PolicyHandler
await policyHandler.set({
  rootNode: rootNodeId,
  nodes: initParams,
});
```

### Step 2: Evaluation

To evaluate the policy, provide the required runtime variables for the nodes that expect them.

```typescript
import { MockedExecParams } from './mocked-init-exec-arguments';

// 1. Prepare runtime variables for the nodes
const evaluateParams = [
  {
    nodeId: andNodeId, // The AND node expects 'variable2'
    values: MockedExecParams.withNormalizedArgs(true).params,
  },
  {
    nodeId: xorNodeId, // The XOR node expects 'variable1'
    values: MockedExecParams.withNormalizedArgs(false).params,
  },
];

// 2. Evaluate the policy
// In this case: (false ^ true) && true => true && true => true
const tx = await policyHandler.evaluate(evaluateParams);

// 3. Listen for the Evaluated event
// The event will emit (true, rootNodeId)
```

### Step 3: Upgrading the Policy

If the policy rules need to change, the owner can call `reset` with a new set of `PolicyInitParams`.

```typescript
// ... parse new intermediate representation into newInitParams ...

await policyHandler.reset({
  rootNode: newRootNodeId,
  nodes: newInitParams,
});
```

---

## 4. Error Handling

The `PolicyHandler` uses custom errors defined in `Errors.sol` for gas efficiency:
- `POLICY_ALREADY_INITIALIZED_ERR`: Thrown if `set()` is called more than once.
- `POLICY_NOT_INITIALIZED_ERR`: Thrown if `reset()`, `evaluate()`, or `getVariablesList()` are called before `set()`.
- `POLICY_DOES_NOT_HAVE_ANY_ARTIFACT_ERR`: Thrown if the `nodes` array in `PolicyInitParams` is empty.
- `INIT_NODES_LIST_IS_LARGER_THAN_MAX_LENGTH_ERR`: Thrown if the number of nodes exceeds `MAX_NODES_LENGTH` (to prevent call stack depth issues).
