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
import { toWei } from 'thirdweb';

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

        try {
            console.log("Form submission started");
            console.log({ title, description, hfLink, bounty });

            // IPFS upload
            console.log("Starting IPFS upload");
            const randomId = Math.floor(Math.random() * 1000000);
            const blankFile = new File(["placeholder"], `${randomId}.txt`, { type: "text/plain" });

            console.log("Uploading to Pinata");
            const upload = await pinata.upload.file(blankFile);
            const ipfsLink = upload.IpfsHash;
            console.log(`IPFS Link: ${ipfsLink}`);

            // Prepare the blockchain transaction
            console.log("Preparing blockchain transaction");
            const transaction = prepareContractCall({
                contract,
                method: "function createProject(string _title, string _description, uint256 _bounty, string _feedbackURI)",
                params: [title, description, toWei(bounty), ipfsLink]
            });
            console.log("Transaction prepared:", transaction);

            // Send the transaction
            console.log("Sending transaction");
            const result = await sendTransaction(transaction);
            console.log("Transaction result:", result);

            toast.success('Model uploaded successfully!', { theme: 'light' });
        } catch (error) {
            console.error("Error in form submission:", error);
            toast.error('Error uploading model: ' + error.message, { theme: 'light' });
        }
    }

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
