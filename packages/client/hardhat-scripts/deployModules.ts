import { deployInstances } from './helpers/deploy-all-instances.helper';

const main = async () => {
  await deployInstances();
};

main().catch(console.error);
