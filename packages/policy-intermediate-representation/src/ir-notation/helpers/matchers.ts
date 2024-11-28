export const strIsVar = (str: string): boolean => {
  return /^var/.test(str);
};
export const strIsSubst = (str: string): boolean => {
  return str[0] == '|' && str[str.length - 1] == '|';
};

export const isConstant = (arg: string): boolean => {
  const regex = /^(?!var)(?!\|.*\|$).*/;

  return regex.test(arg);
};
