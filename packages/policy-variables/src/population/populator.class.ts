import { NamedTypedVariablesStructOutput, VariablesStruct } from "../../../policy-contracts/src/typechain/contracts/ArtifactNodes";
import { VariablesInjector } from "../injection";
import { VariablesInserter } from "../insertion";
import { AllowedVariablesType, FilledVariables, IAsyncMapGetter, VariablesFormattedDescription } from "../types";
import { formatOnchainVariables } from "../utils";
import { solidityEncodeSingleParam } from '../../../policy-contracts/test/utils'

export class VariablesPopulator {
    public formattedVariablesConfiguration: VariablesFormattedDescription[] = [];
    private inserter: VariablesInserter;
    private injector: VariablesInjector<AllowedVariablesType>;
    private filledVariables: FilledVariables[];

    constructor(rawVariablesDescription: NamedTypedVariablesStructOutput[]) {
        this.formattedVariablesConfiguration = formatOnchainVariables(rawVariablesDescription);

        this.inserter = new VariablesInserter(this.formattedVariablesConfiguration);
        this.injector = new VariablesInjector(this.formattedVariablesConfiguration);

        this.filledVariables = this.inserter.getFilledVariables();
    }

    public insert(variableUniqueName: string, value: AllowedVariablesType) {
        this.inserter.insert(variableUniqueName, value);

        this.filledVariables = this.inserter.getFilledVariables();
    }

    public async inject(attributes: IAsyncMapGetter<AllowedVariablesType>) {
        this.injector.previouslyFilledVariables = this.filledVariables;

        this.filledVariables = await this.injector.injectValues(attributes);
    }

    public getVariablesValues() {
        return this.filledVariables;
    }

    public getVariablesEncoded(): VariablesStruct[] {
        return this.filledVariables.map(({nodeId, values }) => ({
            nodeId,
            values: values.map(val => solidityEncodeSingleParam(val))
        }));
    }
}