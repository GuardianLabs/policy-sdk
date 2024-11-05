import { InstanceDeclarationContext, LiteralContext } from '../../antlr';
import {
  ArtifactNotDefinedError,
  CannotInferValueTypeError,
  ConstantNotDefinedError,
  InitializationArgumentWrongMutabilityModeError,
  lookupOrThrow,
  VariableNotDefinedError,
} from '../errors';
import { Artifacts, InstanceConfig, LatentState } from '../state';

export type TypedValue = {
  type: string;
  value: string;
  substitution?: boolean;
  constant?: boolean;
};

export const extractAndLookupExecArguments = (
  ctx: InstanceDeclarationContext,
  latentState: LatentState,
): TypedValue[] => {
  if (!ctx.argumentsList()) return [];

  return ctx
    .argumentsList()!
    .identifier_or_literal()
    .map((el) => {
      if (el.literal()) {
        return inferTypedValue(el.literal()!);
      }

      const name = el.text;
      const refConst = latentState.constants.get(name);

      if (!refConst) {
        const refVar = latentState.variables.get(name);
        if (!refVar) {
          const refInst = lookupOrThrow(
            name,
            latentState.instances,
            new VariableNotDefinedError(name, el.ruleContext),
          );

          return {
            value: formatInstanceReference(refInst.id),
            type: refInst.type,
            substitution: true,
          };
        } else
          return {
            value: 'var' + name,
            type: refVar.type,
          };
      } else {
        if (refConst.type == 'bytes') {
          return {
            value: formatBytesLiteral(refConst.value),
            type: refConst.type,
            constant: true,
          };
        } else
          return {
            value: refConst.value,
            type: refConst.type,
            constant: true,
          };
      }
    });
};

export const extractAndLookupInitArguments = (
  ctx: InstanceDeclarationContext,
  latentState: LatentState,
): TypedValue[] => {
  if (!ctx.constantsList()) return [];
  return ctx
    .constantsList()!
    .argumentsList()
    .identifier_or_literal()
    .map((el) => {
      if (el.literal()) {
        return inferTypedValue(el.literal()!);
      }

      const name = el.text;
      const refConst = latentState.constants.get(name);

      if (refConst) {
        if (refConst.type == 'bytes') {
          return {
            value: formatBytesLiteral(refConst.value),
            type: refConst.type,
          };
        } else
          return {
            value: refConst.value,
            type: refConst.type,
          };
      } else {
        lookupOrThrow(
          name,
          latentState.variables,
          new ConstantNotDefinedError(name, el.ruleContext),
        );

        throw new InitializationArgumentWrongMutabilityModeError(
          name,
          el.ruleContext,
        );
      }
    });
};

export const extractReferenceNodeIds = (config: InstanceConfig) =>
  config.execArguments
    .filter((arg) => arg.substitution)
    .map((arg) => arg.value.replaceAll('|', ''));
export const mapToArray = (map: Map<string, any>) => Array.from(map.values());

export const dereferenceArtifact = (
  ctx: InstanceDeclarationContext,
  artifactsMap: Artifacts,
) => {
  let artifactDereferenced: string;

  if (ctx.identifier_or_literal().literal()) {
    artifactDereferenced = ctx.identifier_or_literal().literal()!.text;
  } else {
    const artifactName = ctx.identifier_or_literal().IDENTIFIER()!.text;
    const refArtifact = lookupOrThrow(
      artifactName,
      artifactsMap,
      new ArtifactNotDefinedError(artifactName, ctx),
    );

    artifactDereferenced = refArtifact.address;
  }

  return artifactDereferenced;
};

const inferTypedValue = (ctx: LiteralContext): TypedValue => {
  let type: string;
  let value = ctx.text;

  switch (true) {
    case !!ctx.ADDRESS_LITERAL():
      type = 'address';
      break;
    case !!ctx.BOOL_LITERAL():
      type = 'bool';
      break;
    case !!ctx.STRING_LITERAL():
      type = 'string';
      break;
    case !!ctx.BYTES_LITERAL():
      type = 'bytes';
      value = formatBytesLiteral(value);
      break;
    case !!ctx.NUMBER_LITERAL():
      type = 'number';
      break;
    default:
      throw new CannotInferValueTypeError(ctx.text, ctx);
  }

  return {
    type,
    value,
  };
};

const formatBytesLiteral = (value: string) => value.replace(/^'|'$/g, '');
export const formatInstanceReference = (nodeId: string) => `|${nodeId}|`;
