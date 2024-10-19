import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import Home from './pages/Home';
import UploadModel from './pages/UploadModel';
import ModelPage from './pages/ModelPage';

function App() {
  const { authenticated } = usePrivy();

  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-800">
        <nav className="p-6 border-b border-gray-300 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-indigo-600">RLHF Crypto</h1>
          <div className="space-x-6">
            <Link to="/" className="text-lg hover:text-indigo-500">Home</Link>
            <Link to="/upload" className="text-lg hover:text-indigo-500">Upload Model</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadModel />} />
          <Route
            path="/model/:modelName"
            element={authenticated ? <ModelPage /> : <Navigate to="/login" />}
          />        </Routes>
      </div>
    </Router>
  );
}

export default App;

