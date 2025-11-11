import React, { useState } from "react";
import {
  X,
  Save,
  Package,
  Type,
  LucideEuro,
  FileImage,
  List,
} from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewMenu } from "@/api/menu.api";

// ✅ Schema validation với Zod
const menuSchema = z.object({
  name: z.string().trim().min(1, { message: "Menu name cannot be empty" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description cannot be empty" }),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive({ message: "Price must be greater than 0" }),
  categoryName: z
    .string()
    .trim()
    .min(1, { message: "Category name cannot be empty" }),
  ingredients: z
    .string()
    .trim()
    .min(1, { message: "Ingredients cannot be empty" }),
});

const AddMenuPopup = ({ setOpen, setIsUpdate, isUpdate }) => {
  const [images, setImages] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      categoryName: "",
      ingredients: "",
    },
  });

  // ✅ Mutation tạo menu
  const createMenuMutation = useMutation({
    mutationFn: async (data) => await createNewMenu(data),
    onSuccess: () => {
      toast.success("Menu item created successfully");
      setIsUpdate(!isUpdate);
      setOpen(false);
      reset();
      setImages([]);
    },
    onError: (err) => {
      toast.error("Create failed: " + err.message);
    },
  });

  // ✅ Submit
  const onSubmit = (data) => {
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("categoryName", data.categoryName);
    formData.append("ingredients", data.ingredients);
    images.forEach((file) => formData.append("images", file));

    createMenuMutation.mutate(formData);
  };

  // ✅ Preview ảnh
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
              <Package className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Create New Menu
            </h2>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-2 cursor-pointer hover:text-red-500 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Type className="w-4 h-4" />
              Menu Name
            </label>
            <input
              type="text"
              placeholder="Enter menu name..."
              {...register("name")}
              className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-200 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-gray-700/50 focus:border-amber-500 focus:ring-amber-500/20"
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
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
              className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-200 ${
                errors.description
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-gray-700/50 focus:border-amber-500 focus:ring-amber-500/20"
              }`}
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <LucideEuro className="w-4 h-4" />
              Price
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Enter price..."
              {...register("price", { valueAsNumber: true })}
              className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-200 ${
                errors.price
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-gray-700/50 focus:border-amber-500 focus:ring-amber-500/20"
              }`}
            />
            {errors.price && (
              <p className="text-red-400 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Category Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Package className="w-4 h-4" />
              Category Name
            </label>
            <input
              type="text"
              placeholder="Enter category name..."
              {...register("categoryName")}
              className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-200 ${
                errors.categoryName
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-gray-700/50 focus:border-amber-500 focus:ring-amber-500/20"
              }`}
            />
            {errors.categoryName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.categoryName.message}
              </p>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <List className="w-4 h-4" />
              Ingredients
            </label>
            <input
              type="text"
              placeholder="Enter ingredients (comma separated)..."
              {...register("ingredients")}
              className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-200 ${
                errors.ingredients
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-gray-700/50 focus:border-amber-500 focus:ring-amber-500/20"
              }`}
            />
            {errors.ingredients && (
              <p className="text-red-400 text-sm mt-1">
                {errors.ingredients.message}
              </p>
            )}
          </div>

          {/* Images */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <FileImage className="w-4 h-4" />
              Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-gray-300 cursor-pointer bg-gray-800/50 border border-gray-700/50 rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500/20 file:text-amber-400 hover:file:bg-amber-500/30 transition-all duration-200"
            />
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
              disabled={createMenuMutation.isPending}
              className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-amber-500/25"
            >
              <Save className="w-4 h-4" />
              Save Menu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuPopup;
