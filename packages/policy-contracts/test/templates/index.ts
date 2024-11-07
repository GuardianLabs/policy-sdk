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
};
