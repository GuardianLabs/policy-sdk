export const mapToArray = <T>(map: Map<string, T>) => {
  return Array.from(map.values());
};
