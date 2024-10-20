import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

const PrivyAuthButton = () => {
    const { ready, authenticated, user, login, logout } = usePrivy();

    if (!ready) {
        return <div>Loading...</div>;
    }

    if (authenticated && user) {
        const address = user.wallet.address;
        const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
        return (
            <div className="flex items-center">
                <span className="mr-2">{shortAddress}</span>
                <button
                    onClick={logout}
                    className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={login}
            className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
        >
            Login
        </button>
    );
};

export default PrivyAuthButton;