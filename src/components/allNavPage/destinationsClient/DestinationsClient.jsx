'use client';
import React, { useState, useMemo } from 'react';
import DestinationCard from '../destinationCard/DestinationCard';
import FilteringSort from '../filteringSort/FilteringSort';

const DestinationsClient = ({ destinations }) => {
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: { label: 'All Prices', min: 0, max: Infinity },
    sort: 'default',
  });

  const filteredAndSorted = useMemo(() => {
    let result = [...destinations];

    // ── Filter by Category ──
    if (filters.category && filters.category !== 'All') {
      result = result.filter(
        (d) => d.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // ── Filter by Price Range ──
    const { min, max } = filters.priceRange;
    result = result.filter((d) => {
      const price = Number(d.price) || 0;
      return price >= min && price <= max;
    });

    // ── Sort ──
    switch (filters.sort) {
      case 'price_asc':
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price_desc':
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'rating_desc':
        result.sort((a, b) => Number(b.rating || 4.5) - Number(a.rating || 4.5));
        break;
      case 'rating_asc':
        result.sort((a, b) => Number(a.rating || 4.5) - Number(b.rating || 4.5));
        break;
      case 'name_asc':
        result.sort((a, b) =>
          (a.destinationName || '').localeCompare(b.destinationName || '')
        );
        break;
      default:
        break;
    }

    return result;
  }, [destinations, filters]);

  return (
    <>
      {/* Filter Bar */}
      <FilteringSort onFilterChange={setFilters} />

      {/* Result Count */}
      <div className="mb-8">
        <p className="text-gray-500 font-medium italic">
          Showing {filteredAndSorted.length} destination{filteredAndSorted.length !== 1 ? 's' : ''}
          {filters.category !== 'All' && (
            <span className="ml-1">
              in <span className="text-cyan-600 font-semibold">{filters.category}</span>
            </span>
          )}
        </p>
      </div>

      {/* Grid */}
      {filteredAndSorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredAndSorted.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🗺️</p>
          <p className="text-xl font-semibold text-gray-600 mb-2">No destinations found</p>
          <p className="text-sm">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </>
  );
};

export default DestinationsClient;
