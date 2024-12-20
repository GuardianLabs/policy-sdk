export const extractContractName = (input: string): string | null => {
  const artifactContractNameMatcher =
    /contract\s+(\w+)\s+is\b.*?ArtifactBase\b/;
  const match = input.match(artifactContractNameMatcher);
  return match ? match[1] : null;
};

export const toCamelCase = (input: string): string => {
  return /^[A-Z]+$/.test(input)
    ? input.toLowerCase()
    : input
        .trim()
        .replace(/(?:^|[-_\s]+)(\w)/g, (_, char) => char.toUpperCase())
        .replace(/^./, (firstChar) => firstChar.toLowerCase());
};
