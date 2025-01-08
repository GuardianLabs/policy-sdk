import { Deployment } from '../types';

const template = (name: string, chainId: string, address: string) => {
  return `artifact ${name}_${chainId} = ${address};`;
};

export const buildExportsLibrary = (deploymentsList: Deployment[]): string => {
  const dslDeclarations = deploymentsList
    .flatMap((deployment) => {
      // exctracting chain id from path
      const chainId = deployment.subdirName.match(/-(\w+)$/)![1];

      if (!chainId)
        throw new Error(`Cannot extract chainId from ${deployment.subdirName}`);

      const artifactsDeclarations: string[] = [];

      for (const [deploymentDescriptor, deploymentAddress] of Object.entries(
        deployment.deploymentData,
      )) {
        const artifactName = deploymentDescriptor.match(/#(\w+)$/)![1];
        if (!artifactName)
          throw new Error(
            `Cannot extract artifact name from ${deploymentDescriptor}`,
          );

        // note: mock deployment is skipped for a while
        // if (!isNonMockedArtifact(artifactName)) continue;

        artifactsDeclarations.push(
          template(artifactName, chainId, deploymentAddress),
        );
      }

      return artifactsDeclarations;
    })
    .join('\r\n');

  return dslDeclarations;
};

/* export const isNonMockedArtifact = (content: string) => {
  const mockedContractMatcher = /Mock/; // /i? only postfix?;

  return !mockedContractMatcher.test(content);
}; */
