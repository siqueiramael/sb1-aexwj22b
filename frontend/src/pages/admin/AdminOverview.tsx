import React from 'react';
import { Users, Wifi, Server, Activity } from 'lucide-react';

const AdminOverview: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Total Users</h3>
            <Users className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">1,234</p>
          <p className="text-sm text-gray-500">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Active Sessions</h3>
            <Activity className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-2xl font-bold">856</p>
          <p className="text-sm text-gray-500">Current active users</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Access Points</h3>
            <Wifi className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-2xl font-bold">42</p>
          <p className="text-sm text-gray-500">Across all sites</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Sites</h3>
            <Server className="h-6 w-6 text-orange-500" />
          </div>
          <p className="text-2xl font-bold">8</p>
          <p className="text-sm text-gray-500">Active locations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">User Registration</p>
                  <p className="text-sm text-gray-500">New user registered from Site A</p>
                </div>
                <span className="text-sm text-gray-500">2 min ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Database Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">UniFi Controller</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">API Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Last Backup</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;