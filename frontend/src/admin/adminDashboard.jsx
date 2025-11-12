import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Heart, Menu, X } from "lucide-react";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950">
      {/* Header (Mobile) */}
      <div className="flex items-center justify-between bg-gray-900 text-white p-4 md:hidden">
        <h1 className="text-lg font-bold">Admin Panel</h1>
        <button onClick={toggleSidebar} className="p-2 rounded-md bg-gray-800">
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 md:relative md:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>

        {/* Overlay khi sidebar mở trên mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Nội dung của route con */}
        <div className="flex-1 overflow-auto min-h-screen pb-6">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
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

export default AdminLayout;
