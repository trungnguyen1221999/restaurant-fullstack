import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreVertical,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Appetizers",
      description: "Small dishes served before the main course",
      itemCount: 12,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Main Courses",
      description: "Primary dishes of the meal",
      itemCount: 25,
      status: "active",
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      name: "Desserts",
      description: "Sweet dishes served at the end of the meal",
      itemCount: 8,
      status: "active",
      createdAt: "2024-01-12",
    },
    {
      id: 4,
      name: "Beverages",
      description: "Drinks and liquid refreshments",
      itemCount: 15,
      status: "inactive",
      createdAt: "2024-01-08",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
      toast.success("Category deleted successfully!");
    }
  };

  const handleStatusToggle = (id) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id
          ? { ...cat, status: cat.status === "active" ? "inactive" : "active" }
          : cat
      )
    );
    toast.success("Category status updated!");
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Categories Management
          </h1>
          <p className="text-gray-400">Manage your menu categories</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-black font-semibold rounded-xl hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 hover:bg-gray-700 transition-all duration-200">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:bg-gray-700 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {category.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      category.status === "active"
                        ? "bg-green-400/10 text-green-400"
                        : "bg-red-400/10 text-red-400"
                    }`}
                  >
                    {category.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  {category.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{category.itemCount} items</span>
                  <span>
                    Created: {new Date(category.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="relative group">
                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-8 w-32 bg-black border border-white/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleStatusToggle(category.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <Filter className="w-3 h-3" />
                    {category.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors rounded-b-lg"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setEditingCategory(category)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                <Edit className="w-3 h-3" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-all duration-200"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No categories found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search terms or add a new category.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoriesManagement;
