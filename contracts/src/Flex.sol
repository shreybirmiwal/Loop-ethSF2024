// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Flex {
    struct Project {
        uint256 id;
        string title;
        string description;
        address dev;
        uint256 bounty;
        uint256 bountyPool;
        string walrusLink;
    }

    Project[] public projects;

    mapping(address => uint256[]) public devProjects;
    address internal immutable USDC;

    constructor(address _USDC) {
        USDC = _USDC;
    }

    function createProject(
        string memory _title,
        string memory _description,
        address _dev,
        uint256 _bounty,
        string memory _walrusLink
    ) public {
        uint256 currentId = projects.length;
        // create a new project
        Project memory project = Project(
            currentId,
            _title,
            _description,
            _dev,
            _bounty,
            0,
            _walrusLink
        );
        projects.push(project);
        devProjects[_dev].push(projects.length - 1);
    }

    function deposit(
        address _dev,
        uint256 _projectId,
        uint256 _amount
    ) public payable {
        // approves USDC via transferFrom
        ERC20(USDC).approve(address(this), _amount);
        // transfer USDC to this contract
        ERC20(USDC).transferFrom(_dev, address(this), _amount);

        // update project bounty pool
        projects[_projectId].bountyPool += _amount;
    }

    function reward(address _recipient, uint256 _projectId) public {
        // transfer USDC to specified address if bounty pool is not empty
        if (projects[_projectId].bountyPool != 0) {
            projects[_projectId].bountyPool -= projects[_projectId].bounty;
            ERC20(USDC).transferFrom(
                address(this),
                payable(_recipient),
                projects[_projectId].bounty
            );
        }
    }
}
