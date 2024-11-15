import { VariablesPopulator, AllowedVariablesType } from "../src";
import { OnchainVariablesDescription } from "../src/types";

describe("Variables population minimal flow", () => {
    let rawOnchainVariables: OnchainVariablesDescription[];

    before(async () => {

    });

    it("insertion and injection", async () => {
        let attributes: Map<string, AllowedVariablesType> = new Map();

        attributes.set("allowance", 13_000);
        attributes.set("magic_hash", "0xdeadbeef");
        attributes.set("IS_DEC", false);

        const vars = new VariablesPopulator(rawOnchainVariables);

        vars.insert("username", "Admin");
        vars.insert("timestamp_login", 11111111111);
        vars.insert("isAdmin", true);

        await vars.inject(attributes);

        const fullyPopulatedVariables = vars.getVariablesValues();

        console.log(fullyPopulatedVariables);
    });
});