import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const Sidebar: React.FC = () => {
  const { user } = useUser();

  return (
    <aside className="w-64 bg-gray-800 min-h-screen p-4">
      <nav className="space-y-2">
        <Link
          to="/dashboard"
          className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded"
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded"
        >
          Profile
        </Link>
        {user?.role === 'ADMIN' && (
          <>
            <Link
              to="/admin/users"
              className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded"
            >
              Users
            </Link>
            <Link
              to="/admin/sites"
              className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded"
            >
              Sites
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
};