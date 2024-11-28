import { ParserRuleContext } from 'antlr4ts';

export class ConstantAlreadyDefinedError extends Error {
  constructor(
    name: string,
    selfContext: ParserRuleContext,
    collisionContext: ParserRuleContext,
  ) {
    const msg = `Constant ${name} declared on ${formatLocation(selfContext)} was already defined on ${formatLocation(collisionContext)}`;

    super(msg);
  }
}

export class VariableAlreadyDefinedError extends Error {
  constructor(
    name: string,
    selfContext: ParserRuleContext,
    collisionContext: ParserRuleContext,
  ) {
    const msg = `Variable ${name} declared on ${formatLocation(selfContext)} was already defined on ${formatLocation(collisionContext)}`;

    super(msg);
  }
}

export class ArtifactAlreadyDefinedError extends Error {
  constructor(
    name: string,
    selfContext: ParserRuleContext,
    collisionContext: ParserRuleContext,
  ) {
    const msg = `Artifact ${name} declared on ${formatLocation(selfContext)} was already defined on ${formatLocation(collisionContext)}`;

    super(msg);
  }
}

export class InstanceAlreadyDefinedError extends Error {
  constructor(
    name: string,
    selfContext: ParserRuleContext,
    collisionContext: ParserRuleContext,
  ) {
    const msg = `Instance ${name} declared on ${formatLocation(selfContext)} was already defined on ${formatLocation(collisionContext)}`;

    super(msg);
  }
}

export class EvaluateAlreadyDeclaredError extends Error {
  constructor(
    selfContext: ParserRuleContext,
    collisionContext: ParserRuleContext,
  ) {
    const msg = `Evaluate statement can only be declared once, but was declared on ${formatLocation(selfContext)} being already defined on ${formatLocation(collisionContext)}`;

    super(msg);
  }
}

export class ArtifactNotDefinedError extends Error {
  constructor(name: string, selfContext: ParserRuleContext) {
    const msg = `Artifact ${name} (referenced ${formatLocation(selfContext)}) was not found in the scope`;

    super(msg);
  }
}

export class VariableNotDefinedError extends Error {
  constructor(name: string, selfContext: ParserRuleContext) {
    const msg = `Variable ${name} (referenced ${formatLocation(selfContext)}) was not found in the scope`;

    super(msg);
  }
}

export class ConstantNotDefinedError extends Error {
  constructor(name: string, selfContext: ParserRuleContext) {
    const msg = `Constant ${name} (referenced ${formatLocation(selfContext)}) was not found in the scope`;

    super(msg);
  }
}

export class InstanceNotDefinedError extends Error {
  constructor(name: string, selfContext: ParserRuleContext) {
    const msg = `Instance ${name} (referenced ${formatLocation(selfContext)}) was not found in the scope`;

    super(msg);
  }
}

export class InitializationArgumentWrongMutabilityModeError extends Error {
  constructor(name: string, selfContext: ParserRuleContext) {
    const msg = `Variable ${name} (referenced ${formatLocation(selfContext)}) must be constant to be an initialization argument`;

    super(msg);
  }
}

export class EvaluateTypeNotBoolError extends Error {
  constructor(
    name: string,
    selfContext: ParserRuleContext,
    referenceContext: ParserRuleContext,
  ) {
    const msg = `Type of ${name} instance return value (defined ${formatLocation(referenceContext)}) (referenced ${formatLocation(selfContext)}) must be boolean to be used as a root`;

    super(msg);
  }
}

export class NoEvaluateStatementError extends Error {
  constructor() {
    const msg = `The program must include evaluate statement to define graph root node`;

    super(msg);
  }
}

export class SelfReferenceError extends Error {
  constructor(name: string, selfContext: ParserRuleContext) {
    const msg = `Instance ${name} (defined ${formatLocation(selfContext)}) is referenced in its own arguments`;

    super(msg);
  }
}

export class CyclicReferenceError extends Error {
  constructor(
    selfName: string,
    referenceName: string,
    selfContext: ParserRuleContext,
    referenceContext: ParserRuleContext,
  ) {
    const msg = `Instance ${selfName} (defined ${formatLocation(selfContext)}) is referenced in instance ${referenceName} (defined ${formatLocation(referenceContext)}) in a cyclic manner`;

    super(msg);
  }
}

export class CannotInferValueTypeError extends Error {
  constructor(value: string, selfContext: ParserRuleContext) {
    const msg = `Can not infer type of a literal value ${value} (encountered ${formatLocation(selfContext)})`;

    super(msg);
  }
}

const formatLocation = (ctx: ParserRuleContext) =>
  `${ctx.start.line}:${ctx.start.charPositionInLine}-${ctx.stop?.line}:${ctx.stop?.charPositionInLine}`;
