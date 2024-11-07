export const policy = {
  simple: {
    one_artifact: {
      one_variable: {
        one_constant: {
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
};
