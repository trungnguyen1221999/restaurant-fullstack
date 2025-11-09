import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Image as ImageIcon,
  DollarSign,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Grilled Salmon",
      category: "Main Courses",
      price: 28.99,
      description: "Fresh Atlantic salmon grilled to perfection with herbs",
      image: "/api/placeholder/300/200",
      status: "available",
      cookTime: "15 mins",
      ingredients: ["Salmon", "Herbs", "Lemon", "Olive Oil"],
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Caesar Salad",
      category: "Appetizers",
      price: 12.99,
      description: "Crisp romaine lettuce with parmesan and croutons",
      image: "/api/placeholder/300/200",
      status: "available",
      cookTime: "5 mins",
      ingredients: ["Romaine", "Parmesan", "Croutons", "Caesar Dressing"],
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      name: "Chocolate Cake",
      category: "Desserts",
      price: 8.99,
      description: "Rich chocolate cake with vanilla cream",
      image: "/api/placeholder/300/200",
      status: "unavailable",
      cookTime: "10 mins",
      ingredients: ["Chocolate", "Flour", "Eggs", "Vanilla"],
      createdAt: "2024-01-13",
    },
    {
      id: 4,
      name: "Fresh Orange Juice",
      category: "Beverages",
      price: 4.99,
      description: "Freshly squeezed orange juice",
      image: "/api/placeholder/300/200",
      status: "available",
      cookTime: "2 mins",
      ingredients: ["Fresh Oranges"],
      createdAt: "2024-01-12",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "Appetizers",
    "Main Courses",
    "Desserts",
    "Beverages",
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(menuItems.filter((item) => item.id !== id));
      toast.success("Menu item deleted successfully!");
    }
  };

  const handleStatusToggle = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "available" ? "unavailable" : "available",
            }
          : item
      )
    );
    toast.success("Menu item status updated!");
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Menu Management
          </h1>
          <p className="text-gray-400">Manage your restaurant menu items</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-black font-semibold rounded-xl hover:scale-105 transition-all duration-200">
          <Plus className="w-4 h-4" />
          Add Menu Item
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-black">
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-200"
          >
            {/* Image */}
            <div className="relative h-48 bg-gray-800 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-600" />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === "available"
                      ? "bg-green-400/10 text-green-400"
                      : "bg-red-400/10 text-red-400"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-3">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[var(--primary)] font-bold">
                    <DollarSign className="w-4 h-4" />
                    {item.price}
                  </div>
                </div>
                <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.cookTime}
                </div>
                <span>•</span>
                <span>{item.ingredients.length} ingredients</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200">
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleStatusToggle(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    item.status === "available"
                      ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                      : "bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20"
                  }`}
                >
                  {item.status === "available" ? "Disable" : "Enable"}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-all duration-200"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No menu items found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search terms or add a new menu item.
          </p>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
