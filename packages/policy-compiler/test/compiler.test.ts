import { expect } from 'chai';
import { ethers } from 'hardhat';
import { LacLangCompiler } from '../src';
import { SNAPSHOTS_PATH, SOURCES_PATH } from './constants';
import { importJson, toLacSourcePath, toSnapshotPath } from './helpers';
import { Stub } from './sources';

describe('.lac code compilation', () => {
  const stubCode = Stub.DUMMY_VALID;

  describe('Dummy valid code', () => {
    it('success when compiled and types are checked from declaration', async () => {
      const compiler = new LacLangCompiler();

      const compilationResult = await compiler.compileFile(
        toLacSourcePath(stubCode, SOURCES_PATH),
      );
      const expectedResult = await importJson(
        toSnapshotPath(stubCode, SNAPSHOTS_PATH),
      );

      expect(compilationResult).to.deep.eq(expectedResult);
    });

    it.skip('success when compiled and types are checked from onchain descriptor', async () => {
      const [signer] = await ethers.getSigners();

      const compiler = new LacLangCompiler({
        checkTypesAgainstOnchainDescriptors: true,
        provider: signer,
      });

      const compilationResult = await compiler.compileFile(
        toLacSourcePath(stubCode, SOURCES_PATH),
      );
      const expectedResult = await importJson(
        toSnapshotPath(stubCode, SNAPSHOTS_PATH),
      );

      expect(compilationResult).to.deep.eq(expectedResult);
    });
  });
});
