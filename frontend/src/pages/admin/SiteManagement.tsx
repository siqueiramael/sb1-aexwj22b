import React, { useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';

const SiteManagement: React.FC = () => {
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    try {
      // Add API call to sync sites with UniFi Controller
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Site Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
            Sync with Controller
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Site
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">Site {i}</h3>
                <p className="text-sm text-gray-500">Location {i}</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Active
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Access Points</span>
                <span className="text-sm font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Active Users</span>
                <span className="text-sm font-medium">145</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Last Sync</span>
                <span className="text-sm font-medium">5 min ago</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700">
                Configure
              </button>
              <button className="px-3 py-1 text-sm text-red-600 hover:text-red-700">
                Disable
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteManagement;