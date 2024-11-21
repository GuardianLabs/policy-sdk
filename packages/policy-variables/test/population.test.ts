import chai, { expect } from 'chai';
import { VariablesPopulator, AllowedVariablesType } from '../src';
import { FilledVariables } from '../src/types';
import { TypedRawOnchainVariablesDescription } from '../src/utils';
import { default as onchainVariables } from './snapshots/dummy.json';

describe('Variables population minimal flow', () => {
  let rawOnchainVariables: TypedRawOnchainVariablesDescription[];
  let intermediateFillingResult: FilledVariables[];
  let internalAttributes: Map<string, AllowedVariablesType | Promise<AllowedVariablesType>>;

  before(async () => {
    rawOnchainVariables = <TypedRawOnchainVariablesDescription[]>(
      onchainVariables
    );

    internalAttributes = new Map();

    internalAttributes.set('allowance', new Promise((resolve) => resolve(13_000)));
    internalAttributes.set('magic_hash', '0xdeadbeef');
    internalAttributes.set(
      'admin-address',
      '0xFE1e4447f5b124227fe45C5e7f0B9C878CF782C3',
    );
  });

  it('initial frontend variables insertion', async () => {
    const vars = new VariablesPopulator(rawOnchainVariables);

    // console.log(vars.getVariablesDescription());

    vars.insert(
      'argA_uint256_0x56a6c1bdFa20ca3418C03b7fb24F08d3351cB8f3_0',
      11111111111,
    ); // timestamp_login
    vars.insert('argA_bool_0x084e6d675B4F24854f351f5A4E39E65E017d2954_2', true); // isAdmin

    expect(() => vars.validateFilledAllOrThrow()).to.throw(
      'Variable argB_uint256_0x56a6c1bdFa20ca3418C03b7fb24F08d3351cB8f3_0 (injection: allowance) was not filled',
    );
    expect(() => vars.validateFilledAllExceptInjectionsOrThrow()).to.throw(
      'Variable argA_string_0xc356608dD2F2aDd1B2fD2f430ae9084782e77Bed_1  was not filled',
    );

    intermediateFillingResult = vars.getVariablesValues();
  });

  it('secondary frontend variables insertion', async () => {
    const vars = new VariablesPopulator(rawOnchainVariables);

    vars.import(intermediateFillingResult);

    vars.insert(
      'argA_string_0xc356608dD2F2aDd1B2fD2f430ae9084782e77Bed_1',
      'Admin',
    ); // username

    expect(() => vars.validateFilledAllOrThrow()).to.throw(
      'Variable argB_uint256_0x56a6c1bdFa20ca3418C03b7fb24F08d3351cB8f3_0 (injection: allowance) was not filled',
    );
    expect(() =>
      vars.validateFilledAllExceptInjectionsOrThrow(),
    ).to.not.throw();

    intermediateFillingResult = vars.getVariablesValues();
  });

  it('sharing inserted values with backand and partially injecting attributes', async () => {
    const vars = new VariablesPopulator(rawOnchainVariables);

    vars.import(intermediateFillingResult);

    await vars
      .inject(internalAttributes)
      .catch((e) =>
        expect(e.message).to.eq(
          'No injection or default value for argB_bool_0x084e6d675B4F24854f351f5A4E39E65E017d2954_2 (attribute IS_DEV) found',
        ),
      );

    intermediateFillingResult = vars.getVariablesValues();
  });

  it('fully injecting attributes and validating completeness', async () => {
    const vars = new VariablesPopulator(rawOnchainVariables);

    vars.import(intermediateFillingResult);

    internalAttributes.set('IS_DEV', false);

    await vars.inject(internalAttributes);

    expect(() => vars.validateFilledAllOrThrow()).to.not.throw();
    expect(() =>
      vars.validateFilledAllExceptInjectionsOrThrow(),
    ).to.not.throw();

    // console.log(vars.getVariablesValues());
    // console.log(vars.getVariablesEncoded());
  });
});
