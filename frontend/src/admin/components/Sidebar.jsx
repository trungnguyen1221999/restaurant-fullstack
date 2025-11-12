import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Calendar,
  Menu,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
      end: true,
    },
    {
      name: "Reservations",
      icon: Calendar,
      path: "/admin/dashboard/reservations",
    },
    { name: "Menu", icon: UtensilsCrossed, path: "/admin/dashboard/menu" },
    { name: "Categories", icon: Menu, path: "/admin/dashboard/categories" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-950 to-gray-900 border-r border-gray-800 flex flex-col shadow-lg">
      {/* Logo / Header */}
      <div className="flex items-center justify-center h-20 border-b border-gray-800">
        <span className="text-2xl font-extrabold tracking-wide text-white">
          KAI<span className="text-amber-400">Admin</span>
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end} // ✅ chỉ active khi path exact match
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-sm"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-300
                   ${
                     window.location.pathname === item.path
                       ? "bg-amber-500/30 text-amber-400"
                       : "text-gray-400 group-hover:text-amber-300"
                   }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="px-4 pb-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:text-white hover:bg-red-500 border border-transparent hover:border-red-500/30 transition-all duration-300"
        >
          <LogOut className="w-5 h-5 text-black" />
          <span>Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        v1.0 • <span className="text-amber-400">KAI System</span>
      </div>
    </aside>
  );
};

export default Sidebar;
