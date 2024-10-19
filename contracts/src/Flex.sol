// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract Flex {
    struct Project {
        uint256 id;
        string title;
        string description;
        uint256 bounty;
        uint256 bountyPool;
        string feedbackURI;
    }

    Project[] public projects;

    function createProject(
        string memory _title,
        string memory _description,
        uint256 _bounty,
        string memory _feedbackURI
    ) public {
        uint256 _refactoredBounty = _bounty * 1 ether;
        // create a new project
        Project memory project = Project(
            projects.length,
            _title,
            _description,
            _refactoredBounty,
            0,
            _feedbackURI
        );
        projects.push(project);
    }

    function deposit(uint256 _projectId) public payable {
        // update project bounty pool
        projects[_projectId].bountyPool += msg.value;
    }

    function reward(address _recipient, uint256 _projectId) public {
        // transfer ETH to specified address if bounty pool is not empty
        if (projects[_projectId].bountyPool != 0) {
            projects[_projectId].bountyPool -= projects[_projectId].bounty;
            // transfer ETH to recipient
            payable(_recipient).transfer(projects[_projectId].bounty);
        }
    }

    function updateFeedbackURI(
        uint256 _projectId,
        string memory _feedbackURI
    ) public {
        // update project walrus link
        projects[_projectId].feedbackURI = _feedbackURI;
    }

    function getfeedbackURI(
        uint256 _projectId
    ) public view returns (string memory) {
        return projects[_projectId].feedbackURI;
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }

    function getProject(
        uint256 _projectId
    ) public view returns (Project memory) {
        return projects[_projectId];
    }
}
