import { DEFAULT_LOCAL_NETWORK_ID } from '../../config-hardhat/default-forking-params.contants';

export const DEPLOYMENTS_PATH = 'ignition/deployments';
export const DEPLOYMENT_FILE_NAME = 'deployed_addresses.json';

export const EXPORTED_PATH = 'predefined-artifacts-exports';
export const EXPORT_FILE_NAME = 'BaseLibrary.lac';
export const EXPORTED_FULL_PATH = `${EXPORTED_PATH}/${EXPORT_FILE_NAME}`;

export const IGNORED_NETWORKS = [DEFAULT_LOCAL_NETWORK_ID];
