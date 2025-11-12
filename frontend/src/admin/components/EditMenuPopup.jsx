import React, { useEffect, useState } from "react";
import { X, Package, Type, List, Euro } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { editMenuById, getMenuById } from "@/api/menu.api";
import ImageUploader from "./editMenuPopUpComponents/ImageUploader";
import TextInput from "./editMenuPopUpComponents/TextInput";
import ActionButtons from "./editMenuPopUpComponents/ActionButtons";

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
  images: z.any().optional(),
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
      images: [],
    },
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [originalImages, setOriginalImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  const getMenuMutation = useMutation({
    mutationFn: async () => await getMenuById(menuId),
    onSuccess: (data) => {
      const menu = data.data.menuItem;
      reset({
        name: menu.name,
        description: menu.description,
        price: menu.price.toString(),
        categoryName: menu.categoryName,
        ingredients: menu.ingredients.join(", "),
        images: [],
      });
      setOriginalImages(menu.images || []);
      setDeletedImages([]);
      setImageFiles([]);
    },
    onError: (err) => toast.error("Failed to fetch menu details: " + err.message),
  });

  useEffect(() => {
    if (!menuId) return;
    getMenuMutation.mutate();
  }, [menuId]);

  const updateMenuMutation = useMutation({
    mutationFn: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", parseFloat(values.price));
      formData.append("categoryName", values.categoryName);
      formData.append(
        "ingredients",
        values.ingredients.split(",").map((i) => i.trim())
      );

      // Thêm ảnh mới
      imageFiles.forEach((file) => formData.append("images", file));

      // Gửi danh sách ảnh bị xóa
      formData.append("deletedImages", JSON.stringify(deletedImages));

      return await editMenuById(menuId, formData);
    },
    onSuccess: () => {
      toast.success("Menu updated successfully");
      setIsUpdate(!isUpdate);
      setOpen(false);
    },
    onError: (err) => toast.error("Update failed: " + err.message),
  });

  const onSubmit = (values) => updateMenuMutation.mutate(values);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center max-h-screen overflow-auto">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setOpen(false)}
      />
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-4xl mx-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
              <Package className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Edit Menu</h2>
              <p className="text-sm text-gray-400">Update menu item information</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 cursor-pointer hover:text-red-500 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 w-full md:w-1/2">
              <ImageUploader
                originalImages={originalImages}
                imageFiles={imageFiles}
                setOriginalImages={setOriginalImages}
                setImageFiles={setImageFiles}
                deletedImages={deletedImages}
                setDeletedImages={setDeletedImages}
              />
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <TextInput label="Menu Name" icon={Type} {...register("name")} error={formState.errors.name} />
              <TextInput label="Description" icon={List} type="textarea" {...register("description")} error={formState.errors.description} />
              <TextInput label="Price" icon={Euro} {...register("price")} error={formState.errors.price} />
              <TextInput label="Category" icon={Package} {...register("categoryName")} error={formState.errors.categoryName} />
              <TextInput label="Ingredients (comma separated)" icon={List} {...register("ingredients")} error={formState.errors.ingredients} />
              <ActionButtons onCancel={() => setOpen(false)} isLoading={updateMenuMutation.isPending} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuPopup;
