import { ArtifactNodes__factory } from "../../../policy-contracts/src/typechain"
import { NamedTypedVariablesStructOutput } from "../../../policy-contracts/src/typechain/contracts/ArtifactNodes";

type AllowedType = string | number | boolean;

type Formatted = {
    nodeId: string,
    variables?: {
        name: string,
        type: string,
        uniqueName: string,
        index: number,
        injection?: string
    }[]
};
type Filled = {
    nodeId: string,
    values: AllowedType[]
};

interface IAsyncMap<ValueType> {
    get(key: string): Promise<ValueType> | ValueType | undefined
}

class VariablesInserter implements IAsyncMap<AllowedType> {
    private nameToNodeId: Map<string, string> = new Map();
    private nameToIndex: Map<string, number> = new Map();
    private vals: Map<string, {
        index: number,
        value: AllowedType
    }[]> = new Map();

    constructor(private readonly config: Formatted[]) {
        for(const node of config) {
            if(node.variables) {
                for(const variable of node.variables) {
                    this.nameToNodeId.set(variable.uniqueName, node.nodeId);
                    this.nameToIndex.set(variable.uniqueName, variable.index);
                }
            }
        }
    }

    public set(key: string, value: AllowedType) {
        const targetNode = this.nameToNodeId.get(key);
        if(!targetNode) throw new Error();

        this.vals.get(targetNode)?.push({
            index: this.nameToIndex.get(key)!,
            value
        });
    }

    public get(key: string): AllowedType | undefined {
        const nodeId = this.nameToNodeId.get(key)!;
        return this.vals.get(nodeId)!.find(el => el.index == this.nameToIndex.get(key))?.value;
    }

    public getFilled(): Filled[] {
        let varsValues: Filled[] = [];

        for(let [key, valueArr] of this.vals) {
            let nodeDef: Filled = {} as Filled;
            nodeDef.nodeId = key;

            const arr = new Array<AllowedType>(valueArr.length);
            for(let val of valueArr) {
                arr[val.index] = val.value;
            }

            nodeDef.values = arr;
        }

        return varsValues;
    }
}

async function main() {
    const graph = ArtifactNodes__factory.connect("");
    const varsOutput = await graph.getVariablesList();

    let attributes: Map<string, AllowedType> = new Map();

    attributes.set("allowance", 13_000);
    attributes.set("magic_hash", "0xdeadbeef");
    attributes.set("IS_DEC", false);

    const formattedVariables = formatVars(varsOutput);

    const inserter= new VariablesInserter(formattedVariables);

    inserter.set("username", "Admin");
    inserter.set("timestamp_login", 11111111111);
    inserter.set("isAdmin", true);

    let varsValues: Filled[] = inserter.getFilled();

    fillAttributesOnPlace(formattedVariables, varsValues, attributes);
    
}

const fillAttributesOnPlace = async (formattedVarsConfiguration: Formatted[], /*out*/ clientFilledValues: Filled[], attributes: IAsyncMap<AllowedType>) => {
    for(let vars of clientFilledValues) {
        const def = formattedVarsConfiguration.find(el => el.nodeId == vars.nodeId);

        if(def && def.variables) {
            for(let [index, varDef] of def.variables.entries()) {
                if(varDef.injection) {
                    const attribute = await attributes.get(varDef.injection);
                    const defaultValue = vars.values[index]
                    
                    if(attribute) {
                        vars.values[index] = attribute;
                    } else if(defaultValue) {
                        vars.values[index] = defaultValue;
                    } else throw new Error();
                }
            }
        }
    }
}

const formatVars = (vars: NamedTypedVariablesStructOutput[]) => {
    let namedVars: Formatted[] = [];

    for(let node of vars) {
        namedVars.push({nodeId: node.nodeId});
        for(const [index, variable] of node.variables.entries()) {
            namedVars[namedVars.length - 1].variables?.push({
                name: variable.name,
                type: variable.typename,
                uniqueName: `${variable.name}_${variable.typename}_${node.artifactAddress}_${node.nodeIndex}`,
                index
            })
        }

        for(const injection of node.injections) {
            const varToInject = namedVars[namedVars.length - 1].variables?.find(el => el.index == Number(injection.index));
            if(varToInject) {
                varToInject.injection = injection.value;
            } else throw new Error();
        }
    }

    return namedVars;
}