import React, { useState } from "react";
import { Search, X } from "lucide-react";

const MenuSearch = ({ onSearch, placeholder = "Search menu items..." }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 bg-gray-800/50 border border-gray-700/60 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all duration-300"
        />
        {searchTerm && (
          <div
  onClick={clearSearch}
  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-primary rounded-md cursor-pointer flex justify-center items-center hover:text-white transition-colors duration-200"
>
  <X className="w-4 h-4 text-red-500" />
</div>

        )}
      </div>
    </div>
  );
};

export default MenuSearch;
