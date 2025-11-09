import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardOverview from "./components/DashboardOverview";
import CategoriesManagement from "./components/CategoriesManagement";
import MenuManagement from "./components/MenuManagement";
import ReservationsManagement from "./components/ReservationsManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "categories":
        return <CategoriesManagement />;
      case "menu":
        return <MenuManagement />;
      case "reservations":
        return <ReservationsManagement />;
      case "users":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-4">
              Users Management
            </h1>
            <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
              <p className="text-gray-400">
                Users management component coming soon...
              </p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-4">Settings</h1>
            <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
              <p className="text-gray-400">Settings component coming soon...</p>
            </div>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-950">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
