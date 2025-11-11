import React from "react";
import { Save } from "lucide-react";

const ActionButtons = ({ onCancel, isLoading }) => (
  <div className="flex gap-3 pt-4">
    <button
      type="button"
      onClick={onCancel}
      className="cursor-pointer flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-300 font-medium hover:bg-gray-600/50 hover:text-white transition-all duration-200"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isLoading}
      className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-amber-500/25"
    >
      <Save className="w-4 h-4" /> Save Change
    </button>
  </div>
);

export default ActionButtons;
