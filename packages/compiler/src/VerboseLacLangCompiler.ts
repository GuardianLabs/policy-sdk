import { TranspilerOutput } from '@guardian-network//shared/src/types/dsl.types';
import { LacLangCompilerOptions } from '@guardian-network/shared/src/types/compiler.types';
import { OnchainPresentation } from '@guardian-network/shared/src/types/contracts.types';
import {
  COMPILE_ANNOTATION,
  PropageteWithAnnotationHandler as Handler,
  PARSING_ANNOTATION,
  TRANSPILE_ANNOTATION,
} from './errors';
import { LacLangCompiler } from './LacLangCompiler';
import { validateFinalRepresentation } from './validations.helper';

export class VerboseLacLangCompiler extends LacLangCompiler {
  constructor(
    sources: string,
    readonly options: LacLangCompilerOptions,
    protected readonly _cwd: string,
  ) {
    super(sources, options, _cwd);
  }

  compile = async (): Promise<OnchainPresentation> => {
    return this.compileSourcesWithPropagation();
  };

  protected compileSources = async (): Promise<OnchainPresentation> => {
    const transpilerOutput = await this.transpileDSLWithPropagation();
    const parserOutput =
      await this.parseIntermediateRepresentationWithPropagation(
        transpilerOutput,
      );

    // note: actually is onchain representation
    const finalRepresentation: OnchainPresentation = {
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
    return Handler.execOrPropagate(
      () => this.transpileDSL(this._cwd),
      TRANSPILE_ANNOTATION,
    );
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
