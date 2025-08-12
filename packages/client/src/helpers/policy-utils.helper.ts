import { PolicyHandler__factory } from '@guardian-network/policy-contracts';
import { Signer } from 'ethers';

// APPLY
// export const deployGraph = async (
//   deployAndAdminSigner: Signer,
// ): Promise<PolicyHandler> => {
//   return StaticPolicyDeployer.deploy(
//     deployAndAdminSigner,
//     await deployAndAdminSigner.getAddress(),
//   );
// };

// // prev
// export const deployGraph11 = async (
//   deployAndAdminSigner: Signer,
// ): Promise<PolicyHandler> => {
//   const deployer = new PolicyHandler__factory(deployAndAdminSigner);

//   const gateway = await deployer.deploy(
//     await deployAndAdminSigner.getAddress(),
//   );
//   await gateway.waitForDeployment();

//   return gateway as PolicyHandler;
// };

// //  apply
// export const deployAndInitGraph = async (
//   deployAndAdminSigner: Signer,
//   params: GraphInitParamsStruct,
// ): Promise<PolicyHandler> => {
//   return StaticPolicyDeployer.deployAndConfigure(
//     deployAndAdminSigner,
//     await deployAndAdminSigner.getAddress(),
//     params,
//   );
// };

export const connectGraph = (
  instanceAddress: string,
  instanceAdminSigner: Signer,
) => {
  return PolicyHandler__factory.connect(instanceAddress, instanceAdminSigner);
};
