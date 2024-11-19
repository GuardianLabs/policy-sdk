import {
  Artifacts,
  Constants,
  Evaluate,
  Instances,
  InstancesById,
  Variables,
} from './types';

export class LatentState {
  public constants: Constants = new Map();

  public variables: Variables = new Map();

  public artifacts: Artifacts = new Map();

  public instances: Instances = new Map();

  public instancesById: InstancesById = new Map();

  public evaluateRelativeTo?: Evaluate;
}
