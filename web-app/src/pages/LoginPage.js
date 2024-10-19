import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const { login } = usePrivy();
    const navigate = useNavigate();

    const handleLogin = async () => {
        await login();
        navigate('/'); // Redirect to homepage after login
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <button
                onClick={handleLogin}
                className="px-8 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
                Log in with Privy Wallet
            </button>
        </div>
    );
}

export default LoginPage;
