import { IGNORED_NETWORKS } from '../constants';
import { Deployment } from '../types';

const dirNameMatcher = /chain-(\w+)$/; // chain-<any word>
// const dirNameMatcher = /^chain-(\d+)$/; // chain-<any unsigned integer>

const template = (name: string, chainId: string, address: string) => {
  return `artifact ${name}_${chainId} = ${address};`;
};

export const buildExportsLibrary = (deploymentsList: Deployment[]): string => {
  const deploymentsAtCorrectPath = deploymentsList.filter(({ subdirName }) => {
    const chainId = subdirName.match(dirNameMatcher)![1];

    const isNetworkAllowed = !!chainId && !IGNORED_NETWORKS.includes(chainId);
    return isNetworkAllowed;
  });

  const dslDeclarations = deploymentsAtCorrectPath
    .flatMap(({ deploymentData, subdirName }) => {
      // extracting chain id from deployments-path
      const chainId = subdirName.match(dirNameMatcher)![1];

      const artifactsDeclarations: string[] = [];

      for (const [descriptor, address] of Object.entries(deploymentData)) {
        const artifactName = descriptor.match(/#(\w+)$/)![1];
        if (!artifactName)
          throw new Error(`Cannot extract artifact name from ${descriptor}`);

        // note: mock deployment is skipped for a while
        // if (!isNonMockedArtifact(artifactName)) continue;

        artifactsDeclarations.push(template(artifactName, chainId, address));
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
