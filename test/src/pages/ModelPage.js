import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { client, contract, abi } from '../thirdwebInfra';
import { prepareContractCall } from "thirdweb"
import { useSendTransaction } from "thirdweb/react";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";

import { db } from '../firebase';
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';

const API_BASE_URL = "https://shreybirmiwal.pythonanywhere.com"; // Flask server for model response

function ModelPage() {
    const { projectId, projectTitle } = useParams();

    var projectTitle2 = projectTitle.replace("_", "/");


    const { mutate: sendTransaction } = useSendTransaction();
    const account = useActiveAccount();


    const [chatMessages, setChatMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [feedbackVal, setFeedback] = useState('');
    const [feedbackPending, setFeedbackPending] = useState(false);
    const chatEndRef = useRef(null);


    //crypto stuff
    // const web3 = new Web3('https://rpc-amoy.polygon.technology/');
    // const contractCode = new web3.eth.Contract(abi, "0x7a722C4C585F17B237DD2C57dD46677c7D348420");



    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        try {
            console.log("Sending API request...");

            const response = await fetch(`${API_BASE_URL}/infer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: projectTitle2,
                    query: inputMessage
                })
            });

            if (!response.ok) throw new Error(`Server responded with ${response.status}`);


            const data = await response.json();
            console.log(data);


            setChatMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'user', text: inputMessage },
                { sender: 'ai', text: data.res },
            ]);

            setInputMessage('');
            setFeedbackPending(true);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            toast.error('Failed to get response from model!', { position: 'top-right', theme: 'light' });
        }
    };

    const handleUpdateIPFS = async (selectedFeedback) => {
        console.log("Updating IPFS");

        // Get the latest query and response from chatMessages
        const query = chatMessages[chatMessages.length - 2]?.text;
        const response = chatMessages[chatMessages.length - 1]?.text;

        console.log('Query:', query);
        console.log('Response:', response);
        console.log('Feedback:', selectedFeedback); // Use the passed parameter

        try {
            // Reference the specific document in the 'data' collection
            const docRef = doc(db, 'data', projectId);

            // Create the new entry to append
            const newEntry = {
                query,
                response,
                feedback: selectedFeedback, // Use the passed parameter
                timestamp: new Date().toISOString(), // Optional: add a timestamp
            };

            // Check if the document exists
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Document exists, so update it with arrayUnion
                await updateDoc(docRef, {
                    data: arrayUnion(newEntry),
                });
                console.log('New entry successfully added!');
            } else {
                // Document doesn't exist, so create it with the new entry
                await setDoc(docRef, {
                    data: [newEntry], // Initialize with an array containing the new entry
                }, { merge: true });
                console.log('Document created and new entry added!');
            }
        } catch (error) {
            console.error('Error appending data:', error);
        }
    };


    const handleFeedbackSelection = (selectedFeedback) => {
        setFeedback(selectedFeedback);  // This will still update the state
        toast.success(`Feedback submitted: ${selectedFeedback}`, { position: 'top-right', theme: 'light' });

        console.log("SEND THIS STUFF TO THE WALRUS DB");
        console.log('Feedback:', selectedFeedback);
        console.log('Query:', chatMessages[chatMessages.length - 2]?.text);
        console.log('Response:', chatMessages[chatMessages.length - 1]?.text);
        console.log("GIVE USER THE MONEY");

        setFeedbackPending(false);

        handleUpdateIPFS(selectedFeedback);
        handlePayments();
    };

    //user needs to be payed out here

    const handlePayments = async () => {
        console.log("handle payments here ...")
        const transaction = prepareContractCall({
            contract,
            method: "function reward(address _recipient, uint256 _projectId)",
            params: [account?.address, projectId]
        });
        sendTransaction(transaction);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">{projectTitle2}</h2>
            </div>

            { }

            <div className="flex-grow bg-white border rounded-lg shadow-md p-6 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                    <div key={index} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-4 rounded-lg shadow-md max-w-xs ${msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Feedback Section */}
            {feedbackPending && (
                <div className="p-4 border-t bg-white">
                    <h3 className="text-lg font-bold mb-2">Please provide feedback on that output:</h3>
                    <div className="flex space-x-2">
                        {[
                            { label: 'Good 😊', value: 'Good', color: 'bg-green-500' },
                            { label: 'Bad 😞', value: 'Bad', color: 'bg-red-500' },
                            { label: 'Answered Question 🤔', value: 'Answered', color: 'bg-blue-500' },
                            { label: "Didn't Answer Question ❓", value: 'Didn\'t Answer', color: 'bg-yellow-500' },
                            { label: 'Too Long 📜', value: 'Too Long', color: 'bg-purple-500' },
                            { label: 'Too Short 📝', value: 'Too Short', color: 'bg-orange-500' },
                        ].map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleFeedbackSelection(option.value)}
                                className={`flex-1 py-2 rounded-lg text-white ${option.color} hover:bg-opacity-80 transition`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input Area */}
            {!feedbackPending && (
                <div className="flex items-center p-4 bg-white border-t">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                    />
                    <button onClick={handleSendMessage} className="ml-4 p-3 bg-indigo-500 text-white rounded-full">
                        <FiSend size={24} />
                    </button>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
}

export default ModelPage;



