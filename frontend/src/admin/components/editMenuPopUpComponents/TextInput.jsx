import React from "react";

const TextInput = ({ label, icon: Icon, error, type = "text", ...rest }) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
      {Icon && <Icon className="w-4 h-4" />} {label}
    </label>
    {type === "textarea" ? (
      <textarea
        {...rest}
        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
      />
    ) : (
      <input
        type={type}
        {...rest}
        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
      />
    )}
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default TextInput;
