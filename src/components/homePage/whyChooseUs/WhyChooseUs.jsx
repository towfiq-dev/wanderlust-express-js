import { ShieldCheck, Map, Headset, Trophy, Clock, Globe } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: ShieldCheck,
      color: 'from-emerald-400 to-teal-500',
      bg: 'bg-emerald-50',
      title: "Safe & Secure",
      description: "Your safety is our top priority. Every journey comes with comprehensive travel insurance and 24/7 emergency support.",
      stat: "100%",
      statLabel: "Insured Trips"
    },
    {
      icon: Map,
      color: 'from-cyan-400 to-blue-500',
      bg: 'bg-cyan-50',
      title: "Expert Local Guides",
      description: "Handpicked local guides who bring destinations alive with authentic cultural stories and hidden gems.",
      stat: "200+",
      statLabel: "Expert Guides"
    },
    {
      icon: Headset,
      color: 'from-violet-400 to-purple-500',
      bg: 'bg-violet-50',
      title: "24/7 Support",
      description: "Round-the-clock dedicated customer service, wherever your journey takes you in the world.",
      stat: "24/7",
      statLabel: "Always Available"
    },
    {
      icon: Trophy,
      color: 'from-amber-400 to-orange-500',
      bg: 'bg-amber-50',
      title: "Award Winning",
      description: "Recognized as the world's top travel platform, with awards from leading travel publications.",
      stat: "#1",
      statLabel: "Rated Platform"
    },
    {
      icon: Clock,
      color: 'from-rose-400 to-pink-500',
      bg: 'bg-rose-50',
      title: "Flexible Booking",
      description: "Plans change — we get it. Free cancellation up to 7 days before your trip, no questions asked.",
      stat: "7 Days",
      statLabel: "Free Cancel"
    },
    {
      icon: Globe,
      color: 'from-indigo-400 to-cyan-500',
      bg: 'bg-indigo-50',
      title: "120+ Destinations",
      description: "From tropical beaches to snow-capped peaks — explore over 120 handpicked destinations worldwide.",
      stat: "120+",
      statLabel: "Destinations"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">Why Us</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
            Why Thousands Choose
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              Wanderlust
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We go beyond booking — we craft extraordinary travel experiences built on trust, expertise, and passion.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-2 overflow-hidden`}
            >
              {/* Gradient top accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 ${f.bg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon
                  size={26}
                  className={`bg-gradient-to-r ${f.color} bg-clip-text`}
                  style={{ color: 'transparent', background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                />
                <f.icon size={26} className="absolute opacity-100" strokeWidth={1.8}
                  style={{ color: f.bg.includes('emerald') ? '#10b981' : f.bg.includes('cyan') ? '#06b6d4' : f.bg.includes('violet') ? '#8b5cf6' : f.bg.includes('amber') ? '#f59e0b' : f.bg.includes('rose') ? '#f43f5e' : '#6366f1' }}
                />
              </div>

              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">{f.title}</h3>
                <div className="text-right">
                  <div className="text-lg font-black text-gray-900">{f.stat}</div>
                  <div className="text-xs text-gray-400 whitespace-nowrap">{f.statLabel}</div>
                </div>
              </div>

              <p className="text-gray-500 leading-relaxed text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
