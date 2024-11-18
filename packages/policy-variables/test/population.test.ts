import { VariablesPopulator, AllowedVariablesType } from '../src';
import { OnchainVariablesDescription } from '../src/types';
import { TypedRawOnchainVariablesDescription } from '../src/utils';
import { default as onchainVariables } from './snapshots/dummy.json';

describe('Variables population minimal flow', () => {
  let rawOnchainVariables: TypedRawOnchainVariablesDescription[];

  before(async () => {
    rawOnchainVariables = <TypedRawOnchainVariablesDescription[]>(
      onchainVariables
    );
  });

  it('insertion and injection', async () => {
    let attributes: Map<string, AllowedVariablesType> = new Map();

    attributes.set('allowance', 13_000);
    attributes.set('magic_hash', '0xdeadbeef');
    attributes.set('IS_DEV', false);
    attributes.set('admin-address', '0xfffff');

    const vars = new VariablesPopulator(rawOnchainVariables);

    vars.insert(
      'argA_string_0xc356608dD2F2aDd1B2fD2f430ae9084782e77Bed_1',
      'Admin',
    ); // username
    vars.insert(
      'argA_uint256_0x56a6c1bdFa20ca3418C03b7fb24F08d3351cB8f3_0',
      11111111111,
    ); // timestamp_login
    vars.insert('argA_bool_0x084e6d675B4F24854f351f5A4E39E65E017d2954_2', true); // isAdmin

    await vars.inject(attributes);

    const fullyPopulatedVariables = vars.getVariablesValues();

    console.log(fullyPopulatedVariables);
  });
});
