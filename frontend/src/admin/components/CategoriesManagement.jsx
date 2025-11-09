import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import toast from "react-hot-toast";
import { getAllCategories } from "@/api/category.api";
import { useMutation } from "@tanstack/react-query";
import { formatDate } from "./../../utils/dateUtils";
import EditCategoryPopup from "./EditCategoryPopup";

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
  const categoryMutation = useMutation({
    mutationFn: async () => await getAllCategories(),
    onError: (error) => {
      toast.error("Failed to fetch categories: " + error.message);
    },
    onSuccess: (data) => {
      setCategories(data.data.categories);
    },
  });

  useEffect(() => {
    categoryMutation.mutate();
  }, [isUpdate]);

  return (
    <div className="space-y-6 p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Category Management</h1>
          <p className="text-gray-400 mt-1">
            Organize and manage your menu categories
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold rounded-xl hover:from-amber-500 hover:to-amber-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-amber-500/25"
        >
          <Plus className="w-5 h-5" />
          Add New Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories &&
          categories.map((category) => {
            return (
              <div
                key={category._id}
                className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-6 hover:from-gray-700/80 hover:to-gray-800/80 hover:border-amber-500/50 transition-all duration-300 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transform hover:-translate-y-1"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Category Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors duration-200">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  {/* Actions Menu */}
                  <div className="relative group/menu">
                    <div className="cursor-pointer p-2 text-white hover:bg-gray-700/50 rounded-lg">
                      <MoreVertical className="w-4 h-4" />
                    </div>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-10 w-40 bg-gray-800/95 border border-gray-700/50 rounded-xl shadow-2xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-20 backdrop-blur-md">
                      <div
                        onClick={() => setShowEditPopup(true)}
                        className="cursor-pointer w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
                      >
                        <Edit className="w-3 h-3" />
                        Edit Category
                      </div>
                      <div className="cursor-pointer w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors rounded-b-xl">
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  Created at: {formatDate(category.createdAt)}
                </p>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  Updated at: {formatDate(category.updatedAt)}
                </p>
              </div>
            );
          })}
      </div>
      {showEditPopup && <EditCategoryPopup  setOpen={setShowEditPopup} />}
    </div>
  );
};

export default CategoriesManagement;
