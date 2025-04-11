import {
  ExecVariablesStruct,
  ExecVarsMetadataStruct,
  InitParamsStruct,
  PolicyHandler,
} from '@guardian-network/policy-contracts/src';
import { Signer } from 'ethers';
import { decodeEvaluationResultFromTx } from '../helpers';
import { IPolicyClient } from '../interfaces';

export abstract class AbstractPolicyClient implements IPolicyClient {
  constructor(
    protected adminSigner: Signer,
    protected policyHandler: PolicyHandler,
  ) {}

  protected get signer() {
    return this.adminSigner;
  }

  // note: restricted use, only in child classes
  protected setSigner(adminSigner: Signer): void {
    this.adminSigner = adminSigner;
    this.policyHandler = this.policyHandler.connect(this.signer);
  }

  async initialize(policyConfig: InitParamsStruct): Promise<void> {
    const tx = await this.policyHandler.set(policyConfig);
    await tx.wait();
  }

  async reset(policyConfig: InitParamsStruct): Promise<void> {
    const tx = await this.policyHandler.reset(policyConfig);
    await tx.wait();
  }

  async evaluate(variables: ExecVariablesStruct[]): Promise<boolean> {
    const tx = await this.policyHandler.evaluate(variables);
    await tx.wait();

    const isActionPermitted = await decodeEvaluationResultFromTx(tx);
    return isActionPermitted;
  }

  async evaluateDryRun(variables: ExecVariablesStruct[]): Promise<boolean> {
    const isActionPermitted =
      await this.policyHandler.evaluate.staticCall(variables);

    return isActionPermitted;
  }

  async getVariablesList(): Promise<ExecVarsMetadataStruct[]> {
    const response = await this.policyHandler.getVariablesList.staticCall();

    const result = response.map((item) => ({
      nodeId: item.nodeId,
      nodeIndex: item.nodeIndex,
      artifactAddress: item.artifactAddress,
      descriptions: item.descriptions,
      injections: item.injections,
    }));

    return result;
  }

  async getPolicyAddress(): Promise<string> {
    return this.policyHandler.getAddress();
  }
}
