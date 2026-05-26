import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      text: 'The Bali trip was absolutely magical! Every single detail was perfectly planned. The resorts were luxurious and the cultural experiences were unforgettable. I\'ve already booked my next trip!',
      name: "Michael Chen",
      location: "Singapore",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      rating: 5,
      trip: "Bali, Indonesia"
    },
    {
      text: 'Swiss Alps adventure exceeded all my expectations. The mountain views were absolutely breathtaking and our guide was incredibly knowledgeable. Highly recommend to every traveler!',
      name: "Sarah Johnson",
      location: "New York, USA",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      rating: 5,
      trip: "Swiss Alps"
    },
    {
      text: 'Wanderlust made our honeymoon absolutely perfect. The attention to detail and the personal touches made it feel like a once-in-a-lifetime experience we\'ll cherish forever.',
      name: "James & Emily",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
      rating: 5,
      trip: "Maldives"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-[#f8fafc] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #06b6d4 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <span className="section-label mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
              What Travelers
              <span className="block text-cyan-500">Say About Us</span>
            </h2>
          </div>
          <p className="text-gray-500 text-lg max-w-md lg:text-right">
            Real stories from our community of over 15,000 happy adventurers worldwide.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className={`group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-400 relative overflow-hidden
                ${i === 1 ? 'lg:-mt-4 lg:mb-4' : ''}`}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center">
                <Quote size={18} className="text-cyan-400 fill-cyan-100" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(r.rating)].map((_, si) => (
                  <Star key={si} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 leading-relaxed mb-8 text-[0.95rem] font-normal">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Trip badge */}
              <div className="inline-flex items-center gap-1.5 bg-cyan-50 text-cyan-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span>📍</span> {r.trip}
              </div>

              {/* Reviewer */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-cyan-100">
                  <Image src={r.image} alt={r.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{r.name}</h4>
                  <p className="text-sm text-gray-400">{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '15K+', label: 'Happy Travelers' },
            { num: '4.9', label: 'Average Rating' },
            { num: '120+', label: 'Destinations' },
            { num: '98%', label: 'Satisfaction Rate' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-gray-900 mb-1">{s.num}</div>
              <div className="text-sm text-gray-400 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
