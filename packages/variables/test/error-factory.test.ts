import { expect } from 'chai';
import {
  AllowedVariablesType,
  TypedRawOnchainVariablesDescription,
  VariablesPopulator,
} from '../src';
import { ErrorFactory } from '../src/errors/ErrorFactory';
import { SupportedTypes } from '../src/types';
import { onchainVariables } from './snapshots/dummy-onchain-variables-data';

const enableChainWithPromises = async () => {
  const chaiAsPromised = await import('chai-as-promised');
  chaiAsPromised.default;
  chai.use(chaiAsPromised.default);
};

describe('ErrorFactory using VariablePopulator', () => {
  let onchainVariablesDescription: TypedRawOnchainVariablesDescription[];
  let internalAttributes: Map<string, SupportedTypes<AllowedVariablesType>>;

  before(async () => {
    await enableChainWithPromises();

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
      const varName =
        'argA_uint256_0x56a6c1bdFa20ca3418C03b7fb24F08d3351cB8f3_0';
      const action = () => vars.insert(varName, 'invalidType'); // Invalid type for uint256

      expect(action).to.throw(
        ErrorFactory.variableTypeNotMet('invalidType', 'uint256').message,
      );
    });
  });

  describe('VariableNotFoundError', () => {
    it('should throw VariableNotFoundError when variable is not found', async () => {
      const vars = new VariablesPopulator(onchainVariablesDescription);
      const varName = 'nonExistentVar';

      expect(() => vars.insert(varName, 'value')).to.throw(
        ErrorFactory.variableNotFound(varName).message,
      );
    });
  });

  // if there is unknown injection in the attributes source it will be just ignored
  describe.skip('InjectionFormattingError', () => {
    it('should throw InjectionFormattingError when injection formatting is invalid', async () => {
      const vars = new VariablesPopulator(onchainVariablesDescription);
      internalAttributes.set('invalidKey', 'invalidValue');

      expect(() => vars
        .inject(internalAttributes)).to.be.rejectedWith(ErrorFactory.injectionFormatting('invalidKey', 1234).message);
    });
  });

  // getVarDescription is always searching the variable before it's node, so it's "Cannot find variable" error coming first, not "Not found node id for variable"
  describe.skip('VariableNodeNotFoundError', () => {
    it('should throw VariableNodeNotFoundError when variable node is not found', async () => {
      const vars = new VariablesPopulator([]);
      const varName =
        'argA_uint256_0x56a6c1bdFa20ca3418C03b7fb24F08d3351cB8f3_0';

      expect(() => vars.insert(varName, 11111111111)).to.throw(
        ErrorFactory.variableNodeNotFound(varName).message,
      );
    });
  });

  // non-initialized [] inserter is not possible using populator
  describe.skip('nodeVariablesAreUndefinedError', () => {
    it('should throw nodeVariablesAreUndefinedError when node has no variables', async () => {
      const vars = new VariablesPopulator([]);

      expect(() => vars.validateAllFilled()).to.throw(
        ErrorFactory.nodeVariablesAreUndefined('123').message,
      );
    });
  });

  // insert is validating far before validateAllFilled does
  describe.skip('VariableTypeNotKnownError', () => {
    it('should throw VariableTypeNotKnownError when variable type is not known', async () => {
      const vars = new VariablesPopulator([
        {
          nodeId:
            '0xd3ffe9815819423e66f0a03302f6fa0243f44a09855b746802f579d21c56139b',
          nodeIndex: 0,
          artifactAddress: '0x56a6c1bdFa20ca3418C03b7fb24F08d3351cB8f3',
          variables: [
            {
              typename: 'unknown',
              name: 'argA',
            },
            {
              typename: 'uint256',
              name: 'argB',
            },
          ],
          injections: [
            {
              value: 'allowance',
              index: 1,
            },
          ],
        },
      ]);
      const varName =
        'argA_unknown_0x56a6c1bdFa20ca3418C03b7fb24F08d3351cB8f3_0';
      vars.insert(varName, 11111111111);

      expect(() => vars.validateAllFilled()).to.throw(
        ErrorFactory.providedVariableWithNotKnownType(varName, 'unknown')
          .message,
      );
    });
  });

  describe('VariableNotFilledError', () => {
    it('should throw VariableNotFilledError when variable is not filled', async () => {
      const vars = new VariablesPopulator(onchainVariablesDescription);
      const varName =
        'argA_uint256_0x56a6c1bdFa20ca3418C03b7fb24F08d3351cB8f3_0';

      expect(() => vars.validateAllFilled()).to.throw(
        ErrorFactory.variableNotFilled(varName).message,
      );
    });
  });
});
