import { ParserRuleContext } from 'antlr4ts';

export const formatTranspileErrorLocation = (ctx: ParserRuleContext) =>
  `${ctx.start.line}:${ctx.start.charPositionInLine}-${ctx.stop?.line}:${ctx.stop?.charPositionInLine}`;
