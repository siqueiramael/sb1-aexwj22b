import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../contexts/UserContext';

const Header: React.FC = () => {
  const { logout } = useAuth();
  const { user } = useUser();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">UniFi Hotspot Portal</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{user?.name}</span>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};