import React, { useEffect, useState } from "react";
import { X, Save, Package, Type, List, Euro } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { editMenuById, getMenuById } from "@/api/menu.api";

// Zod schema
const menuSchema = z.object({
  name: z.string().min(1, "Menu name is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
      message: "Price must be a positive number",
    }),
  categoryName: z.string().min(1, "Category is required"),
  ingredients: z.string().min(1, "Ingredients are required"),
});

const EditMenuPopup = ({ setOpen, menuId, setIsUpdate, isUpdate }) => {
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      categoryName: "",
      ingredients: "",
    },
  });

  const [originalData, setOriginalData] = useState({});

  // Get menu details
  const getMenuMutation = useMutation({
    mutationFn: async () => await getMenuById(menuId),
    onSuccess: (data) => {
      reset({
        name: data.data.menuItem.name,
        description: data.data.menuItem.description,
        price: data.data.menuItem.price.toString(), // convert to string
        categoryName: data.data.menuItem.categoryName,
        ingredients: data.data.menuItem.ingredients.join(", "),
      });
      setOriginalData(data.data.menuItem);
    },
    onError: (err) => {
      toast.error("Failed to fetch menu details: " + err.message);
    },
  });

  useEffect(() => {
    if (!menuId) return;
    getMenuMutation.mutate();
  }, [menuId]);

  // Update menu mutation
  const updateMenuMutation = useMutation({
    mutationFn: async (values) => {
      const payload = {
        ...values,
        price: parseFloat(values.price),
        ingredients: values.ingredients.split(",").map((i) => i.trim()),
      };
      return await editMenuById(menuId, payload);
    },
    onSuccess: () => {
      toast.success("Menu updated successfully");
      setIsUpdate(!isUpdate);
      setOpen(false);
    },
    onError: (err) => {
      toast.error("Update failed: " + err.message);
    },
  });

  const onSubmit = (values) => {
    const ingredientsArr = values.ingredients.split(",").map((i) => i.trim());
    if (
      values.name === originalData.name &&
      values.description === originalData.description &&
      parseFloat(values.price) === originalData.price &&
      values.categoryName === originalData.categoryName &&
      JSON.stringify(ingredientsArr) ===
        JSON.stringify(originalData.ingredients)
    ) {
      toast("Nothing changed");
      setOpen(false);
      return;
    }
    updateMenuMutation.mutate(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setOpen(false)}
      />
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
              <Package className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Edit Menu</h2>
              <p className="text-sm text-gray-400">
                Update menu item information
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 cursor-pointer hover:text-red-500 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Menu Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Type className="w-4 h-4" />
              Menu Name
            </label>
            <input
              type="text"
              placeholder="Enter menu name..."
              {...register("name")}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
            />
            {formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <List className="w-4 h-4" />
              Description
            </label>
            <textarea
              placeholder="Enter description..."
              {...register("description")}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
            />
            {formState.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.description.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Euro className="w-4 h-4" />
              Price
            </label>
            <input
              type="text"
              placeholder="Enter price..."
              {...register("price")}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
            />
            {formState.errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.price.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Package className="w-4 h-4" />
              Category
            </label>
            <input
              type="text"
              placeholder="Enter category..."
              {...register("categoryName")}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
            />
            {formState.errors.categoryName && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.categoryName.message}
              </p>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <List className="w-4 h-4" />
              Ingredients (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g., chicken, rice, soy sauce"
              {...register("ingredients")}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
            />
            {formState.errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.ingredients.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="cursor-pointer flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-300 font-medium hover:bg-gray-600/50 hover:text-white transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMenuMutation.isPending}
              className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-amber-500/25"
            >
              <Save className="w-4 h-4" />
              Save Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuPopup;
