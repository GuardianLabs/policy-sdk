import { getAddress, getBytes } from 'ethers';
import { solidityEncode } from '../../../../../../../policy-contracts/test/utils/solidity-encode-decode';
import { isSupportedSolidityType } from '../guards';
import {
  KnownTSType,
  SolidityType,
  SupportedSolidityTypesEnum,
} from '../types';

export class TypesNormalizer {
  // note: can take multiple type/value pairs, then encode inputs to Solidity-bytes
  static toSolidityEncodedValueFromString(
    soldityTypes: string[], // taken from onchain declaration
    valuesAsStringList: string[],
  ): string {
    // note: Convert each argument to its respective TS type
    const convertedValues = this.toTsArrayFromStringArray(
      soldityTypes,
      valuesAsStringList,
    );

    // note: Encode the types and values using EthersV6-Solidity's encoding function
    return solidityEncode(soldityTypes, convertedValues);
  }

  // note: Normalizes argument supplied as string (defined in this way in intermediate presentation) to the respective typescript type
  static toTsValueFromString(
    type: SolidityType,
    valueAsString: string,
  ): KnownTSType {
    const getBool = (value: string): boolean => {
      return value === 'true' ? true : false;
    };

    switch (type) {
      case SupportedSolidityTypesEnum.Address:
        return getAddress(valueAsString); // string to a valid Ethereum address
      case SupportedSolidityTypesEnum.Bool:
        return getBool(valueAsString); // 'true'/'false' to boolean
      case SupportedSolidityTypesEnum.String:
        return valueAsString.replace(/^"(.*)"$/, '$1'); // Removes quotes around a string if present
      case SupportedSolidityTypesEnum.Bytes:
        return getBytes(valueAsString); // string to bytes (expects a hex string)
      case SupportedSolidityTypesEnum.Uint256:
        return BigInt(valueAsString); // string to BigInt (for 'uint256' type)
      default:
        // Type is known for sure, because there is a guard in previous calls
        throw new Error(
          `Can not normalize. Provided Solidity type ${type} is known yet unsupported`,
        );
    }
  }

  // note: This takes raw values (defined as string in intermediate presentation), then converts them to respective typesript types.
  // While converting it relies on solidity-types fetched from onchain declaration of Artifact.
  static toTsArrayFromStringArray = (
    soldityTypes: string[], // taken from onchain declaration
    valuesAsStringList: string[],
  ): Array<KnownTSType> => {
    if (soldityTypes.length !== valuesAsStringList.length) {
      throw new Error(
        `Can not convert to Typescript value: Solidity-Types ${soldityTypes.length} and Values ${valuesAsStringList.length} arrays lengths not match`,
      );
    }

    const typedValuesList = valuesAsStringList.map((value, index) => {
      const solidityTypeName = soldityTypes[index];
      if (isSupportedSolidityType(solidityTypeName)) {
        // note: converts each argument to its respective type
        return this.toTsValueFromString(solidityTypeName, value);
      } else {
        throw new Error(`Supplied unknown Solidity type ${solidityTypeName}`);
      }
    });

    return typedValuesList;
  };
}
