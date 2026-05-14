import { ChevronDown } from 'lucide-react';
import React from 'react';

const FilteringSort = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 rounded-lg mb-6 overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-50 cursor-pointer">
          <span className="text-gray-600 uppercase text-sm font-semibold tracking-wider">Category</span>
          <ChevronDown size={18} className="text-gray-400" />
        </div>
        <div className="flex justify-between items-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-50 cursor-pointer">
          <span className="text-gray-600 uppercase text-sm font-semibold tracking-wider">Price Range</span>
          <ChevronDown size={18} className="text-gray-400" />
        </div>
        <div className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 cursor-pointer">
          <span className="text-gray-600 uppercase text-sm font-semibold tracking-wider">Sort By</span>
          <ChevronDown size={18} className="text-gray-400" />
        </div>
      </div>
  );
};

export default FilteringSort;