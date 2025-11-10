import React, { useEffect, useState } from "react";
import { X, Save, Package, Type } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { editCategory, getCategoryById } from "@/api/category.api";



const EditCategoryPopup = ({ setOpen, categoryId, setIsUpdate, isUpdate }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
        },
    });
    // Get category details
    const getCategoryMutation = useMutation({
        mutationFn: async () => await getCategoryById(categoryId),
        onSuccess: (data) => {
            console.log(data)
            reset({ name: data.data.category.name });
        },
        onError: (err) => {
            toast.error("Failed to fetch category details: " + err.message);
        },
    });

    // Update category mutation
    const updateCategoryMutation = useMutation({
        mutationFn: async (name) => await editCategory(categoryId, name),
        onSuccess: () => {
            toast.success("Updated successfully");
            setIsUpdate(!isUpdate);
            setOpen(false);
        },
        onError: (err) => {
            toast.error("Update failed: " + err.message);
        },
    });

    useEffect(() => {
        getCategoryMutation.mutate();
    }, []);

    const onSubmit = (values) => {
        updateCategoryMutation.mutate(values);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" />

            {/* Modal */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
                            <Package className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                Edit Category
                            </h2>
                            <p className="text-sm text-gray-400">
                                Update category information
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 hover:text-red-500 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {/* Category Name */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                            <Type className="w-4 h-4" />
                            Category Name
                        </label>
                        <input
                            type="text"
                        
                            placeholder="Enter category name..."
                            {...register("name", { required: true })}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-300 font-medium hover:bg-gray-600/50 hover:text-white transition-all duration-200"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={updateCategoryMutation.isPending}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-amber-500/25"
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCategoryPopup;
