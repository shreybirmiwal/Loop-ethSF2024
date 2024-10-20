import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSendTransaction, useActiveAccount } from 'thirdweb/react';
import { toWei } from 'thirdweb';
import { readContract, prepareContractCall } from 'thirdweb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { db } from '../firebase';
import { collection, getDoc, doc } from 'firebase/firestore';
// import { saveAs } from 'file-saver'; // Import for downloading JSON files

import { contract } from '../thirdwebInfra';

function ProjectAdmin() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const account = useActiveAccount();
    const { mutate: sendTransaction } = useSendTransaction();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [amountInput, setAmountInput] = useState('');
    const [fire, setFire] = useState([]); // Firebase data state

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const firebaseData = await fetchFirebase(projectId);

                const projectData = await readContract({
                    contract,
                    method: 'function getProject(uint256 _projectId) view returns ((uint256 id, string title, string description, uint256 bounty, uint256 bountyPool, string feedbackURI))',
                    params: [projectId],
                });

                console.log("Fetched project:", projectData);

                setProject({ ...projectData, firebaseData });
                setFire(firebaseData.data.slice(0, 20)); // Store first 20 data points
                setLoading(false);
            } catch (error) {
                console.error('Error fetching project details:', error);
                toast.error('Failed to load project details.');
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    const fetchFirebase = async (projectId) => {
        try {
            const docRef = doc(db, 'data', projectId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("firebaseData:", docSnap.data());
                return docSnap.data(); // Return data from the document
            } else {
                console.log("No such document!");
                return { data: [] }; // Return empty array if no data found
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

    // const downloadData = () => {
    //     const json = JSON.stringify(project.firebaseData, null, 2); // Pretty print JSON
    //     const blob = new Blob([json], { type: 'application/json' });
    //     saveAs(blob, `project_${projectId}_data.json`);
    // };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading project details...</div>;
    }

    if (!project) {
        return <div className="flex justify-center items-center min-h-screen">Project not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">

            <div className='p-10'>

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



                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4"> Results </h2>
                    <div className="overflow-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Query</th>
                                    <th className="border border-gray-300 px-4 py-2">Response</th>
                                    <th className="border border-gray-300 px-4 py-2">Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fire.map((entry, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">{entry.query}</td>
                                        <td className="border border-gray-300 px-4 py-2">{entry.response}</td>
                                        <td className="border border-gray-300 px-4 py-2">{entry.feedback}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <ToastContainer position="top-right" autoClose={5000} theme="light" />
            </div>
        </div>
    );
}

export default ProjectAdmin;



