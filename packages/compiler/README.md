# Policy definition DSL (LacLang) compiler
The package exposes programmatical compiler of LacLang sources.
The resulting object can be used directely to initialize policy onchain.

`LacLangCompiler` class, exported from the `src` directory, represents the LacLang compiler.
The instance of the compiler can be constructed both from file (path provided) or from sources (string provided).
```javascript
const compiler = await LacLangCompiler.fromFile(lacSourcePath);
```
```javascript
const compiler = await LacLangCompiler.fromSources(lacSources);
```

Also, compiler options can be provided.
Compiler options are setting the type checking mode - whether it will be onchain or DSL declarations.
If any of the type checking modes are selected, the JSON-RPC provider also must be defined. If neither were selected, types are not checked and the code is immediately translated.
```javascript
interface LacLangCompilerOptions {
  checkTypesAgainstOnchainDescriptors?: boolean;
  checkTypesAgainstDslDeclarations?: boolean;
  provider?: ContractRunner;
}
```

The compilation results are obtained after invoking `compile` method on the preconfigured compiler:
```javascript
const compilationResult = await compiler.compile();
```
The resulting object can be immediately passed directely to the onchain policy handler.
```javascript
await policyHandler.initGraph(compilationResult);
```

The compiler sequentially translates the DSL into IR, and then IR into final representation. FR is natively compatible with onchain policy handler.