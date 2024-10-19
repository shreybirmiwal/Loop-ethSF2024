import React from 'react';
import { useNavigate } from 'react-router-dom';

const models = [
    { name: 'GPT-3', description: 'Advanced text generation' },
    { name: 'Stable Diffusion', description: 'AI-powered image generation' },
    { name: 'BERT', description: 'NLP tasks like Q&A' },
    { name: 'DALL-E', description: 'Art generation using AI' },
];

function Home() {
    const navigate = useNavigate();

    const handleModelClick = (modelName) => {
        navigate(`/model/${modelName}`);
    };

    return (
        <div className="p-8">
            {/* Hero Section */}
            <section className="text-center py-16 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg mb-12">
                <h1 className="text-5xl font-bold mb-6">Explore AI Models & Earn Crypto</h1>
                <p className="text-lg mx-auto">
                    Use AI models for your tasks, improve them with feedback, and earn crypto rewards.
                </p>
            </section>

            {/* Model List Section */}
            <section>
                <h2 className="text-3xl font-bold mb-6 ">Available Models</h2>
                <div className="space-y-4">
                    {models.map((model, index) => (
                        <div
                            key={index}
                            className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                            onClick={() => handleModelClick(model.name)}
                        >
                            <h3 className="text-xl font-semibold text-indigo-600 mb-2">{model.name}</h3>
                            <p className="text-gray-600">{model.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
