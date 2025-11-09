import React from "react";
import {
  LayoutDashboard,
  Tags,
  UtensilsCrossed,
  Calendar,
  LogOut,
  Settings,
  Users,
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "categories",
      label: "Categories",
      icon: Tags,
    },
    {
      id: "menu",
      label: "Menu Items",
      icon: UtensilsCrossed,
    },
    {
      id: "reservations",
      label: "Reservations",
      icon: Calendar,
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    // Implement logout logic
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
  };

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Admin Panel</h2>
        <p className="text-sm text-gray-300 mt-1">Restaurant Management</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-primary text-black font-semibold"
                  : "text-gray-200 hover:bg-gray-800 hover:text-white "
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <div
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 hover:bg-red-600 hover:text-white transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
