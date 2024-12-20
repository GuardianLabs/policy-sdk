import { Deployment, isNonMockedArtifact } from '../helpers';

const artifactTemplate = (title: string, address: string) =>
  `artifact ${title} = ${address};`;

export const buildArtifactsLibrary = (deployments: Deployment[]) => {
  return deployments
    .flatMap((deployment) => {
      const chainId = deployment.subdirName.match(/-(\w+)$/)![1];
      if (!chainId)
        throw new Error(`Cannot extract chainId from ${deployment.subdirName}`);

      const artifactDeclarations: string[] = [];

      for (const [deploymentDescriptor, deploymentAddress] of Object.entries(
        deployment.deploymentData,
      )) {
        const artifactName = deploymentDescriptor.match(/#(\w+)$/)![1];
        if (!artifactName)
          throw new Error(
            `Cannot extract artifact name from ${deploymentDescriptor}`,
          );
        if (!isNonMockedArtifact(artifactName)) continue;

        artifactDeclarations.push(
          artifactTemplate(`${artifactName}_${chainId}`, deploymentAddress),
        );
      }

      return artifactDeclarations;
    })
    .join('\r\n');
};
