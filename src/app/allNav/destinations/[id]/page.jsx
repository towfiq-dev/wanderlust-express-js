import BookingCard from '@/components/allNavPage/bookingCard/BookingCard';
import EditPage from '@/components/allNavPage/detailsEditPage/EditPage';
import EditDelete from '@/components/homePage/Delete/EditDelete';
import { auth } from '@/lib/auth';
import { Calendar, Check, MapPin, Star, Clock, Tag } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`);
    const data = await res.json();
    return {
      title: data.destinationName,
      description: data.description?.slice(0, 160),
    };
  } catch {
    return { title: 'Destination Details' };
  }
}

const DetailsPage = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({ headers: await headers() });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`, {
    headers: { authorization: `Bearer ${token}` }
  });
  const detailsData = await res.json();
  const { destinationName, country, category, duration, imageUrl, description, price } = detailsData;

  const highlights = [
    "Luxury beachfront accommodation",
    "Traditional cultural experience",
    "Professional tour guide",
    "All transport included",
    "Exclusive dinner events",
    "Travel insurance included"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative w-full h-[55vh] overflow-hidden">
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Admin controls */}
        <div className="absolute top-24 right-6 flex gap-2 z-10">
          <EditPage detailsData={detailsData} />
          <EditDelete detailsData={detailsData} />
        </div>

        {/* Hero content overlay */}
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-cyan-300 text-sm font-medium mb-3">
              <MapPin size={16} />
              <span className="uppercase tracking-wider">{country}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              {destinationName}
            </h1>
            <div className="flex flex-wrap items-center gap-5 mt-4">
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-sm px-3 py-1.5 rounded-full">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="font-semibold">4.9</span>
                <span className="text-white/70">(234 reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-sm px-3 py-1.5 rounded-full">
                <Clock size={14} className="text-cyan-300" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-sm px-3 py-1.5 rounded-full">
                <Tag size={14} className="text-cyan-300" />
                <span>{category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cyan-500 rounded-full" />
                Overview
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-cyan-500 rounded-full" />
                What&apos;s Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <Check size={16} className="text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price note */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-cyan-600">${price}</span>
                <span className="text-gray-500 font-medium">per person</span>
              </div>
              <p className="text-gray-600 text-sm mt-2">
                Includes accommodation, transfers, guided tours, and travel insurance.
              </p>
            </div>
          </div>

          {/* Booking Card */}
          <BookingCard detailsData={detailsData} />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
