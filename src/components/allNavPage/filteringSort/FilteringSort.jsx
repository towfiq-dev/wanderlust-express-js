'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const CATEGORIES = ['All', 'Beach', 'Mountain', 'Adventure', 'Cultural', 'City'];

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $500', min: 0, max: 500 },
  { label: '$500 - $1000', min: 500, max: 1000 },
  { label: '$1000 - $2000', min: 1000, max: 2000 },
  { label: '$2000+', min: 2000, max: Infinity },
];

const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating: Low to High', value: 'rating_asc' },
  { label: 'Rating: High to Low', value: 'rating_desc' },
  { label: 'Name: A to Z', value: 'name_asc' },
];

const FilteringSort = ({ onFilterChange }) => {
  const [openDropdown, setOpenDropdown] = useState(null); // 'category' | 'price' | 'sort' | null
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState(PRICE_RANGES[0]);
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Notify parent whenever filter changes
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        category: selectedCategory,
        priceRange: selectedPrice,
        sort: selectedSort.value,
      });
    }
  }, [selectedCategory, selectedPrice, selectedSort]);

  const toggle = (name) => setOpenDropdown((prev) => (prev === name ? null : name));

  return (
    <div
      ref={dropdownRef}
      className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 rounded-lg mb-6 overflow-visible relative z-20"
    >
      {/* ── CATEGORY ── */}
      <div className="relative">
        <button
          onClick={() => toggle('category')}
          className="w-full flex justify-between items-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <div className="flex flex-col items-start">
            <span className="text-gray-400 uppercase text-xs font-semibold tracking-wider mb-0.5">
              Category
            </span>
            <span className="text-gray-800 text-sm font-medium">{selectedCategory}</span>
          </div>
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform duration-200 ${openDropdown === 'category' ? 'rotate-180' : ''}`}
          />
        </button>

        {openDropdown === 'category' && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-30 overflow-hidden">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenDropdown(null);
                }}
                className={`w-full text-left px-6 py-3 text-sm hover:bg-cyan-50 hover:text-cyan-600 transition-colors ${
                  selectedCategory === cat
                    ? 'bg-cyan-50 text-cyan-600 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── PRICE RANGE ── */}
      <div className="relative">
        <button
          onClick={() => toggle('price')}
          className="w-full flex justify-between items-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <div className="flex flex-col items-start">
            <span className="text-gray-400 uppercase text-xs font-semibold tracking-wider mb-0.5">
              Price Range
            </span>
            <span className="text-gray-800 text-sm font-medium">{selectedPrice.label}</span>
          </div>
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform duration-200 ${openDropdown === 'price' ? 'rotate-180' : ''}`}
          />
        </button>

        {openDropdown === 'price' && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-30 overflow-hidden">
            {PRICE_RANGES.map((range) => (
              <button
                key={range.label}
                onClick={() => {
                  setSelectedPrice(range);
                  setOpenDropdown(null);
                }}
                className={`w-full text-left px-6 py-3 text-sm hover:bg-cyan-50 hover:text-cyan-600 transition-colors ${
                  selectedPrice.label === range.label
                    ? 'bg-cyan-50 text-cyan-600 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── SORT BY ── */}
      <div className="relative">
        <button
          onClick={() => toggle('sort')}
          className="w-full flex justify-between items-center px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <div className="flex flex-col items-start">
            <span className="text-gray-400 uppercase text-xs font-semibold tracking-wider mb-0.5">
              Sort By
            </span>
            <span className="text-gray-800 text-sm font-medium">{selectedSort.label}</span>
          </div>
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform duration-200 ${openDropdown === 'sort' ? 'rotate-180' : ''}`}
          />
        </button>

        {openDropdown === 'sort' && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-30 overflow-hidden">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setSelectedSort(opt);
                  setOpenDropdown(null);
                }}
                className={`w-full text-left px-6 py-3 text-sm hover:bg-cyan-50 hover:text-cyan-600 transition-colors ${
                  selectedSort.value === opt.value
                    ? 'bg-cyan-50 text-cyan-600 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilteringSort;