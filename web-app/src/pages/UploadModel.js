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
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Upload Your Model</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Model Name</label>
                    <input
                        type="text"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Hugging Face Model URL</label>
                    <input
                        type="url"
                        value={modelURL}
                        onChange={(e) => setModelURL(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <button type="submit" className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded">
                    Upload Model
                </button>
            </form>
        </div>
    );
}

export default UploadModel;
