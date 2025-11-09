import React, { useState, useEffect, useRef } from "react";
import { X, Save, Package, Type, FileText } from "lucide-react";
import toast from "react-hot-toast";



const EditCategoryPopup = ({setOpen}) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" />

            {/* Modal */}
            <div
                className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200"
            >
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
                        className="p-2 text-black hover:text-red-500 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form className="p-6 space-y-6">
                    {/* Category Name */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                            <Type className="w-4 h-4" />
                            Category Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter category name..."
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
                            required
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
            
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-amber-500/25"
                        >
        
                            <>
                                <Save className="w-4 h-4" />
                                Save Changes
                            </>
         
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCategoryPopup;
