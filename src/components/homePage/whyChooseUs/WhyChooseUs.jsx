import { ShieldCheck, Map, Headset } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <ShieldCheck className="text-cyan-500" size={40} />,
      title: "Safe & Secure",
      description: "Your safety is our priority with comprehensive travel insurance and 24/7 support."
    },
    {
      icon: <Map className="text-cyan-500" size={40} />,
      title: "Expert Guides",
      description: "Local experts who bring destinations to life with authentic cultural insights."
    },
    {
      icon: <Headset className="text-cyan-500" size={40} />,
      title: "24/7 Support",
      description: "Round-the-clock customer service to assist you wherever your journey takes you."
    }
  ];

  return (
    <section className="bg-cyan-50 py-20 px-6 md:px-16 text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-2">Why Choose Wanderlust</h2>
        <p className="text-gray-500 mb-12">Your trusted partner for exceptional travel experiences</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-10 shadow-sm text-left border border-gray-100 transition-transform hover:-translate-y-2">
              <div className="mb-6">{f.icon}</div>
              <h3 className="text-2xl font-serif font-semibold mb-4">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;