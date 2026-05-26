import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?q=80&w=2000')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-cyan-900/40" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium px-5 py-2 rounded-full mb-8">
          <Sparkles size={16} className="text-amber-400" />
          Limited Time Offer — Save up to 30%
        </div>

        <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight tracking-tight">
          Your Next Adventure
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
            Starts Now
          </span>
        </h2>

        <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Join over 15,000 travelers who trust Wanderlust for their extraordinary journeys. Expert guides, seamless booking, unforgettable memories.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={'/allNav/destinations'}>
            <button className="group bg-white text-gray-900 px-8 py-5 rounded-full font-bold text-lg flex items-center gap-3 hover:bg-cyan-400 hover:text-white transition-all duration-300 shadow-2xl hover:scale-[1.03]">
              Book Your Trip Today
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <Link href={'/allNav/destinations'}>
            <button className="border border-white/30 hover:border-white/60 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white px-8 py-5 rounded-full font-semibold text-lg transition-all duration-300">
              Explore Destinations
            </button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-14 pt-10 border-t border-white/10">
          {['Free Cancellation', 'Best Price Guarantee', 'Expert Support', 'Instant Confirmation'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-gray-300 text-sm">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
