// ProjectAdmin.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pinata } from '../utils/config';
import { useSendTransaction, useActiveAccount } from 'thirdweb/react';
import { toWei } from 'thirdweb';
import { readContract, prepareContractCall } from 'thirdweb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contract } from '../thirdwebInfra';




function ProjectAdmin() {
    const { projectId, projectTitle } = useParams(); // Extract project ID and title from URL params
    const navigate = useNavigate();
    const account = useActiveAccount();

    const { mutate: sendTransaction } = useSendTransaction();

    const [project, setProject] = useState(null); // Store project details
    const [loading, setLoading] = useState(true); // Loading state

    const [amountInput, setAmountInput] = useState('');

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const projects = await readContract({
                    contract,
                    method: 'function getProjects() view returns ((uint256 id, string title, string description, uint256 bounty, uint256 bountyPool, string feedbackURI)[])',
                    params: [],
                });

                console.log("all projects", projects);
                console.log("looking for project with id", projectId);

                const projectData = projects.find((p) => p.id.toString() === projectId);
                console.log("found project", projectData);

                if (projectData) {
                    const feedbackFile = await pinata.gateways.get(projectData.feedbackURI);
                    setProject({ ...projectData, feedback: feedbackFile });
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching project details:', error);
                toast.error('Failed to load project details.');
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    const handleFundProject = async () => {
        console.log("amountInput", amountInput);




        const transaction = prepareContractCall({
            contract,
            method: 'function deposit(uint256 _projectId) payable',
            params: [projectId],
            value: toWei(amountInput),
        });

        // Log the transaction details
        console.log("Transaction:", transaction);

        sendTransaction(transaction, {
            onSuccess: () => {
                toast.success('Project funded successfully!');
                setAmountInput('');
            },
            onError: (error) => {
                console.error('Funding failed:', error);
                toast.error('Funding failed. Please try again.');
            },
        });
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading project details...</div>;
    }

    if (!project) {
        return <div className="flex justify-center items-center min-h-screen">Project not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                <p className="text-gray-700 mb-2">
                    <strong>Description:</strong> {project.description}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Bounty:</strong> {project.bounty} ETH
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Bounty Pool:</strong> {project.bountyPool} ETH
                </p>
                <p className="text-gray-700 mb-4">

                </p>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Amount (ETH)</label>
                    <input
                        type="number"
                        value={amountInput}
                        onChange={(e) => setAmountInput(e.target.value)}
                        required
                        className="mt-2 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <button
                    onClick={handleFundProject}
                    className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
                >
                    Fund Project
                </button>
            </div>

            <ToastContainer position="top-right" autoClose={5000} theme="light" />
        </div>
    );
}

export default ProjectAdmin;
