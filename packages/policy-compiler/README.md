# Artifacts DSL repo

Data types:

bool := true | false
string := "<any string>"
bytes := '<bytes with 0x prefix>'
address := <address with 0x prefix>
number := <any unsigned decimal number fitting uint256>

Mutability keywords:

constant - declares constant (`constant bytes = '0xdeadbeef';`)
var - declares variable (variables must not be initialized!) (`var address proxyAddress;`)

Other keywords:

artifact - declares artifact via it's address literal (no reference yet) (`artifact dayOrNight = 0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5`)
instance <return type> * of <artifact> takes ([<constants, vars, instances>]) /*OPTIONAL:*/ with ([<constants>]); - declares instance, that implements artifact (can be literal or artifact reference), that consumes in exec "takes ..." and in init "with ..."
`instance bytes codedImage of imageCoder takes (imageInBmp, resolutionInstanceOutput) with (codec);`

Statements:

evaluate <instance name that returns bool> - defines the root of the policy = boolean! instance that will return as a policy evaluation result `evaluate finalInstance;`


All constuctions end with semicolon ;
Pay allention to quotes
Only boolean artifact can be evaluated
Only single string comments using //

Valid example:

```
var bool boolVar;

constant number init1 = 0;
constant bool bool1 = true; 
constant number num1 = 1;
constant address addr1 = 0xD9e88d1d18d8Cf3a17e97af9F017Ef8760dee583; // random
constant string str1 = "lang";
constant bytes bts1 = '0xdeadbeef';

artifact art1 = 0x6768008f6c2Ac94F9D65533D13A974b376495c7b; // random
artifact art2 = 0xB60B02062d1256A79C81A061a9277e84ffbB0Ff7; // random

instance number inst1 of art1 takes (num1, str1, "here I am") with (init1, bts1, bool1);
instance bool inst2 of art2 takes (inst1, addr1, boolVar, bts1, inst1, bool1);
instance bool inst3 of art2 takes (inst1, inst2) with ("initialize me", '0xd00d', 0xB60B02062d1256A79C81A061a9277e84ffbB0Ff7);


evaluate inst2;
```