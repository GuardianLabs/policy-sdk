# Policy definition DSL translator (LacLang)
The DSL is used to define policy structure and translate it to intermediate representation, that will further be translated into actual policy configuration for onchain initialization.
The DSL is high-level markup language without expressions, with imports, declarations and compiler directives.
The syntax is simple yet versatile, so anyone can combine artifacts into policies almost intuitively.

#### Data types
There are 5 data types, which are mapped 1 to 1 with solidity data types.
The bytes can hold any encoded type as a workaround for absent types (like arrays).

`bool `:= true | false (↦ `bool`)

`string` := "any  string" (↦ `string`)

`bytes` := 'bytes  with  0x  prefix' (↦ `bytes`)

`address` := address  with  0x  prefix (↦ `address`)

`number` := any  unsigned  decimal  number  fitting  uint256 (↦ `uint256`)

#### Declarations
Values can be declared as constans and variables. Constants must be initialized right away.

`constant` - declares constant 
> `constant bytes = '0xdeadbeef';`

&nbsp;
`var` - declares variable (variables must not be initialized!) (`var address proxyAddress;`)
Variables can be **injected** - meaning their value is meant to be replaced with the value of a corresponding attribute on some kind of an interceptor (*e.g. backend*).
Then the `inject("<name_of_the_attribute>")` syntax must be used.
> `var inject("IS_PRODUCTION") bool mutateState;`

&nbsp;
`artifact` - declares artifact via its address literal (no reference yet) 
> `artifact dayOrNight = 0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5`

&nbsp;
`instance <return  type> * of <artifact> takes ([<constants,  vars,  instances>]) /*OPTIONAL:*/ with ([<constants>]);` - declares instance, that implements artifact (can be literal or artifact reference), that consumes `takes...` in `exec` and `with...` in `init`.
If no `with` clause used, the instance considered stateless (`init` method will not be dispatched).

> `instance bytes codedImage of imageCoder takes (imageInBmp, resolutionInstanceOutput) with (codec);`

#### Statements:
`import <path>` - prepends `.lac` code found under `<path>` to the current source file. Must be used in the very beginning of the file if used at all.

&nbsp;
`pragma <directive>` - compiler directive. Used right after `import` statement.
Available directives:
- `injected-only`
Forces the compiler to allow only `injected` variables.

&nbsp;
`evaluate <instance  name  that  returns  bool>` - defines the root of the policy = boolean! instance that will return as a policy evaluation result `evaluate finalInstance;`
  
  &nbsp;
**All constuctions end with semicolon ; \
  Pay allention to quotes \
  Only boolean artifact can be evaluated \
  Only single string comments using //**


Valid example:

```
import "./header.lac";
import "./lib.lac";

pragma injected-only;

var inject("is_dev") bool boolVar;
// var bytes spare;

constant number init1 = 0;

artifact art2 = 0xB60B02062d1256A79C81A061a9277e84ffbB0Ff7; // random

instance number inst1 of art1 takes (num1, str1, "here I am") with (init1, bts1, bool1);
instance bool statefulInstance of art2 takes (inst1, addr1, boolVar, bts1, inst1, bool1) with ();
instance string inst3 of art2 takes (inst1, statefulInstance) with ("initialize me", '0xd00d', 0xB60B02062d1256A79C81A061a9277e84ffbB0Ff7);
instance bool statelessInstance of 0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97 takes (inst3);

evaluate statelessInstance;
```