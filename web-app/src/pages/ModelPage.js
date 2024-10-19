import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';

function ModelPage() {
    const { modelName } = useParams();
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const navigate = useNavigate(); // To handle redirection
    const [feedback, setFeedback] = useState({
        usefulness: null,
        clarity: null,
        relevance: null,
    });
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const aiResponse = `"${inputMessage.split('').reverse().join('')}"`;

        setChatMessages([...chatMessages, { sender: 'user', text: inputMessage }, { sender: 'ai', text: aiResponse }]);
        setInputMessage('');
    };

    const handleFeedbackChange = (metric, value) => {
        setFeedback({ ...feedback, [metric]: value });
    };

    const handleSubmitFeedback = () => {
        console.log('Feedback submitted:', feedback);
        alert('Feedback submitted successfully!');
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Chat Interface */}
            <div className="w-3/4 flex flex-col">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800">{modelName}</h2>
                </div>

                <div className="flex-grow bg-white border rounded-lg shadow-md p-6 overflow-y-auto">
                    {chatMessages.length === 0 ? (
                        <p className="text-gray-400 text-center">No messages yet. Start chatting below!</p>
                    ) : (
                        chatMessages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`p-4 rounded-lg shadow-md max-w-xs ${msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={chatEndRef} />
                </div>

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
            </div>


            {/* Right: Feedback Section (25%) */}
            <div className="w-1/4 p-8 bg-white border-l border-gray-300 flex flex-col">
                <h3 className="text-2xl font-bold text-indigo-600 mb-4">Feedback</h3>

                <div className="space-y-6 flex-grow">
                    <div>
                        <label className="text-gray-700 block mb-2">Usefulness</label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={feedback.usefulness ?? ''}
                            onChange={(e) => handleFeedbackChange('usefulness', parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 block mb-2">Clarity</label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={feedback.clarity ?? ''}
                            onChange={(e) => handleFeedbackChange('clarity', parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 block mb-2">Relevance</label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={feedback.relevance ?? ''}
                            onChange={(e) => handleFeedbackChange('relevance', parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSubmitFeedback}
                    className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 mt-8"
                >
                    Submit Feedback
                </button>
            </div>
        </div >
    );
}

export default ModelPage;
