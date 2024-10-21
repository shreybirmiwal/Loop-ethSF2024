// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {Flex} from "../src/Flex.sol";

contract FlexTest is Test {
    Flex public flex;
    address dev = address(0xeb8C9739A26808c7BE735d2543e45B5B6D06169E);
    address sree = address(0x8B603f2890694cF31689dFDA28Ff5e79917243e9);

    function setUp() public {
        flex = new Flex();
        vm.deal(dev, 1000 ether);
    }

    function testCreateProject() public {
        vm.startPrank(dev);
        flex.createProject(
            "Project 1",
            "Description 1",
            1,
            "https://walrus.com/1"
        );
        flex.createProject(
            "Project 2",
            "Description 2",
            2,
            "https://walrus.com/2"
        );
        flex.createProject(
            "Project 3",
            "Description 3",
            3,
            "https://walrus.com/3"
        );

        Flex.Project[] memory projects = flex.getProjects();
        assertEq(projects.length, 3);
        assertEq(projects[0].bounty, 1 ether);
    }

    function testDeposit() public {
        vm.startPrank(dev);
        flex.createProject(
            "Project 1",
            "Description 1",
            1,
            "https://walrus.com/1"
        );
        flex.deposit{value: 500 ether}(0);
        Flex.Project memory project = flex.getProject(0);
        assertEq(project.bountyPool, 500 ether);
    }

    function testReward() public {
        vm.startPrank(dev);
        flex.createProject(
            "Project 1",
            "Description 1",
            1,
            "https://walrus.com/1"
        );
        flex.deposit{value: 500 ether}(0);
        flex.reward(sree, 0);
        Flex.Project memory project = flex.getProject(0);
        assertEq(project.bountyPool, 499 ether);
    }

    function testUpdateFeedbackURI() public {
        vm.startPrank(dev);
        flex.createProject(
            "Project 1",
            "Description 1",
            1,
            "https://walrus.com/1"
        );
        flex.updateFeedbackURI(0, "https://walrus.com/updated");
        Flex.Project memory project = flex.getProject(0);
        assertEq(project.feedbackURI, "https://walrus.com/updated");
    }
}
