import React from 'react';

const models = [
    { name: 'GPT-3', description: 'Text generation model', img: 'https://via.placeholder.com/150' },
    { name: 'Stable Diffusion', description: 'Image generation model', img: 'https://via.placeholder.com/150' },
    { name: 'BERT', description: 'Language model for NLP tasks', img: 'https://via.placeholder.com/150' },
    { name: 'DALL-E', description: 'AI art creation', img: 'https://via.placeholder.com/150' },
];

function Home() {
    return (
        <div className="p-8">
            {/* Hero Section */}
            <section className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Welcome to RLHF Crypto</h1>
                <p className="text-lg text-gray-400">
                    Get paid to help improve AI models while using them for your daily tasks.
                </p>
                <button className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full">
                    Explore Models
                </button>
            </section>

            {/* Gallery Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Available Models</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {models.map((model, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg hover:shadow-lg transition">
                            <img src={model.img} alt={model.name} className="w-full h-40 object-cover rounded-md mb-4" />
                            <h3 className="text-xl font-semibold">{model.name}</h3>
                            <p className="text-gray-400">{model.description}</p>
                            <button className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded">
                                Try Model
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
