# Composable policy with arbitrary artifacts system contracts
The policy system needs to be backed with all kinds of setellite contracts to work properly. This package provides them.

- **Predefined artifacts** \
Provides a set of already writted basic artifacts to start with. \
They include some kinds of logical operators, mathematical operations, language constructions and so on. \
`packages/contracts/contracts/pre-defined`

- **Policy handler entrypoint** \
The main contract a third-party developer will interact with. \
`packages/contracts/contracts/PolicyHandler.sol` \
Contains 3 crusial methods: 
1. `set` \
Creates the policy using its definition in final representation form (IR translator output, DSL compiler output).
2. `evaluate` \
Evaluates the policy agains provided variables.
That is the main method to use when one wants to test if the operation (transaction, action, request, etc) complies with the policy created on step 1 (`set`).
The variables must be provided in a specific format which can be fitted in with the help of **`variables`** package.
3. `getVariablesList` \
Used to obtain, enumerate or show to the client all the variables that must be filled for `evaluate` to be dispatched. Contains descriptors of the variables, their types and other metadata.

To use the policy system, one needs to deploy `PolicyHandler.sol`  and all needed artifacts (ours or writted by third-party). After this, the following steps are considered standard:
1. **Create policy** \
Freshly deployed `PolicyHandler` do not contain any policy logic.
Create the policy using DSL or other instrument that translates into FR, and then use the output to invoke `set`.
2. **Prepare arguments** \
If the policy contains any variables that need to be filled, use `getVariablesList` to get them and format their values in any convenient way (e.g. with the help of `variables` package).
3. **Evaluate policy** \
Use values obtained on step 2 to dispatch `evaluate` method. The policy may pass or reject - get the evaluation result as the method return value or via `Evaluated(bool result, bytes32 rootNode)` event.
