// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {Flex} from "../src/Flex.sol";

contract FlexTest is Test {
    Flex public flex;

    function setUp() public {
        address usdc = address(0);
        flex = new Flex(usdc);
    }
}
