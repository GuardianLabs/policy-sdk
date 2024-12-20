export const artifactContractMatcher = /\bis\s+\w+ArtifactBase\b/;
export const mockedNameMatcher = /Mock/; // /i? only postfix?

export const isArtifactDefinition = (content: string) =>
  artifactContractMatcher.test(content);
export const isNonMockedArtifact = (content: string) =>
  !mockedNameMatcher.test(content);
