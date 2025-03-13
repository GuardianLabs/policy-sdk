import { deployIgnitionModule } from './helpers';
import { exportAllAtAnyNetwork } from './tools';

const main = async () => {
  await deployIgnitionModule();
  await exportAllAtAnyNetwork();
};

main().catch(console.error);
