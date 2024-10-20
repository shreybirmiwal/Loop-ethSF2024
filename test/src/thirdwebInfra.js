import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ThirdwebProvider } from "thirdweb/react";

export const client = createThirdwebClient({
    clientId: "054f29c5673f6dd2f9955c0e3a447113"
});


export const contract = getContract({
    client,
    chain: defineChain(2710),
    address: "0xE8046f922F3Ad4bd633447014DDf89d57070ED87"


    //zircuit
    // chain: defineChain(48900),
    // address: "0xba30D3b9F488554696814F19C5Be18e7668E67e3"


    // chain: defineChain(245022926),
    // address: "0x56B6893A61F9D3988B176f36f2C33bc910513495"


});


export const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_bounty",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_feedbackURI",
                "type": "string"
            }
        ],
        "name": "createProject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_projectId",
                "type": "uint256"
            }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_projectId",
                "type": "uint256"
            }
        ],
        "name": "getProject",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "bounty",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "bountyPool",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "feedbackURI",
                        "type": "string"
                    }
                ],
                "internalType": "struct Flex.Project",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getProjects",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "bounty",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "bountyPool",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "feedbackURI",
                        "type": "string"
                    }
                ],
                "internalType": "struct Flex.Project[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_projectId",
                "type": "uint256"
            }
        ],
        "name": "getfeedbackURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "projects",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "bounty",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "bountyPool",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "feedbackURI",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_projectId",
                "type": "uint256"
            }
        ],
        "name": "reward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_projectId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_feedbackURI",
                "type": "string"
            }
        ],
        "name": "updateFeedbackURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]