//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.27;

import { StatefulArtifactBase } from "../common/basis/StatefulArtifactBase.sol";
import { BOOL, ADDRESS, BYTES, UINT, STRING } from "../constants/Export.sol";

contract StatefulMock is StatefulArtifactBase {
    bool private var1;
    address private var2;
    bytes private var3;
    uint256 private var4;
    string private var5;

    function getInitDescriptor()
        external
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes)
    {
        uint256 argsLength = 5;

        argsNames = new string[](argsLength);
        argsNames[0] = "init1";
        argsNames[1] = "init2";
        argsNames[2] = "init3";
        argsNames[3] = "init4";
        argsNames[4] = "init5";

        argsTypes = new string[](argsLength);
        argsTypes[0] = BOOL;
        argsTypes[1] = ADDRESS;
        argsTypes[2] = BYTES;
        argsTypes[3] = UINT;
        argsTypes[4] = STRING;
    }

    function getExecDescriptor()
        external
        pure
        override
        returns (string[] memory argsNames, string[] memory argsTypes, string memory returnType)
    {
        uint256 argsLength = 5;

        argsNames = new string[](argsLength);
        argsNames[0] = "arg1";
        argsNames[1] = "arg2";
        argsNames[2] = "arg3";
        argsNames[3] = "arg4";
        argsNames[4] = "arg5";

        argsTypes = new string[](argsLength);
        argsTypes[0] = BOOL;
        argsTypes[1] = ADDRESS;
        argsTypes[2] = BYTES;
        argsTypes[3] = UINT;
        argsTypes[4] = STRING;

        returnType = BOOL;
    }

    function _init(bytes memory data) internal override {
        super._init(data);

        (bool init1, address init2, bytes memory init3, uint256 init4, string memory init5) = abi
            .decode(data, (bool, address, bytes, uint256, string));

        var1 = init1;
        var2 = init2;
        var3 = init3;
        var4 = init4;
        var5 = init5;
    }

    function _exec(bytes[] memory data) internal override returns (bytes memory encodedResult) {
        super._exec(data);

        bool arg1 = abi.decode(data[0], (bool));
        address arg2 = abi.decode(data[1], (address));
        bytes memory arg3 = abi.decode(data[2], (bytes));
        uint256 arg4 = abi.decode(data[3], (uint256));
        string memory arg5 = abi.decode(data[4], (string));

        bool eqls = arg1 == var1 &&
            arg2 == var2 &&
            keccak256(arg3) == keccak256(var3) &&
            arg4 == var4 &&
            keccak256(abi.encode(arg5)) == keccak256(abi.encode(var5));

        return abi.encode(eqls);
    }
}
