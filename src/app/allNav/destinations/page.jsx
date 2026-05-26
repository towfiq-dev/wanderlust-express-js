import DestinationsClient from '@/components/allNavPage/destinationsClient/DestinationsClient';
import { getDestinations } from '@/lib/fetch-data';

export const metadata = {
  title: 'All Destinations',
  description: 'Explore our curated collection of handpicked travel destinations from around the world. Filter by category, price range, and more.',
};

const Destinations = async () => {
  const getData = await getDestinations();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <span className="inline-block text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Explore</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight">
            Discover Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              Perfect Destination
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl">
            From tropical paradises to mountain retreats — find your next unforgettable adventure.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DestinationsClient destinations={getData} />
      </div>
    </div>
  );
};

export default Destinations;
