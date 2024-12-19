# Policy SDK monorepository
A set of instruments, implementations and references to ***Composable policies with arbitrary artifacts*** approach. \
You may want to see the subpackages READMEs, but here is a brief digest:
- Policies consist of atomic operations - artifacts (`./contracts`)
- The policy can be created using special low-level notation (`./ir`)
- Or using human-oriented high-level syntax (`./compiler`, described `./dsl`)
- The high-level language has standalone interface (`./cli`)
- To evaluate the created policy, you may need to provide some variables (`./variables`)

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

### 2. Publish Contracts library
```bash
cd packages/contracts
pnpm publish
```

### 3. Publish DSL library
```bash
cd packages/dsl
pnpm publish
```

### 4. Publish CLI library
```bash
cd packages/cli
pnpm publish
```
