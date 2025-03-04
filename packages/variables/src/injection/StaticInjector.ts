import {
  AllowedVariablesType,
  IAsyncMapGetter,
  NodeVariablesConfig,
  SuppliedVariables,
} from '../types';
import { validateVarValueTypeWithErr } from '../utils';

// note: inject variables values
export class StaticInjector {
  static inject = async <T extends AllowedVariablesType>(
    varsConfig: NodeVariablesConfig[],
    knownVariables: SuppliedVariables[],
    attributesSource: IAsyncMapGetter<T>,
  ): Promise<Array<SuppliedVariables>> => {
    const knownVariablesClone = structuredClone(knownVariables);

    for (let mayBeSuppliedVariable of knownVariablesClone) {
      // why var-config is unaware of supplied-var-node-id???
      const variableConfig = varsConfig.find(
        (v) => v.nodeId == mayBeSuppliedVariable.nodeId,
      );

      // note: only for known config with variables.lengt > 0
      if (!variableConfig || variableConfig.variables.length === 0) {
        continue;
      }

      for (let [index, varDescription] of variableConfig.variables.entries()) {
        // note: skipping when not injectable variable
        if (!varDescription.injection) {
          continue;
        }

        // note: look up attributes to fill injected variable
        const attribute = await attributesSource.get(varDescription.injection);
        // const defaultValue = mayBeSuppliedVariable.values[index];
        const expectedType = varDescription.type;

        if (attribute !== undefined) {
          validateVarValueTypeWithErr(attribute, expectedType);
          mayBeSuppliedVariable.values[index] = attribute;

          // note: ??redundancy. this is validated while insert
        }
        // note: Redundancy? this is validated in VariablesPopulator.validateAllFilled()
        //  else
        //   throw ErrorFactory.cannotLookupVariableValue(
        //     varDescription.uniqueName,
        //     varDescription.injection,
        //   );
      }
    }

    return knownVariablesClone;
  };
}
