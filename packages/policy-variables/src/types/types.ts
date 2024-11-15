import { PrimitiveEncodeParamTypes } from "../../../policy-contracts/test/utils";

export type AllowedVariablesType = PrimitiveEncodeParamTypes;  // string | number | boolean;

export type VariablesFormattedDescription = {
    nodeId: string,
    variables?: {
        name: string,
        type: string,
        uniqueName: string,
        index: number,
        injection?: string
    }[]
};
export type FilledVariables = {
    nodeId: string,
    values: AllowedVariablesType[]
};