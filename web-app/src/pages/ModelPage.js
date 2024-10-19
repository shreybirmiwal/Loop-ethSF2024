import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ModelPage() {
    const { modelName } = useParams();
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [feedback, setFeedback] = useState({
        usefulness: null,
        clarity: null,
        relevance: null,
    });

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const aiResponse = `Response from ${modelName}: "${inputMessage.split('').reverse().join('')}"`;

        setChatMessages([...chatMessages, { user: inputMessage, ai: aiResponse }]);
        setInputMessage('');
    };

    const handleFeedbackChange = (metric, value) => {
        setFeedback({ ...feedback, [metric]: value });
    };

    const handleSubmitFeedback = () => {
        // Submit feedback logic can be added here
        console.log('Feedback submitted:', feedback);
        alert('Feedback submitted successfully!');
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left: Chat Interface (75%) */}
            <div className="w-3/4 p-8">
                <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">
                    {modelName} Chat Interface
                </h2>

                {/* Chat Stream */}
                <div className="bg-white border rounded-lg shadow-md p-6 mb-6 max-h-[60vh] overflow-y-auto">
                    {chatMessages.length === 0 ? (
                        <p className="text-gray-400 text-center">No messages yet. Start chatting below!</p>
                    ) : (
                        chatMessages.map((msg, index) => (
                            <div key={index} className="mb-4">
                                <p className="text-indigo-600 font-semibold">You:</p>
                                <p className="mb-2">{msg.user}</p>
                                <p className="text-green-600 font-semibold">AI:</p>
                                <p className="mb-2">{msg.ai}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Message Input */}
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                    >
                        Send
                    </button>
                </div>
            </div>

            {/* Right: Feedback Section (25%) */}
            <div className="w-1/4 p-8 bg-white border-l border-gray-300">
                <h3 className="text-2xl font-bold text-indigo-600 mb-4">Feedback</h3>

                <div className="space-y-4">
                    <label className="text-gray-700">Usefulness</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={feedback.usefulness ?? ''}
                        onChange={(e) => handleFeedbackChange('usefulness', parseInt(e.target.value))}
                        className="w-3/4"
                    />
                    <label className="text-gray-700">Clarity</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={feedback.clarity ?? ''}
                        onChange={(e) => handleFeedbackChange('clarity', parseInt(e.target.value))}
                        className="w-3/4"
                    />
                </div>
                <label className="text-gray-700">Relevance</label>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={feedback.relevance ?? ''}
                    onChange={(e) => handleFeedbackChange('relevance', parseInt(e.target.value))}
                    className="w-3/4"
                />

                <button
                    onClick={handleSubmitFeedback}
                    className="w-full bg-indigo-500 text-white py-3 rounded-lg mt-8 hover:bg-indigo-600"
                >
                    Submit Feedback
                </button>
            </div>
        </div >
    );
}

export default ModelPage;
