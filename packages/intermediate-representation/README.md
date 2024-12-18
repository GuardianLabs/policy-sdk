# Policy definition IR translator
Intermediate representation (IR) is needed to create the layer of abstraction between high-level policy constructors and the code that represents the policy onchain.
IR can be perseived as an interface between human-readable code, GUI constructors - all sorts of tools convenient to humans, and object model of a policy that is used only by onchain code.
IR is not ment neither to be written by humans nor to be read or debugged by them. It's an unambigous notation for policy-constructing translator.

The notation consists of an instance definitions, each written in a new line.
The instance definition consists of three clauses, following each other, separated with spaces. Here they are:
1. **Artifact clause** \
Defines an address of the target artifact of an instance. Denoted with curvy braces `{}` with a single value inside.
> `{0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48}`

2. **Execution arguments clause** \
Declares all the needed data, passed to the artifact's `exec` method.
All arguments are enclosed into parenthesis `()` and divided with comma `,`. \
**Constants** are written as is - strings are doublequoted, bytes and addresses must have `0x` prefix. \
**Variables** are listed by names with mandatory prefix `var`. E.g. `var bool myValue` ↦ `varmyValue`.  \
Also, postfix `$"<injection>"` is appended to all variables. If the variable is injected, injection attribute is pasted instead of `<injection>`. \
**Substitutions** are referenced by `nodeId` inside verical bars `||`.

> `(varMyNumber$"", varInjected$"my_attr", 1234, 0xe983fD1798689eee00c0Fb77e79B8f372DF41060, |0x0d68bc8fa0092f4020226d6cf49843553da6de839c908e4220723149ee39a11e|)`

3. **Initialization arguments clause** \
Optional block. Declares all the needed data, passed to the artifact's `init` method. Can be empty or absent. \
All arguments are enclosed into parenthesis `<>` and divided with comma `,`. \
Arguments **must** be constants.
> `<1234, "init_me", true, 0x31621c02470F4e9e71428e209EfC97c07cdc64A3>`

Overall, valid IR looks like this:
```
{0x6768008f6c2Ac94F9D65533D13A974b376495c7b} (1,"lang","here I am") <0,0xdeadbeef,true>
 {0xB60B02062d1256A79C81A061a9277e84ffbB0Ff7} (|0x7ce384eae0aa9f573819ad8aaa6a4eec71d9079f031feee34d51343934131dfe|,0xD9e88d1d18d8Cf3a17e97af9F017Ef8760dee583,varboolVar$"is_dev",0xdeadbeef,|0x7ce384eae0aa9f573819ad8aaa6a4eec71d9079f031feee34d51343934131dfe|,true) <>
{0xB60B02062d1256A79C81A061a9277e84ffbB0Ff7} (|0x7ce384eae0aa9f573819ad8aaa6a4eec71d9079f031feee34d51343934131dfe|,|0x5487fd7ba958bc80cdcaf554b244cb54db0a2def3d506dbbaf0b9d6956f3e825|) <"initialize me",0xd00d,0xB60B02062d1256A79C81A061a9277e84ffbB0Ff7>
{0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97} (|0xcb329f0b2f36e169bcdfee34b756614933b5255d462873e07fe749690e77223a|)
```

The root node is not passed via IR - it is ment to be set by other means as a separate meta-argument.