import Link from "next/link";


const HeroBanner = () => {
  return (
    <section className="relative h-[90vh] w-full flex flex-col justify-center items-center text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Banner.png')" }} // replace with your image path
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
          Discover Your <br /> Next Adventure
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-200">
          Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={'/allNav/bookings'}>
          <button className="uppercase bg-cyan-500 px-5 py-3 cursor-pointer">
            Explore Now
          </button>
          </Link>
          <Link href={'/allNav/destinations'}>
          <button className="uppercase px-5 py-3 bg-white/50 cursor-pointer">
            View Destination
          </button>
          </Link>
        </div>
      </div>

      {/* Responsive Search Bar Overlay */}
      <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-md border-t border-white/10 hidden lg:block">
        <div className="max-w-7xl mx-auto grid grid-cols-5 divide-x divide-white/20">
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Location</p>
            <p className="text-sm">Address, City Or Zip</p>
          </div>
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Date/Duration</p>
            <p className="text-sm">Anytime/3 Days</p>
          </div>
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Budget</p>
            <p className="text-sm">$0-$3000</p>
          </div>
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">People</p>
            <p className="text-sm">5-10</p>
          </div>
          <button className="bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center gap-2 font-bold text-lg">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;