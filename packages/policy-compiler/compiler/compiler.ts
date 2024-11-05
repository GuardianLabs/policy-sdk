import { Provider } from "ethers";
import { Transpiler, TranspilerOutput } from "../dsl";
import { parseIR, parseIRWithInterceptor, ParsingResult } from "../ir";
import { GraphInitParamsStruct } from "../../policy-contracts/src/typechain/contracts/ArtifactsGraph";
import path from 'path';
import { promises as fs } from 'fs';
import { cwd } from "node:process";

export class Compiler {
    public transpiler?: Transpiler

    constructor(private readonly provider?: Provider) {}

    public async compileSources(sources: string): Promise<GraphInitParamsStruct> {
        this.transpiler = new Transpiler(sources);
        let transpilerOutput: TranspilerOutput;
        
        try {
            this.transpiler.transpile();
            transpilerOutput = this.transpiler.getFullIR();
        } catch(transpilerError: unknown) {
            console.error("DSL transpiler error during compilation:");
            throw transpilerError;
        }

        let parserOutput: ParsingResult[];

        try {
            if(this.provider) {
                parserOutput = await parseIR(transpilerOutput, this.provider);
            } else {
                parserOutput = await parseIRWithInterceptor(transpilerOutput);
            }
        } catch(parserError: unknown) {
            console.error("IR parser error during compilation:");
            throw parserError;
        }

        return {
            rootNode: transpilerOutput.rootNode,
            nodes: parserOutput
        }
    }

    public async compileFile(sourcesPath: string) {
        const sources: string = await this.readTextFromFile(
            path.join(cwd(), sourcesPath),
          );
        
          return this.compileSources(sources);
    }

    private async readTextFromFile(filePath: string): Promise<string> {
        try {
          const fileContent = await fs.readFile(filePath, 'utf-8');
          return fileContent;
        } catch (error) {
          console.error(`Error reading file at ${filePath}:`, error);
          throw error;
        }
      }
}