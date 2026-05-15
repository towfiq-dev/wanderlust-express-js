import DestinationsClient from '@/components/allNavPage/destinationsClient/DestinationsClient';
import { getDestinations } from '@/lib/fetch-data';

import React from 'react';

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

      {/* Client Component handles filtering, sorting, and rendering */}
      <DestinationsClient destinations={getData} />
    </div>
  );
};

export default Destinations;

// import DestinationCard from '@/components/allNavPage/destinationCard/DestinationCard';
// import { getDestinations } from '@/lib/fetch-data';
// import React from 'react';
// import FilteringSort from '@/components/allNavPage/filtering-Sort/Filtering-Sort';

// const Destinations = async () => {
//   const getData = await getDestinations();

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
//       {/* Header Section */}
//       <div className="mb-10">
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//           Explore All Destinations
//         </h1>
//         <p className="text-gray-500 text-lg">
//           Find your perfect travel experience from our curated collection
//         </p>
//       </div>

//       {/* Filter Section (As seen in image_46ed1a.jpg) */}
//       <FilteringSort/>

//       {/* Result Count */}
//       <div className="mb-8">
//         <p className="text-gray-500 font-medium italic">Showing {getData.length} destinations</p>
//       </div>

//       {/* Destinations Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
//         {getData.map((destination) => (
//           <DestinationCard key={destination._id} destination={destination} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Destinations;