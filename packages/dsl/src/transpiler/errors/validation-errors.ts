import { BaseError } from '@guardian-network/shared/src/errors';
import { ParserRuleContext } from 'antlr4ts';
import { formatTranspileErrorLocation as formatLocation } from './helpers';

export class ConstantIsAlreadyDefinedError extends BaseError {
  static create = (
    name: string,
    selfContext: ParserRuleContext,
    collisionContext: ParserRuleContext,
  ) => {
    const errorMessage = `Constant ${name} declared on ${formatLocation(selfContext)} was already defined on ${formatLocation(collisionContext)}`;
    return this.build(errorMessage);
  };
}

export class VariableAlreadyDefinedError extends BaseError {
  static create = (
    name: string,
    selfContext: ParserRuleContext,
    collisionContext: ParserRuleContext,
  ) => {
    const errorMessage = `Variable ${name} declared on ${formatLocation(selfContext)} was already defined on ${formatLocation(collisionContext)}`;
    return this.build(errorMessage);
  };
}

export class ArtifactAlreadyDefinedError extends BaseError {
  static create = (
    name: string,
    selfContext: ParserRuleContext,
    collisionContext: ParserRuleContext,
  ) => {
    const errorMessage = `Artifact ${name} declared on ${formatLocation(selfContext)} was already defined on ${formatLocation(collisionContext)}`;
    return this.build(errorMessage);
  };
}

export class InstanceAlreadyDefinedError extends BaseError {
  static create = (
    name: string,
    selfContext: ParserRuleContext,
    collisionContext: ParserRuleContext,
  ) => {
    const errorMessage = `Instance ${name} declared on ${formatLocation(selfContext)} was already defined on ${formatLocation(collisionContext)}`;
    return this.build(errorMessage);
  };
}

export class EvaluateAlreadyDeclaredError extends BaseError {
  static create = (
    selfContext: ParserRuleContext,
    collisionContext: ParserRuleContext,
  ) => {
    const errorMessage = `Evaluate statement can only be declared once, but was declared on ${formatLocation(selfContext)} being already defined on ${formatLocation(collisionContext)}`;
    return this.build(errorMessage);
  };
}

export class ArtifactNotDefinedError extends BaseError {
  static create = (name: string, selfContext: ParserRuleContext) => {
    const errorMessage = `Artifact ${name} (referenced ${formatLocation(selfContext)}) was not found in the scope`;
    return this.build(errorMessage);
  };
}

export class VariableNotDefinedError extends BaseError {
  static create = (name: string, selfContext: ParserRuleContext) => {
    const errorMessage = `Variable ${name} (referenced ${formatLocation(selfContext)}) was not found in the scope`;
    return this.build(errorMessage);
  };
}

export class ConstantNotDefinedError extends BaseError {
  static create = (name: string, selfContext: ParserRuleContext) => {
    const errorMessage = `Constant ${name} (referenced ${formatLocation(selfContext)}) was not found in the scope`;
    return this.build(errorMessage);
  };
}

export class InstanceNotDefinedError extends BaseError {
  static create = (name: string, selfContext: ParserRuleContext) => {
    const errorMessage = `Instance ${name} (referenced ${formatLocation(selfContext)}) was not found in the scope`;
    return this.build(errorMessage);
  };
}

export class ImpropperInitArgsMutabilityError extends BaseError {
  static create = (name: string, selfContext: ParserRuleContext) => {
    const errorMessage = `Variable ${name} (referenced ${formatLocation(selfContext)}) must be constant to be an initialization argument`;
    return this.build(errorMessage);
  };
}

export class EvaluateTypeNotBoolError extends BaseError {
  static create = (
    name: string,
    selfContext: ParserRuleContext,
    referenceContext: ParserRuleContext,
  ) => {
    const errorMessage = `Type of ${name} instance return value (defined ${formatLocation(referenceContext)}) (referenced ${formatLocation(selfContext)}) must be boolean to be used as a root`;
    return this.build(errorMessage);
  };
}

export class NoEvaluateStatementError extends BaseError {
  static create = () => {
    const errorMessage = `The program must include evaluate statement to define graph root node`;
    return this.build(errorMessage);
  };
}

export class CyclicReferenceDSLError extends BaseError {
  static create = (
    selfName: string,
    referenceName: string,
    selfContext: ParserRuleContext,
    referenceContext: ParserRuleContext,
  ) => {
    const errorMessage = `Instance ${selfName} (defined ${formatLocation(selfContext)}) is referenced in instance ${referenceName} (defined ${formatLocation(referenceContext)}) in a cyclic manner`;
    return this.build(errorMessage);
  };
}

export class SelfReferenceDSLError extends BaseError {
  static create = (name: string, selfContext: ParserRuleContext) => {
    const errorMessage = `Instance ${name} (defined ${formatLocation(selfContext)}) is referenced in its own arguments`;
    return this.build(errorMessage);
  };
}

export class CannotInferValueTypeError extends BaseError {
  static create = (value: string, selfContext: ParserRuleContext) => {
    const errorMessage = `Can not infer type of a literal value ${value} (encountered ${formatLocation(selfContext)})`;
    return this.build(errorMessage);
  };
}
