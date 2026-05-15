import Link from 'next/link';
import FeaturedCard from './FeaturedCard';

const getFeatured = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/featured`,
    {
      cache: 'no-store',
    }
  );

  return res.json();
};

const Featured = async () => {
  const featured = await getFeatured();

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-black">
            Featured Destinations
          </h2>

          <p className="text-gray-500 mt-3">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <Link href={'/allNav/destinations'}>
        <button className="hidden cursor-pointer md:flex items-center gap-2 border border-sky-400 px-6 py-3 text-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-300">
          ALL DESTINATIONS →
        </button>
        </Link>
      </div>

      {/* Slider */}
      <FeaturedCard featured={featured} />
    </section>
  );
};

export default Featured;