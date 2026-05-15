import BookingCard from '@/components/allNavPage/bookingCard/BookingCard';
import EditPage from '@/components/allNavPage/detailsEditPage/EditPage';
import EditDelete from '@/components/homePage/Delete/EditDelete';
import { auth } from '@/lib/auth';
import { Calendar, Check, MapPin, Star } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const DetailsPage = async ({ params }) => {
  const { id } = await params
  const tokenData = await auth.api.getToken({
    headers: await headers()
    
  })
   const token = tokenData?.token
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`, 
    {
    headers:{
      authorization: `Bearer ${token}`
    }
  }
)
  const detailsData = await res.json()
  const {
    destinationName,
    country,
    category,
    duration,
    imageUrl,
    description
  } = detailsData
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans mt-25">
      <div className='flex justify-end mb-6'>
        <EditPage detailsData={detailsData} />
        <EditDelete detailsData={detailsData} />
      </div>

      <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-10 shadow-lg">
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        <div className="lg:col-span-2">
          <div className="flex items-center text-gray-500 gap-1 mb-3">
            <MapPin size={18} className="text-cyan-500" />
            <span className="text-sm font-medium uppercase tracking-wider">{country}</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-5">{destinationName}</h1>

          <div className="flex flex-wrap items-center gap-8 mb-10 border-b pb-8">
            <div className="flex items-center gap-2">
              <Star className="text-green-500 fill-green-500" size={20} />
              <span className="font-bold text-lg">4.9</span>
              <span className="text-gray-500">(234 reviews)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar size={20} className="text-cyan-500" />
              <span className="font-semibold">{duration}</span>
            </div>
            <div className="px-4 py-1 bg-cyan-50 text-cyan-600 rounded-full text-sm font-bold">
              {category}
            </div>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {description}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Luxury beachfront accommodation",
                "Traditional cultural experience",
                "Professional tour guide",
                "All transport included",
                "Exclusive dinner events"
              ].map((highlight, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-700">
                  <div className="bg-green-100 p-1 rounded-full">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <BookingCard detailsData={detailsData}/>

      </div>
    </div>
  );
};

export default DetailsPage;