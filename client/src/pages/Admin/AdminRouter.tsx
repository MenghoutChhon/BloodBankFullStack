import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';      
import AdminDashboard from './AdminDashboard';
import Users from './Users';
import Reports from './Reports';
import DonorManagement from './DonorManagement';
import HospitalManagement from './HospitalManagement';
import InventoryManagement from './InventoryManagement';
import RequestManagement from './RequestManagement';

const AdminRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<AdminLayout />}>
      {/* Default route (index) is dashboard */}
      <Route index element={<AdminDashboard />} />

      {/* Direct subpages */}
      <Route path="users" element={<Users />} />
      <Route path="reports" element={<Reports />} />
      <Route path="donors" element={<DonorManagement />} />
      <Route path="hospitals" element={<HospitalManagement />} />
      <Route path="inventory" element={<InventoryManagement />} />
      <Route path="requests" element={<RequestManagement />} />

      {/* Fallback: unknown subroutes redirect to dashboard */}
      <Route path="*" element={<Navigate to="/admin" />} />
    </Route>
  </Routes>
);

export default AdminRouter;
