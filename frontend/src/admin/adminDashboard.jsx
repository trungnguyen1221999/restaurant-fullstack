import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardOverview from "./components/DashboardOverview";
import CategoriesManagement from "./components/CategoriesManagement";
import MenuManagement from "./components/MenuManagement";
import ReservationsManagement from "./components/ReservationsManagement";
import { Heart } from "lucide-react";

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
    <div className="flex flex-col h-screen bg-gray-950">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="flex-1 overflow-auto min-h-screen pb-6">
          {renderContent()}
        </div>
      </div>

      {/* Bottom Footer */}
      <footer className="border-t border-primary/20 pt-4 flex flex-col md:flex-row justify-between items-center gap-4 px-6 mb-4">
        <div className="flex items-center gap-2 text-white/60">
          <span>© 2025 KAI Restaurant. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-2 text-white/60">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
          <span>by</span>
          <a
            href="https://github.com/trungnguyen1221999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
          >
            Kai - Trung Nguyen
          </a>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
