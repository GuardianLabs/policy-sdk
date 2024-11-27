import { expect } from 'chai';
import { ethers } from 'hardhat';
import { LacLangCompiler } from '../src';
import { SNAPSHOTS_PATH, SOURCES_PATH } from './constants';
import { importJson, toLacSourcePath, toSnapshotPath } from './helpers';
import { Stub } from './sources';

describe('The "*.lac" code compilation with onchain types check', () => {
  const stubCode = Stub.DUMMY_VALID;

  describe("Valid 'dummy' code", () => {
    it.skip('success when compiled and types are checked from onchain descriptor', async () => {
      const [signer] = await ethers.getSigners();

      const lacSourcePath = toLacSourcePath(stubCode, SOURCES_PATH);
      const compiler = await LacLangCompiler.fromFile(lacSourcePath, {
        checkTypesAgainstOnchainDescriptors: true,
        provider: signer,
      });

      const compilationResult = await compiler.compile();
      const expectedResult = await importJson(
        toSnapshotPath(stubCode, SNAPSHOTS_PATH),
      );

      expect(compilationResult).to.deep.eq(expectedResult);
    });
  });
});
