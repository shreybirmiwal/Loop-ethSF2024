import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';

function ModelPage() {
    const { modelName } = useParams();
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const navigate = useNavigate(); // To handle redirection

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
        </div>
    );
}

export default ModelPage;
