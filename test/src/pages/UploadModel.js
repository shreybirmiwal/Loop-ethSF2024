import React, { useState, useEffect } from 'react';
import { pinata } from '../utils/config';

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { client, contract, abi } from '../thirdwebInfra';
import { prepareContractCall } from "thirdweb"
import { useSendTransaction } from "thirdweb/react";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { readContract } from 'thirdweb';

function UploadModelPage() {
    const navigate = useNavigate(); // Navigation for redirect

    const { mutate: sendTransaction } = useSendTransaction();
    const account = useActiveAccount();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [hfLink, setHfLink] = useState('');
    const [bounty, setBounty] = useState('');


    const handleFormSubmit = async (e) => {
        e.preventDefault();


        // Handle submission logic here
        console.log({ title, description, hfLink, bounty });

        //ipfs upload
        //get all projects
        const projects = await readContract({
            contract,
            method: "function getProjects() view returns ((uint256 id, string title, string description, uint256 bounty, uint256 bountyPool, string feedbackURI)[])",
            params: []
        })


        //next project id = project length current
        const nextProjectId = projects.length;
        const blankFile = new File([""], `${nextProjectId}.txt`, { type: "text/plain" });
        const upload = await pinata.upload.file(blankFile);
        const ipfsLink = upload.IpfsHash;
        console.log(`IPFS Link: ${ipfsLink}`);


        // publish the model to the blockchain
        const transaction = prepareContractCall({
            contract,
            method: "function createProject(string _title, string _description, uint256 _bounty, string _feedbackURI)",
            params: [title, description, bounty, ipfsLink]
        });
        sendTransaction(transaction);


        //once transacted, redirect to the admin page
        navigate('/admin/' + nextProjectId + '/' + title);


        toast.success('Model uploaded successfully!', { theme: 'light' });
        navigate('/models'); // Redirect after success
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">


            {/* Main Content */}
            <main className="flex-grow flex justify-center items-center">
                <form
                    onSubmit={handleFormSubmit}
                    className="w-full max-w-2xl space-y-8 bg-white p-8 rounded-lg shadow-lg"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Model Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-2 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows="5"
                            className="mt-2 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hugging Face Link</label>
                        <input
                            type="url"
                            value={hfLink}
                            onChange={(e) => setHfLink(e.target.value)}
                            required
                            className="mt-2 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                            placeholder="https://huggingface.co/..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bounty Reward Per HF</label>
                        <input
                            type="number"
                            value={bounty}
                            onChange={(e) => setBounty(e.target.value)}
                            required
                            min="0"
                            step="0.01"
                            className="mt-2 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                            placeholder="0.00"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition"
                    >
                        Upload Model
                    </button>
                </form>

            </main>

            <ToastContainer position="top-right" autoClose={5000} theme="light" />
        </div>
    );
}

export default UploadModelPage;
