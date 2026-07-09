# Policy SDK Monorepository

**Programmable compliance** in the context of blockchain and digital assets is the practice of embedding legal requirements, regulatory requirements, and business rules related to compliance directly into the software that governs digital assets and transactions. Instead of relying solely on manual reviews or after-the-fact monitoring, compliance rules are automatically enforced by code.

This SDK is a collection of tools, packages, libraries, and reference implementations that help developers implement programmable compliance in smart contracts and Web2 applications that use smart contracts as their source of truth. \
At its core, the SDK is based on the approach originally introduced in [ERC-8006](https://github.com/GuardianLabs/ERCs/blob/universal-policy-engine/ERCS/erc-8006.md), which defines a framework for composing policies from dynamic, adjustable rules. This modular design enables developers to easily build compliance logic of any level of complexity for any smart contract.

> **DO NOT USE IN PRODUCTION. \
> This implementation is in early development. It has not been reviewed or audited. It is not suitable to be used in production. Expect bugs!**

You may want to see the subpackages READMEs, but here is a brief digest:
- Policies consist of atomic operations - artifacts (`./contracts`)
- The policy can be created using special low-level notation (`./intermediate-representation`)
- Or using human-oriented high-level syntax (`./compiler`, described `./dsl`)
- The high-level language has standalone interface (`./cli`)
- To evaluate the created policy, you may need to provide some variables (`./variables`)
- There is a codebase used and shared between multiple workspace packages (`./shared`)
- The policy client, which encapsulates most onchain and offchain steps (**creation**, **deployment**, **initialisation**) required to complete before the Policy consumption (`./client`)

## Steps to build, run, test:

* Install [pnpm](https://pnpm.io/installation) version 20 or higher
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