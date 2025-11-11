import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { getAllMenus } from "@/api/menu.api";
import DeleteMenuPopup from "./DeleteMenuPopup";
import AddMenuPopup from "./AddMenuPopup";
import EditMenuPopup from "./EditMenuPopup";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const getMenuItemsMutation = useMutation({
    mutationFn: async () => {
      const response = await getAllMenus();
      return response;
    },
    onSuccess: (data) => {
      const items = data.data.menuItems;
      setMenuItems(items);
      setFilteredItems(items);

      // Lấy danh sách category duy nhất + "All"
      const cats = Array.from(new Set(items.map((i) => i.categoryName)));
      setCategories(["All", ...cats]);
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while fetching menu items"
      );
    },
  });

  useEffect(() => {
    getMenuItemsMutation.mutate();
  }, [isUpdate]);

  // Filter menu items khi chọn category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(
        menuItems.filter((item) => item.categoryName === selectedCategory)
      );
    }
  }, [selectedCategory, menuItems]);

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
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[var(--primary)] text-black font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-md hover:shadow-[var(--primary)]/30"
        >
          <Plus className="w-4 h-4" />
          Add Menu Item
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-[var(--primary)] text-black"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/60 rounded-2xl overflow-hidden shadow-md hover:shadow-[var(--primary)]/20 transition-all duration-300"
          >
            {/* Image */}
            <div className="aspect-square relative w-full overflow-hidden bg-gray-800">
              {item.images?.[0] ? (
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 bg-transparent"
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-500" />
                </div>
              )}
              <div className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full bg-white text-green-500 border border-[var(--primary)]/30">
                Available
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-white line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1 text-[var(--primary)] font-bold text-sm">
                  € {item.price}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                  {item.categoryName}
                </span>
              </div>

              <div className="flex flex-col gap-1 text-sm text-gray-400">
                <span className="font-semibold text-gray-300">
                  Description:
                </span>
                <span className="line-clamp-2">
                  {item.description || "N/A"}
                </span>
              </div>

              <div className="flex flex-col gap-1 text-sm text-gray-400">
                <span className="font-semibold text-gray-300">
                  Ingredients:
                </span>
                <span className="line-clamp-2">
                  {item.ingredients?.join(", ") || "N/A"}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedMenu(item._id);
                    setShowEditPopup(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedMenu(item._id);
                    setShowDeletePopup(true);
                  }}
                  className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/20 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showDeletePopup && (
        <DeleteMenuPopup
          menuId={selectedMenu}
          isOpen={showDeletePopup}
          onClose={() => setShowDeletePopup(false)}
          setIsUpdate={setIsUpdate}
          isUpdate={isUpdate}
        />
      )}
      {showAddModal && (
        <AddMenuPopup
          setIsUpdate={setIsUpdate}
          isUpdate={isUpdate}
          setOpen={setShowAddModal}
        />
      )}
      {showEditPopup && (
        <EditMenuPopup
          setIsUpdate={setIsUpdate}
          isUpdate={isUpdate}
          setOpen={setShowEditPopup}
          menuId={selectedMenu}
        />
      )}
    </div>
  );
};

export default MenuManagement;
