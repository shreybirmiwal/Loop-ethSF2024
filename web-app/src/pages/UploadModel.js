import React, { useState } from 'react';

function UploadModel() {
    const [modelName, setModelName] = useState('');
    const [modelURL, setModelURL] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Model Uploaded:', { modelName, modelURL });
        alert('Model uploaded successfully!');
        setModelName('');
        setModelURL('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">Upload Your Model</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 mb-1">Model Name</label>
                        <input
                            type="text"
                            value={modelName}
                            onChange={(e) => setModelName(e.target.value)}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">Hugging Face Model URL</label>
                        <input
                            type="url"
                            value={modelURL}
                            onChange={(e) => setModelURL(e.target.value)}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-3 rounded hover:bg-indigo-600"
                    >
                        Upload Model
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UploadModel;
