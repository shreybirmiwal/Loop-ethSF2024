import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ModelPage() {
    const { modelName } = useParams();
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        // Simulate AI response (you can later replace this with real API calls)
        const aiResponse = `Response from ${modelName}: "${inputMessage.split('').reverse().join('')}"`;

        setChatMessages([...chatMessages, { user: inputMessage, ai: aiResponse }]);
        setInputMessage('');
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        console.log('Feedback Submitted:', feedback);
        alert('Thank you for your feedback!');
        setFeedback('');
    };

    return (
        <div className="p-8 min-h-screen bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-8">{modelName} Chat Interface</h2>

            {/* Chat Stream */}
            <div className="bg-white border rounded-lg shadow-md p-6 mb-6 max-h-80 overflow-y-auto">
                {chatMessages.length === 0 ? (
                    <p className="text-gray-400 text-center">No messages yet. Start chatting below!</p>
                ) : (
                    chatMessages.map((msg, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-indigo-600 font-semibold">You:</p>
                            <p className="mb-2">{msg.user}</p>
                            <p className="text-green-600 font-semibold">AI:</p>
                            <p>{msg.ai}</p>
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

            {/* Feedback Section */}
            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4">Submit Feedback</h3>
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Provide useful feedback for improving the model..."
                        rows="4"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModelPage;
