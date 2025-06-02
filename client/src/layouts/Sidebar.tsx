import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl mb-4">Sidebar</h2>
      <ul>
        <li className="mb-2">Dashboard</li>
        <li className="mb-2">Reports</li>
        <li className="mb-2">Users</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
