import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Image as ImageIcon,
  DollarSign,
} from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { getAllMenus } from "@/api/menu.api";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getMenuItemsMutation = useMutation({
    mutationFn: async () => {
      const response = await getAllMenus();
      return response;
    },
    onSuccess: (data) => {
      setMenuItems(data.data.menuItems);
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while fetching menu items"
      );
    },
  });

  useEffect(() => {
    getMenuItemsMutation.mutate();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(menuItems.filter((item) => item.id !== id));
      toast.success("Menu item deleted successfully!");
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Menu Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your restaurant menu items effortlessly
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-[var(--primary)] text-black font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-md hover:shadow-[var(--primary)]/30">
          <Plus className="w-4 h-4" />
          Add Menu Item
        </button>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-5 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/60 rounded-2xl overflow-hidden shadow-md hover:shadow-[var(--primary)]/20 transition-all duration-300"
          >
            {/* Image (vuông) */}
            <div className="aspect-square relative w-full overflow-hidden bg-gray-800">
              {item.images?.[0] ? (
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-500" />
                </div>
              )}
              <div className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30">
                {item.status || "Available"}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="text-base font-semibold text-white line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1 text-[var(--primary)] font-bold text-sm">
                  € {item.price}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                  {item.category}
                </span>
              </div>

              <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                {item.description || "No description available."}
              </p>

              <div className="flex items-start gap-1 text-xs text-gray-400">
                <span className="font-semibold text-gray-300">
                  Ingredients:
                </span>
                <span className="line-clamp-2">
                  {item.ingredients?.join(", ") || "N/A"}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/20 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {menuItems.length === 0 && (
        <div className="text-center py-16 opacity-80">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            No menu items found
          </h3>
          <p className="text-gray-400 text-sm">
            Try adding new dishes to your restaurant menu.
          </p>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
