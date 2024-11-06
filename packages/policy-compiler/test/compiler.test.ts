import { expect } from 'chai';
import { LacLangCompiler } from '../src';
import { Stub } from './sources';
import { toLacSourcePath, toSnapshotPath, importJson } from './helpers';
import { SNAPSHOTS_PATH, SOURCES_PATH } from './constants';

describe('.lac code compilation', () => {
  it('Dummy valid code: must successfully compile', async () => {
    const compiler = new LacLangCompiler();
    const stubCode = Stub.DUMMY_VALID;

    const compilationResult = await compiler.compileFile(
      toLacSourcePath(stubCode, SOURCES_PATH),
    );
    const expectedResult = await importJson(toSnapshotPath(stubCode, SNAPSHOTS_PATH));

    expect(compilationResult).to.deep.eq(expectedResult);
  });
});
