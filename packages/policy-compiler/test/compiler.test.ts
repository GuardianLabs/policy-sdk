import { LacLangCompiler } from '../src';

describe('.lac code compilation', () => {
  it('Dummy valid code: must successfully compile', async () => {
    const compiler = new LacLangCompiler();

    const compilationResult = await compiler.compileFile(
      './test/sources/DummyValid.lac',
    );

    console.log(compilationResult);
  });
});
