import DestinationCard from '@/components/homePage/allNavPage/destinationCard/DestinationCard';
import { getDestinations } from '@/lib/fetch-data';
import React from 'react';
import { ChevronDown } from 'lucide-react';

const Destinations = async () => {
  const getData = await getDestinations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Explore All Destinations
        </h1>
        <p className="text-gray-500 text-lg">
          Find your perfect travel experience from our curated collection
        </p>
      </div>

      {/* Filter Section (As seen in image_46ed1a.jpg) */}
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

      {/* Result Count */}
      <div className="mb-8">
        <p className="text-gray-500 font-medium italic">Showing {getData.length} destinations</p>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {getData.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default Destinations;