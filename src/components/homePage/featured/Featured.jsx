import Link from 'next/link';
import FeaturedCard from './FeaturedCard';
import { ArrowUpRight } from 'lucide-react';

const getFeatured = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/featured`,
    { cache: 'no-store' }
  );
  return res.json();
};

const Featured = async () => {
  const featured = await getFeatured();

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 overflow-hidden">
      {/* Header */}
      <div className="flex items-end justify-between mb-12 gap-6">
        <div>
          <span className="section-label mb-4 block">Featured</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Top Destinations
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              For You
            </span>
          </h2>
          <p className="text-gray-500 mt-3 text-lg max-w-md">
            Handpicked travel experiences curated for the modern explorer
          </p>
        </div>

        <Link href={'/allNav/destinations'} className="hidden md:block shrink-0">
          <button className="group flex items-center gap-2 border border-gray-200 hover:border-cyan-400 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-250 cursor-pointer">
            View All
            <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
          </button>
        </Link>
      </div>

      {/* Slider */}
      <FeaturedCard featured={featured} />
    </section>
  );
};

export default Featured;
