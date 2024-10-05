# Policy SDK monorepository

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
cd packages/artifacts-contracts
pnpm publish
```

### 3. Publish DSL library
```bash
cd packages/artifacts-dsl
pnpm publish
```

### 4. Publish CLI library
```bash
cd packages/artifacts-cli
pnpm publish
```
