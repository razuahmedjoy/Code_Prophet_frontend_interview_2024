import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = ({ isSidebarOpen }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 md:relative md:translate-x-0`}
    >
      <div className="p-4 bg-teal-600 text-white text-xl font-bold">
        Admin Dashboard
      </div>
      <nav className="p-4 space-y-4">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `block font-medium p-2 rounded ${
              isActive ? 'text-teal-600 bg-gray-100' : 'text-gray-700 hover:text-cyan-600'
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `block font-medium p-2 rounded ${
              isActive ? 'text-teal-600 bg-gray-100' : 'text-gray-700 hover:text-cyan-600'
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `block font-medium p-2 rounded ${
              isActive ? 'text-teal-600 bg-gray-100' : 'text-gray-700 hover:text-cyan-600'
            }`
          }
        >
          Orders
        </NavLink>

      </nav>
    </aside>
  );
};

export default AdminSidebar;
