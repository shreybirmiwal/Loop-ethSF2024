import React from 'react';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import { abi } from './abi.js'
import { useEffect, useState } from 'react';



function Home() {
    const web3 = new Web3('hhttps://rpc-amoy.polygon.technology/');
    const contractCode = new web3.eth.Contract(abi, "0x7a722C4C585F17B237DD2C57dD46677c7D348420");



    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();



    }, []);

    const fetchProjects = async () => {


        const projects = await contractCode.methods.getProjects().call();

        setProjects(projects);

        console.log(projects);

    };

    const handleProjectClick = (projectId) => {
        navigate(`/project/${projectId}`);
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
                <h2 className="text-3xl font-bold mb-6">Available Projects</h2>
                <div className="space-y-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                            onClick={() => handleProjectClick(project.id)}
                        >
                            <h3 className="text-xl font-semibold text-indigo-600 mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-2">{project.description}</p>
                            <p className="text-sm text-gray-500">Bounty: {project.bounty} ETH</p>
                            <p className="text-sm text-gray-500">Bounty Pool: {project.bountyPool} ETH</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;

