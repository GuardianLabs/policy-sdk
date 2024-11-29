import { InstanceConfig } from './state';

export type TranspilerOutput = {
  ir: string;
  rootNode: string;
  typings: InstanceConfig[];
};
