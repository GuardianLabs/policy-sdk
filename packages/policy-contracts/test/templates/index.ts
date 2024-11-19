export const policy = {
  simple: {
    one_artifact: {
      one_variable: {
        one_constant: {
          zero_substitutions: {
            xor: (artifactAddress: string) => `
              constant bool a = false;
              var bool b;
  
              artifact xor = ${artifactAddress};
              instance bool xorOutput of xor takes (a, b);
  
              evaluate xorOutput;
      `,
          },
        },
      },
    },
    two_artifacts: {
      one_variable: {
        one_constant: {
          one_substitution: {
            and: (
              andArtifactAddress: string,
              equalStringArtifactAddress: string,
            ) => `
              var string str;

              artifact and = ${andArtifactAddress};
              artifact equalString = ${equalStringArtifactAddress};

              instance bool stringOutput of equalString takes ("I'm an input", str);
              instance bool andOutput of and takes (true, stringOutput);
  
              evaluate andOutput;
      `,
          },
        },
      },
    },
  },
  complex: {
    injection: {
      dummy: (equalUint: string, equalBytes: string, equalAddress: string, hashString: string, xor: string) => `
      var string username;
      var number timestamp_login;
      var bool isAdmin;

      var inject("allowance") number injection1;
      var inject("magic_hash") bytes injection2;
      var inject("IS_DEV") bool injection3;
      var inject("admin-address") address injection4;

      instance bool eqUint of ${equalUint} takes (timestamp_login, injection1);
      instance bytes hash of ${hashString} takes (username);
      instance bool xor of ${xor} takes (isAdmin, injection3);
      instance bool eqBytes of ${equalBytes} takes (injection2, injection2);
      instance bool eqAddress of ${equalAddress} takes (injection4, injection4);

      evaluate eqAddress;
      `
    }
  }
};
