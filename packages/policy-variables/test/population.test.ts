import { AllowedVariablesType } from "../src/types";
import { ArtifactNodes__factory } from "../../policy-contracts/src/typechain/factories/contracts/ArtifactNodes__factory";
import { VariablesPopulator } from "../src/population";

async function main() {
    const graph = ArtifactNodes__factory.connect("");
    const varsOutput = await graph.getVariablesList();

    let attributes: Map<string, AllowedVariablesType> = new Map();

    attributes.set("allowance", 13_000);
    attributes.set("magic_hash", "0xdeadbeef");
    attributes.set("IS_DEC", false);

    const vars = new VariablesPopulator(varsOutput);

    vars.insert("username", "Admin");
    vars.insert("timestamp_login", 11111111111);
    vars.insert("isAdmin", true);

    vars.inject(attributes);

    const fullyPopulatedVariables = vars.getVariablesValues();

    console.log(fullyPopulatedVariables);
}