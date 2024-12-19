# Policy Variables population helper
Policy may have variables values of which need to be provided during the evaluation step. \
These values must be formatted and encoded into specific form that onchain Policy handler understands. This package is dedicated to help with it.

------------

Variables can be injected or inserted. \
**Inserted** variables are those that are just set by the user in a regular manner. They are only associated with their onchain name (in an artifact scope). \
**Injected** variables, along with all the properties *inserted* have, also contain an attribute tag. *Attribute tag* is a simple string that contains the name of a property/field/variable existing internally in a middleware. We can consider any program having some internal attributes (`time`, `tx_count`, `balance`) and willing to automatically fill in these attributes being middleware.
> Backend with a property `server_time` can be considered being middleware with an attribute `server_time`. Any policy containing injected variable with injection tag `server_time` can be automatically filled with the value of this property on the backend.

------------
### Usage
The main class needed is `VariablesPopulator`, exported from `./src`. \
It needs description of variables of a policy, returned by the onchain method of Policy Handler `getVariablesList`. \
The populator can then be built:
```javascript
const populator = new VariablesPopulator(rawOnchainVariables);
```
The populator instance now can be receive inserted variables via method `insert`:
```javascript
populator.insert('argA_bool_0x084e6d675B4F24854f351f5A4E39E65E017d2954_2', true); // isAdmin
```
Or can automatically map injected variables, given the values source:
```javascript
const internalAttributes = new Map();
internalAttributes.set('allowance', new Promise((resolve) => resolve(13_000)));
await populator.inject(internalAttributes);
```
The final encoded values can be obtained with the help of `getVariablesEncoded` method:
```javascript
const vars = populator.getVariablesEncoded();
```
And then provided directely into `evaluateGraph` onchain PolicyHandler method.
> To list variables, use `getVariablesDescription` method.

### Validation
Except setters and getters, validation methods are provided. \
`validateFilledAllOrThrow` ensures all variable values (inserted and injected) are filled. \
`validateFilledAllExceptInjectionsOrThrow` ensures inserted variable values are filled - ignoring *injected* consistency.
### Interrupted flow
To fill the variables partially and then continue with other `VariablesPopulator` instance (but having same state), dump and import methods exist. \
To dump already filled values, use `getVariablesValues` method. \
To import values filled previously into fresh `VariablesPopulator` instance use `import` methods. 
```javascript
const oldPopulator = new VariablesPopulator(rawOnchainVariables);
// insert/inject
intermediateFillingResult = oldPopulator.getVariablesValues();

// switching scope

const newPopulator = new VariablesPopulator(rawOnchainVariables);
newPopulator.import(intermediateFillingResult);

// now oldPopulator is equivalent to newPopulator
```
### Format details

------------


Insertion operation uses unique variables names that is constructed in this way: \
`<name of the parameter on the artifact>_<its type>_<artifact address>_<index of the node in the policy graph>` \
This value is guaranteed to be unique for every variable in one policy and can be used to index them/grasp/select/etc.

------------
Injection needs values source of the interface:
```javascript
interface IAsyncMapGetter<ValueType> {
  get(key: string): Promise<ValueType> | ValueType | undefined;
}
```
So it can be a regular `Map` with string key and value/promise mappings, or more complex classes and objects.
