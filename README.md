# Policy SDK monorepository
A set of instruments, implementations and references to ***Composable policies with arbitrary artifacts*** approach. \
You may want to see the subpackages READMEs, but here is a brief digest:
- Policies consist of atomic operations - artifacts (`./contracts`)
- The policy can be created using special low-level notation (`./intermediate-representation`)
- Or using human-oriented high-level syntax (`./compiler`, described `./dsl`)
- The high-level language has standalone interface (`./cli`)
- To evaluate the created policy, you may need to provide some variables (`./variables`)
- There is a codebase used and shared between multiple workspace packages (`./shared`)
- The policy client, which encapsulates most onchain and offchain steps (**creation**, **deployment**, **initialisation**) required to complete before the Policy consumption (`./client`)

## Steps to build, run, test:

* Install [pnpm](https://pnpm.io/installation)
* ```pnpm i```
* ```pnpm clean:all``` 
* ```pnpm build:all```
* ```pnpm test:all```


## Release new version

### Prepare
Set `GUARDIAN_NPM_TOKEN` environment variable to your personal gitlab token with private npm-registry publish permission.

### 1. Tag new version
```bash
pnpm version [major|minor|patch]
```

### 2. Publish Contracts package
```bash
cd packages/contracts
pnpm publish
```

### 3. Publish Compiler package
```bash
cd packages/compiler
pnpm publish
```

### 4. Publish Intermediate-Representation package
```bash
cd packages/intermediate-representation
pnpm publish
```

### 5. Publish DSL package
```bash
cd packages/dsl
pnpm publish
```

### 6. Publish Policy CLI package
```bash
cd packages/cli
pnpm publish
```

### 7. Publish Variables-Populator package
```bash
cd packages/variables
pnpm publish
```

### 8. Publish Shared-utils package
```bash
cd packages/shared
pnpm publish
```

### 9. Publish Client package
```bash
cd packages/client
pnpm publish
```