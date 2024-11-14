import { getAddress } from 'ethers';
import {
  ArtifactData,
  GetDescriptors,
  IParamsExtractor,
  Parameter,
  RawArtifactComponents,
  SubstitutingParameter,
} from '../types';
import { TypesNormalizer } from './TypesNormalizer';

// handles the extraction of artifact components (taken from input string taken AS A LINE from intermediate presentation)
// then it retrieves [known-params], [runtime-supplied], or [substituted] values, etc.
export class ParamsExtractor implements IParamsExtractor {
  static build = (
    artifactDeclarationUnprocessed: string,
    descriptors: GetDescriptors,
  ): ParamsExtractor => {
    return new ParamsExtractor(artifactDeclarationUnprocessed, descriptors);
  };

  constructor(
    private artifactDeclarationUnprocessed: string,
    private descriptors: GetDescriptors,
  ) {}

  private get artifact() {
    return this.artifactDeclarationUnprocessed;
  }

  private get retrieveInstanceDescriptors() {
    return this.descriptors;
  }

  artifactData = async (
    artifact: string = this.artifact, // can accept artifact declaration runtime to extract
  ): Promise<ArtifactData> => {
    const {
      addressClause: artifactAddress,
      initClause,
      paramsClause,
    } = this.toComponents(artifact);

    const { execParamsTypes, initParamsTypes } =
      await this.retrieveInstanceDescriptors(artifactAddress);

    // note: all exec params; not splitted yet to [known-params], [runtime-supplied], or [substituted]
    const execParamsList = this.getAllArgumentsWithIndices(paramsClause);

    // note: the ones should be replaced by evaluation-result of linked Artifact
    const execSubstitutionParamsList =
      this.getSubstitutionsWithIndices(execParamsList);

    // note: this actually is constant-values needed runtime and known when artifact is declared but prior to its deployment
    const execKnownParamsList = this.getKnownParamsWithIndices(
      execParamsList,
      execParamsTypes,
    );

    // note: when applied onchain, this facilitates what position provided arguments belong in general exec-params list of graph node
    const execRuntimeVariablesIndices: Array<number> =
      this.getRuntimeVariablesIndices(execParamsList);

    // note: if artifact is statefull, then it may require init-params
    const initDataParams = this.getAllArguments(initClause);
    const initDataParamsSolidityPacked =
      TypesNormalizer.toSolidityEncodedValueFromString(
        initParamsTypes,
        initDataParams,
      );

    return {
      artifactAddress,
      execKnownParamsList,
      execSubstitutionParamsList,
      execRuntimeVariablesIndices,
      needsInitialization: initDataParams.length > 0,
      argsCount: execParamsList.length,
      initDataParamsSolidityPacked,
    };
  };

  // note: raw components from 'this.artifact'
  private toComponents(
    artifact: string = this.artifact,
  ): RawArtifactComponents {
    const artifactMatcher = /\{([^}]+)\}\s*\(([^)]*)\)\s*<([^>]*)>/;
    const matched = artifact.match(artifactMatcher);

    if (!!matched && matched.length === 4) {
      // todo: const [, instanceAddress, execParamsInfo, initDataParams] = match;
      const [, addressClause, paramsClause, initClause] = matched;

      // todo: add more validations
      return {
        addressClause: getAddress(addressClause),
        initClause,
        paramsClause,
      };
    }

    // note: throw error if the format of the supplied string is incorrect
    throw new Error(
      'Artifact intermediate presentation does not match the expected format.',
    );
  }

  // exec-params and init-params from param clause usually taken first from 'this.rawComponents'
  private getAllArguments(clause: string): string[] {
    // note: return empty array if the input is an empty string
    if (clause.trim() === '') {
      return [];
    }

    // note: split the input string by commas and trim each value
    const extractedParams = clause.split(',').map((value) => value.trim());
    return extractedParams;
  }

  private getAllArgumentsWithIndices = (clause: string): Array<Parameter> => {
    const extracted = this.getAllArguments(clause);

    const extractedWithIndex = extracted.map((v, i) => ({
      value: v,
      index: i,
    }));
    return extractedWithIndex;
  };

  private getRuntimeVariables = (
    paramsList: Array<Parameter>,
  ): Array<Parameter> => {
    // filter out parameters that are variables
    const isVariableFilter = (v: string): boolean => {
      const regex = /^var/;
      return regex.test(v);
    };

    const runtimeVariables = paramsList.filter(({ value }) =>
      isVariableFilter(value),
    );

    return runtimeVariables;
  };

  private getRuntimeVariablesIndices = (
    paramsList: Array<Parameter>,
  ): Array<number> => {
    // return runtime-variable indices
    const variableIndices = this.getRuntimeVariables(paramsList).map(
      ({ index }) => index,
    );
    return variableIndices;
  };

  private getSubstitutionsWithIndices = (
    paramsList: Array<Parameter>,
  ): Array<SubstitutingParameter> => {
    // filter out parameters that are substitutions (runtime-supplied parameters)
    const isSubstitutionFilter = (v: string): boolean => {
      return v.startsWith('|', 0) && v.endsWith('|');
    };

    const substitutions = paramsList
      .filter(({ value }) => isSubstitutionFilter(value))
      .map(({ value: filteredValue, index }) => ({
        from: filteredValue.replace(/\|/g, ''), // cleaning up the substitution value
        atPos: index, // return substitutions indices
      }));

    return substitutions;
  };

  private getKnownParamsWithIndices = (
    paramsList: Array<Parameter>,
    argsTypes: string[],
  ): Array<Parameter> => {
    // filter out non-constant values (var or substituion), thereby only constant is found
    const isConstantFilter = (value: string): boolean => {
      const regex = /^(?!var)(?!\|.*\|$).*/;
      return regex.test(value);
    };

    // filters constants and preservs their indeces among other entries in 'parameters-list'
    const knownParamsFiltered: Array<Parameter> = paramsList.filter(
      ({ value }) => isConstantFilter(value),
    );

    if (knownParamsFiltered.length > argsTypes.length) {
      throw new Error(`Extraction error. Provided onchain types list length (${argsTypes.length})
        is less than extracted constants list length (${knownParamsFiltered.length})`);
    }

    const knownParamsWithIndices = knownParamsFiltered.map(
      ({ value: filteredValue, index }) => {
        const encodedConstantWithIndex: Parameter = {
          value: TypesNormalizer.toSolidityEncodedValueFromString(
            [argsTypes[index]],
            [filteredValue],
          ),
          index,
        };
        return encodedConstantWithIndex;
      },
    );

    return knownParamsWithIndices;
  };
}
