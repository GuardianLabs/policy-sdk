import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { IgnitionModuleType } from '../../types';

const MODULE_ID = 'PolicyFactory';

const policyFactoryModule: IgnitionModuleType = buildModule(MODULE_ID, (m) => {
  const policyFactory = m.contract('PolicyFactory');

  return { policyFactory };
});

export default policyFactoryModule;
