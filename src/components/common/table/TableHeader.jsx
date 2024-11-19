import React from "react";
import { Search } from "lucide-react";

export const TableHeader = ({
  title,
  subtitle = "Manage and monitor your data efficiently",
  onSearch,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-500 mt-1">{subtitle}</p>
      </div>
      {onSearch && (
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search here..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-white border-2 border-gray-200 rounded-lg pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-turquoise-400 focus:ring-2 focus:ring-turquoise-100 transition-all duration-200"
          />
          <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
        </div>
      )}
    </div>
  );
};
