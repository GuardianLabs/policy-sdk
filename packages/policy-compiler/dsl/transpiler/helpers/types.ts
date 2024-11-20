export type MinTypedValue = {
  type: string;
  value: string;
};

export type TypedValue = MinTypedValue & {
  substitution?: boolean;
  constant?: boolean;
};
