import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const Testimonials = () => {
  const reviews = [
    {
      text: '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
      name: "Michael Chen",
      location: "Singapore",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    },
    {
      text: '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
      name: "Sarah Johnson",
      location: "New York, USA",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4">What Travelers Say</h2>
            <p className="text-gray-500">Real experiences from our happy travelers</p>
          </div>
          <div className="flex gap-4">
            <button className="p-4 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <ArrowLeft size={24} className="text-gray-400" />
            </button>
            <button className="p-4 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <ArrowRight size={24} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="flex flex-col md:flex-row border border-gray-100 p-8 gap-6 items-center">
              <div className="flex-1 order-2 md:order-1">
                <p className="text-xl font-serif leading-snug mb-8 text-gray-800">{r.text}</p>
                <div className="border-l-2 border-cyan-500 pl-4">
                  <h4 className="font-bold text-cyan-600">{r.name}</h4>
                  <p className="text-sm text-gray-400">{r.location}</p>
                </div>
              </div>
              <div className="w-full md:w-48 h-64 relative order-1 md:order-2">
                <Image src={r.image} alt={r.name} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;