# Policy definition DSL syntax (LacLang)

* Data types:

`bool `:= true | false

`string` := "any  string"

`bytes` := 'bytes  with  0x  prefix'

`address` := address  with  0x  prefix

`number` := any  unsigned  decimal  number  fitting  uint256

* Mutability keywords:

`constant` - declares constant (`constant bytes = '0xdeadbeef';`)

`var` - declares variable (variables must not be initialized!) (`var address proxyAddress;`)
Variables can be **injected** - meaning their value is meant to be replaced with the value of a corresponding attribute on some kind of an interceptor (*e.g. backend*).
Then the `inject("<name_of_the_attribute>")` syntax must be used (`var inject("IS_PRODUCTION") bool mutateState;`)
  

* Other keywords:

`artifact` - declares artifact via it's address literal (no reference yet) (`artifact dayOrNight = 0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5`)

`instance <return  type> * of <artifact> takes ([<constants,  vars,  instances>]) /*OPTIONAL:*/ with ([<constants>]);` - declares instance, that implements artifact (can be literal or artifact reference), that consumes in exec "takes ..." and in init "with ..."

`instance bytes codedImage of imageCoder takes (imageInBmp, resolutionInstanceOutput) with (codec);`

* Statements:

`evaluate <instance  name  that  returns  bool>` - defines the root of the policy = boolean! instance that will return as a policy evaluation result `evaluate finalInstance;`
  
>All constuctions end with semicolon ;
> Pay allention to quotes
>Only boolean artifact can be evaluated
>Only single string comments using //


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