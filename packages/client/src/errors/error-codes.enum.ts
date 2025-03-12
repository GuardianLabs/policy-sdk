export enum Flow {
  INITIALIZE = 'F-001', //'initialization',
  RESET_POLICY = 'F-002', //'reset policy',
  EVALUATE = 'F-003', //'evaluation',
  EVALUATE_DRY_RUN = 'F-004', //'evaluation-dry-run',
}

export enum BuildExisting {
  FROM_POLICY = 'EP-001', // 'build from policy',
  FROM_POLICY_WITH_CONFIG = 'EP-002', //'build from policy with config',
}

export enum BuildNew {
  FROM_EMPTY_POLICY = 'EPC-001', //'build from empty policy',
  FROM_EMPTY_POLICY_WITH_CONFIG = 'EPC-002', //'build from empty policy with config',
}
