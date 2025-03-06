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

const enableChainWithPromises = async () => {
  const chaiAsPromised = await import('chai-as-promised');
  chai.use(chaiAsPromised.default);
};

describe('Populate variables: successfull basic flow', () => {
  let onchainVariablesDescription: TypedRawOnchainVariablesDescription[];
  let intermediateFillingResult: SuppliedVariables[];
  const internalAttributes: Map<
    string,
    SupportedTypes<AllowedVariablesType>
  > = new Map();

  before(async () => {
    await enableChainWithPromises();

    onchainVariablesDescription = onchainVariables;

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

  describe('Insertion', () => {
    let vars: VariablesPopulator;

    beforeEach(() => {
      vars = new VariablesPopulator(onchainVariablesDescription);
    });

    describe('failure', () => {
      it('should initially insert frontend variables', async () => {
        let varName =
          'argA_uint256_0x56a6c1bdFa20ca3418C03b7fb24F08d3351cB8f3_0'; // timestamp_login
        expect(() => vars.insert(varName, 11111111111)).to.not.throw();

        varName = 'argA_bool_0x084e6d675B4F24854f351f5A4E39E65E017d2954_2'; // isAdmin
        expect(() => vars.insert(varName, true)).to.not.throw();

        intermediateFillingResult = vars.dumpState();
      });
    });

    describe('success', () => {
      it('should insert additional variables', async () => {
        vars.importState(intermediateFillingResult);

        const varName =
          'argA_string_0xc356608dD2F2aDd1B2fD2f430ae9084782e77Bed_1'; // username
        expect(() => vars.insert(varName, 'Admin')).to.not.throw();

        intermediateFillingResult = vars.dumpState();
      });
    });
  });

  describe('Injection', () => {
    let vars: VariablesPopulator;

    beforeEach(() => {
      vars = new VariablesPopulator(onchainVariablesDescription);

      vars.importState(intermediateFillingResult);
    });

    describe('success', () => {
      it('fully injecting attributes and validating completeness', async () => {
        internalAttributes.set('IS_DEV', false);

        await vars.inject(internalAttributes);

        expect(() => vars.validateAllFilled()).to.not.throw();
        expect(() => vars.validateAllFilledExceptInjections()).to.not.throw();
      });
    });
  });
});
