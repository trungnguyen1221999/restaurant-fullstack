import React, { useState } from "react";
import {
  LayoutDashboard,
  Tags,
  UtensilsCrossed,
  Calendar,
  LogOut,
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false); // state mobile toggle

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "categories", label: "Categories", icon: Tags },
    { id: "menu", label: "Menu Items", icon: UtensilsCrossed },
    { id: "reservations", label: "Reservations", icon: Calendar },
  ];

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-900 to-black border-r border-amber-500/20 shadow-2xl transform transition-transform duration-300
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-amber-500/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                Admin Panel
              </h2>
            </div>
          </div>
          <p className="text-sm text-gray-400 ml-13">
            Restaurant Management System
          </p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false); // đóng sidebar mobile khi chọn
                }}
                className={`group relative w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-500/10"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 hover:text-white hover:border hover:border-gray-600/50"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-r"></div>
                )}

                <div
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-gray-800/50 text-gray-400 group-hover:bg-gray-700/50 group-hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-medium">{item.label}</span>

                <div
                  className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500/5 to-amber-600/5"
                      : "bg-gradient-to-r from-gray-500/0 to-gray-600/0 group-hover:from-gray-500/5 group-hover:to-gray-600/5"
                  }`}
                ></div>
              </div>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-black">K</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-sm font-bold text-gray-400">kainguyen</p>
            </div>
          </div>

          {/* Logout Button */}
          <div
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gradient-to-r hover:from-red-600/20 hover:to-red-700/20 hover:text-red-400 hover:border hover:border-red-500/30 transition-all duration-300 cursor-pointer group"
          >
            <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-red-600/20 transition-all duration-300">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="font-medium">Logout</span>
          </div>
        </div>
      </div>

      {/* Overlay khi sidebar mở mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
