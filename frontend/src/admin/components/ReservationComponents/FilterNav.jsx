import React, { useState } from "react";
import { Calendar, Users, StickyNote, Filter, RotateCcw } from "lucide-react";

const FilterNav = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    date: "",
    tablePreference: "",
    guests: "",
    notes: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFilter = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      date: "",
      tablePreference: "",
      guests: "",
      notes: false,
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl text-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold">Filter Reservations</h3>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Date */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1">
            <Calendar className="w-4 h-4 text-primary" />
            Date
          </label>
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Table Preference */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1">
            <Users className="w-4 h-4 text-primary" />
            Table Preference
          </label>
          <select
            name="tablePreference"
            value={filters.tablePreference}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="">All</option>
            <option value="Intimate Corner">Intimate Corner</option>
            <option value="Standard Table">Standard Table</option>
            <option value="Family Table">Family Table</option>
            <option value="Premium Booth">Premium Booth</option>
          </select>
        </div>

        {/* Guests */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1">
            <Users className="w-4 h-4 text-primary" />
            Number of Guests
          </label>
          <input
            type="number"
            name="guests"
            min="1"
            value={filters.guests}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Notes */}
        <div className="flex items-center gap-3 mt-7 md:mt-8">
          <input
            type="checkbox"
            name="notes"
            checked={filters.notes}
            onChange={handleChange}
            className="w-5 h-5 accent-primary cursor-pointer"
          />
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <StickyNote className="w-4 h-4 text-primary" />
            Only with Notes
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        <button
          onClick={handleFilter}
          className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-primary text-black font-semibold hover:brightness-110 transition-all"
        >
          <Filter className="w-4 h-4" />
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterNav;
