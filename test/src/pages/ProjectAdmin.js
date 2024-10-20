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

import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc } from 'firebase/firestore';


function ProjectAdmin() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const account = useActiveAccount();
    const { mutate: sendTransaction } = useSendTransaction();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [amountInput, setAmountInput] = useState('');
    const [fire, setFire] = useState([]);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                // Fetch the relevant Firebase document based on the projectId.
                const firebaseData = await fetchFirebase(projectId);

                const projectData = await readContract({
                    contract,
                    method: 'function getProject(uint256 _projectId) view returns ((uint256 id, string title, string description, uint256 bounty, uint256 bountyPool, string feedbackURI))',
                    params: [projectId],
                });

                console.log("Fetched project:", projectData);

                if (projectData) {
                    const feedbackFile = await pinata.gateways.get(projectData.feedbackURI);
                    setProject({ ...projectData, feedback: feedbackFile, firebaseData });
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

    // Fetch a specific document from Firebase
    const fetchFirebase = async (projectId) => {
        try {
            const docRef = doc(db, 'data', projectId); // Reference the specific document by ID
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("firebaseData:", docSnap.data());
                return docSnap.data(); // Return the document data directly
            } else {
                console.log("No such document!");
                return null;
            }
        } catch (error) {
            console.error('Error fetching Firebase data:', error);
            throw error;
        }
    };

    const handleFundProject = async () => {
        console.log("amountInput", amountInput);

        const transaction = prepareContractCall({
            contract,
            method: 'function deposit(uint256 _projectId) payable',
            params: [projectId],
            value: toWei(amountInput),
        });

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

    // Convert BigInt to ETH (number) for display
    const formatWeiToEth = (wei) => {
        return wei;
        //return (BigInt(wei) / BigInt(1e18)).toString(); // Convert to string for rendering
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
                    <strong>Bounty:</strong> {formatWeiToEth(project.bounty)} ETH
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Bounty Pool:</strong> {formatWeiToEth(project.bountyPool)} ETH
                </p>

                <a
                    href={`https://gateway.pinata.cloud/ipfs/${project.feedbackURI}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                >
                    Download Feedback Data
                </a>

                <div className="mt-4">
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
                    className="w-full bg-green-500 text-white py-3 mt-4 rounded-lg hover:bg-green-600 transition"
                >
                    Fund Project
                </button>
            </div>

            <ToastContainer position="top-right" autoClose={5000} theme="light" />
        </div>
    );
}

export default ProjectAdmin;
