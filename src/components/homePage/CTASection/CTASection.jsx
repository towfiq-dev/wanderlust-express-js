import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative h-[500px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?q=80&w=2000')` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h2 className="text-4xl md:text-7xl font-serif text-white mb-6 tracking-tight">
          Ready To Start Your Journey?
        </h2>
        <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Join thousands of travelers who have discovered the world with us
        </p>
        
        <button className="bg-white text-black px-10 py-5 flex items-center gap-3 mx-auto font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all duration-300 group">
          Book Your Trip Today
          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default CTASection;