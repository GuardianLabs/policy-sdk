import * as chai from 'chai';
import { expect } from 'chai';
import {
  AllowedVariablesType,
  SuppliedVariables,
  TypedRawOnchainVariablesDescription,
  VariablesPopulator,
} from '../src';
import { SupportedTypes } from '../src/types';
import { onchainVariables } from './snapshots/dummy-onchain-variables-data';
import { ErrorFactory } from '../src/errors/ErrorFactory';

describe('ErrorFactory using VariablePopulator', () => {
  let onchainVariablesDescription: TypedRawOnchainVariablesDescription[];
  let internalAttributes: Map<string, SupportedTypes<AllowedVariablesType>>;

  before(() => {
    onchainVariablesDescription = onchainVariables;
    internalAttributes = new Map();
    internalAttributes.set('magic_hash', '0xdeadbeef');
    internalAttributes.set(
      'admin-address',
      '0xFE1e4447f5b124227fe45C5e7f0B9C878CF782C3',
    );
    internalAttributes.set(
      'allowance',
      new Promise((resolve) => resolve(13_000)),
    );
  });

  describe('VariableTypeNotMetError', () => {
    it('should throw VariableTypeNotMetError when variable type does not match', async () => {
      const vars = new VariablesPopulator(onchainVariablesDescription);
      const varName = 'argA_uint256_0x56a6c1bdFa20ca3418C03b7fb24F08d3351cB8f3_0';
      vars.insert(varName, 'invalidType'); // Invalid type for uint256

      expect(() => vars.validateAllFilled()).to.throw(
        ErrorFactory.variableTypeNotMet(varName, 'uint256').message
      );
    });
  });

  describe('VariableNotFoundError', () => {
    it('should throw VariableNotFoundError when variable is not found', async () => {
      const vars = new VariablesPopulator(onchainVariablesDescription);
      const varName = 'nonExistentVar';

      expect(() => vars.insert(varName, 'value')).to.throw(
        ErrorFactory.variableNotFound(varName).message
      );
    });
  });

  describe('InjectionFormattingError', () => {
    it('should throw InjectionFormattingError when injection formatting is invalid', async () => {
      const vars = new VariablesPopulator(onchainVariablesDescription);
      internalAttributes.set('invalidKey', 'invalidValue');

      await expect(vars.inject(internalAttributes)).to.be.rejectedWith(
        ErrorFactory.injectionFormatting('invalidKey').message
      );
    });
  });

  describe('VariableNodeNotFoundError', () => {
    it('should throw VariableNodeNotFoundError when variable node is not found', async () => {
      const vars = new VariablesPopulator([]);
      const varName = 'argA_uint256_0x56a6c1bdFa20ca3418C03b7fb24F08d3351cB8f3_0';

      expect(() => vars.insert(varName, 11111111111)).to.throw(
        ErrorFactory.variableNodeNotFound().message
      );
    });
  });

  describe('NodeHasNoVariablesError', () => {
    it('should throw NodeHasNoVariablesError when node has no variables', async () => {
      const vars = new VariablesPopulator([]);

      expect(() => vars.validateAllFilled()).to.throw(
        ErrorFactory.nodeHasNoVariables().message
      );
    });
  });

  describe('VariableTypeNotKnownError', () => {
    it('should throw VariableTypeNotKnownError when variable type is not known', async () => {
      const vars = new VariablesPopulator(onchainVariablesDescription);
      const varName = 'argA_unknown_0x56a6c1bdFa20ca3418C03b7fb24F08d3351cB8f3_0';
      vars.insert(varName, 11111111111);

      expect(() => vars.validateAllFilled()).to.throw(
        ErrorFactory.providedVariableWithNotKnownType(varName).message
      );
    });
  });

  describe('VariableNotFilledError', () => {
    it('should throw VariableNotFilledError when variable is not filled', async () => {
      const vars = new VariablesPopulator(onchainVariablesDescription);
      const varName = 'argA_uint256_0x56a6c1bdFa20ca3418C03b7fb24F08d3351cB8f3_0';

      expect(() => vars.validateAllFilled()).to.throw(
        ErrorFactory.variableNotFilled(varName).message
      );
    });
  });
});