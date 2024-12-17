# CLI for Policy SDK
Policy SDK has a bunch of tools and subsystems. Some of them are exposed as a command line utilites.

------------

## LacLang compiler
The compiler of Lacero Policy Markup language (LacLang).
Can be invoked via `compile` command.
Has options:
* `-p` or `--sourcePath` \
Defines path to LacLang (`.lac`) sources. __Mandatory option__.

* `-w` or ` --write` \
Defines path to output file (`.json`). Otherwise the result will be printed to *stdout*.

* `--type-onchain` \
Checks typings against onchain declarations. Works only if `--rpc` provided or `$RPC` env variable set.

* `--type-dsl` \
Checks typings against onchain declarations. Works only if `--rpc` provided or `$RPC` environment variable set.

* `--rpc` \
Defines `JSON-RPC URL` of the provider to the target blockchain. 
Can be substituted with `$RPC` environment variable.

Usage example:

As a project:
> pnpm cli compile --sourcePath ./dsl-sources-sample/DummyValid.lac

As a package:
> npx @guardian-network/policy-cli compile --sourcePath ./dsl-sources-sample/DummyValid.lac