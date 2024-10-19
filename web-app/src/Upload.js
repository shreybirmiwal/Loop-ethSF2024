// src/Upload.js
import React, { useState } from "react";

function Upload() {
    const [modelLink, setModelLink] = useState("");
    const [uploadedModels, setUploadedModels] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modelLink.trim()) {
            setUploadedModels([...uploadedModels, modelLink]);
            setModelLink("");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold mb-6">Upload a Model</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <input
                    type="text"
                    value={modelLink}
                    onChange={(e) => setModelLink(e.target.value)}
                    placeholder="Enter Hugging Face repo link..."
                    className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 w-80"
                />
                <button
                    type="submit"
                    className="bg-accent px-6 py-2 rounded-md hover:bg-blue-500 transition"
                >
                    Upload
                </button>
            </form>

            <div className="mt-10 w-80">
                <h2 className="text-xl font-semibold mb-4">Uploaded Models:</h2>
                <ul className="space-y-2">
                    {uploadedModels.map((model, index) => (
                        <li key={index} className="bg-gray-800 p-4 rounded-lg">
                            {model}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Upload;
