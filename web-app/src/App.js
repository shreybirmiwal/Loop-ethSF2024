import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import UploadModel from './pages/UploadModel';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <nav className="p-6 bg-gray-800 flex justify-between">
          <h1 className="text-xl font-bold">RLHF Crypto</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:text-gray-400">Home</Link>
            <Link to="/upload" className="hover:text-gray-400">Upload Model</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadModel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
