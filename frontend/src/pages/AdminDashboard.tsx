import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import UserManagement from './admin/UserManagement';
import SiteManagement from './admin/SiteManagement';
import SystemSettings from './admin/SystemSettings';
import AdminOverview from './admin/AdminOverview';

const AdminDashboard: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/sites" element={<SiteManagement />} />
        <Route path="/settings" element={<SystemSettings />} />
      </Routes>
    </Layout>
  );
}

export default AdminDashboard;