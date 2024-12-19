import React from 'react';
import { Layout } from '../components/Layout';
import { useUser } from '../contexts/UserContext';
import { Wifi, Signal, Clock } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user } = useUser();

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Welcome, {user?.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Connection Status</h3>
              <Wifi className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-green-600 font-semibold">Connected</p>
            <p className="text-sm text-gray-500">Last connected: 2 minutes ago</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Signal Strength</h3>
              <Signal className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-blue-600 font-semibold">Excellent</p>
            <p className="text-sm text-gray-500">-65 dBm</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Session Time</h3>
              <Clock className="h-6 w-6 text-purple-500" />
            </div>
            <p className="text-purple-600 font-semibold">2h 15m</p>
            <p className="text-sm text-gray-500">Started at 14:30</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Connection History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Used
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Sample data - replace with real data */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2024-03-15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1h 30m
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    250 MB
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    iPhone 13
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};