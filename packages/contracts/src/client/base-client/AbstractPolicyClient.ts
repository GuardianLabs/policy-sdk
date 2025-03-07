import { Signer } from 'ethers';
import { GraphInitParamsStruct, PolicyHandler, VariablesStruct } from '../..';
import { NamedTypedVariablesStruct } from '../../typechain/contracts/PolicyHandler';
import { IPolicyClient } from '../interfaces';
import { decodeEvaluationResultFromTx } from '../policy-utils.helper';

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

  async initialize(policyConfig: GraphInitParamsStruct): Promise<void> {
    const tx = await this.policyHandler.set(policyConfig);
    await tx.wait();
  }

  async reset(policyConfig: GraphInitParamsStruct): Promise<void> {
    const tx = await this.policyHandler.reset(policyConfig);
    await tx.wait();
  }

  async evaluate(variables: VariablesStruct[]): Promise<boolean> {
    const tx = await this.policyHandler.evaluate(variables);
    await tx.wait();

    const isActionPermitted = await decodeEvaluationResultFromTx(tx);
    return isActionPermitted;
  }

  async evaluateDryRun(variables: VariablesStruct[]): Promise<boolean> {
    const isActionPermitted =
      await this.policyHandler.evaluate.staticCall(variables);

    return isActionPermitted;
  }

  async getVariablesList(): Promise<NamedTypedVariablesStruct[]> {
    const response = await this.policyHandler.getVariablesList.staticCall();

    return response.map((item) => ({
      nodeId: item.nodeId,
      nodeIndex: item.nodeIndex,
      artifactAddress: item.artifactAddress,
      variables: item.variables,
      injections: item.injections,
    }));
  }

  async getPolicyAddress(): Promise<string> {
    return this.policyHandler.getAddress();
  }
}
