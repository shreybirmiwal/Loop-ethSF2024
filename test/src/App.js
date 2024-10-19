import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import Home from './pages/Home';
// import UploadModel from './pages/UploadModel';
// import ModelPage from './pages/ModelPage';
// import LoginPage from './pages/LoginPage';
import PrivyAuthButton from './pages/PrivyAuthButton';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-800">
        <nav className="p-6 border-b border-gray-300 flex justify-between items-center">
          {/* Logo on Left */}
          <div className="flex items-center">
            <img src="[LOGO_IMAGE_URL]" alt="Logo" className="h-8 w-8 mr-2" /> {/* Replace with your logo image */}
            <h1 className="text-2xl font-semibold text-indigo-600">Flex</h1> {/* Insert your brand name */}
          </div>

          {/* Links in Middle with Space Between */}
          <div className="flex items-center space-x-8"> {/* space-x-8 adds space between links */}
            <Link to="/" className="text-lg hover:text-indigo-500">Home</Link>
            <Link to="/upload" className="text-lg hover:text-indigo-500">Upload Model</Link>
            {/* Add more links here if needed, they will automatically space out */}
          </div>

          {/* Wallet on Right */}
          <div className="flex items-center justify-end">
            <PrivyAuthButton className="ml-auto" /> {/* ml-auto pushes the button to the right */}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/upload" element={<UploadModel />} /> */}
          {/* <Route
            path="/model/:modelName"
            element={<ModelPage />}
          /> */}


        </Routes>
      </div>
    </Router>
  );
}

export default App;




