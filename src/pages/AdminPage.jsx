import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import AdminPanel from '../components/admin/AdminPanel';

/**
 * AdminPage - Protected admin route wrapper
 */
const AdminPage = () => {
  return (
    <AuthProvider>
      <AdminPanel />
    </AuthProvider>
  );
};

export default AdminPage;
