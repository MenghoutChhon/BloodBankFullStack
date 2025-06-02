// src/pages/Admin/AdminLayout.tsx
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './AdminLayout.css';

// Sidebar menu configuration
const menu = [
  { to: "/admin", icon: "🏠", label: "Dashboard", end: true },
  { to: "/admin/donors", icon: "🩸", label: "Donors" },
  { to: "/admin/hospitals", icon: "🏥", label: "Hospitals" },
  { to: "/admin/inventory", icon: "🧃", label: "Inventory" },
  { to: "/admin/requests", icon: "📋", label: "Requests" },
  { to: "/admin/users", icon: "👤", label: "Users" },
  { to: "/admin/reports", icon: "📊", label: "Reports" },
];

const AdminLayout: React.FC = () => (
  <div className="admin-layout">
    {/* Sidebar */}
    <aside className="admin-sidebar">
      <div className="admin-logo">🩸 Admin Panel</div>
      <nav>
        <ul>
          {menu.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}
                end={item.end || undefined}
              >
                <span className="icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* Optionally add user info and logout here */}
      {/* <div className="admin-user">Welcome, Admin <button onClick={logout}>Logout</button></div> */}
    </aside>
    {/* Main Content */}
    <main className="admin-main">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
