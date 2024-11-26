import { GraphInitParamsStruct } from '../../../policy-contracts/src/typechain/contracts/ArtifactsGraph';
import { TranspilerOutput } from '../../dsl';
import {
  COMPILE_ANNOTATION,
  PropageteWithAnnotationHandler as Handler,
  PARSING_ANNOTATION,
  TRANSPILE_ANNOTATION,
} from './errors';
import { LacLangCompiler } from './LacLangCompiler';
import { CompilerOptions as LacLangCompilerOptions } from './types';
import { validateFinalRepresentation } from './validations.helper';

export class VerboseLacLangCompiler extends LacLangCompiler {
  constructor(
    sources: string,
    readonly options: LacLangCompilerOptions,
  ) {
    super(sources, options);
  }

  compile = async (): Promise<GraphInitParamsStruct> => {
    return this.compileSourcesWithPropagation();
  };

  compileSources = async (): Promise<GraphInitParamsStruct> => {
    const transpilerOutput = await this.transpileDSLWithPropagation();
    const parserOutput =
      await this.parseIntermediateRepresentationWithPropagation(
        transpilerOutput,
      );

    // note: actually is onchain representation
    const finalRepresentation: GraphInitParamsStruct = {
      rootNode: transpilerOutput.rootNode,
      nodes: parserOutput,
    };

    validateFinalRepresentation(finalRepresentation);
    return finalRepresentation;
  };

  private compileSourcesWithPropagation = async () => {
    return Handler.execOrPropagate(this.compileSources, COMPILE_ANNOTATION);
  };

  private transpileDSLWithPropagation = async () => {
    return Handler.execOrPropagate(this.transpileDSL, TRANSPILE_ANNOTATION);
  };

  private parseIntermediateRepresentationWithPropagation = async (
    transpilerOutput: TranspilerOutput,
  ) => {
    return Handler.execOrPropagate(
      () => this.parseIntermediateRepresentation(transpilerOutput),
      PARSING_ANNOTATION,
    );
  };
}
