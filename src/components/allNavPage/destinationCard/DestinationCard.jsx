import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, ArrowUpRight, Star } from 'lucide-react';
import Link from 'next/link';

const DestinationCard = ({ destination }) => {
  const { destinationName, country, price, duration, imageUrl, _id } = destination;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-2 cursor-pointer">
      {/* Image Container */}
      <div className="relative h-[220px] overflow-hidden">
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-md">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-gray-800">4.5</span>
        </div>

        {/* Country */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-medium">
          <MapPin size={12} className="text-cyan-300" />
          <span>{country}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title + Price */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors leading-tight">
            {destinationName}
          </h3>
          <div className="text-right shrink-0">
            <span className="text-xl font-black text-gray-900">${price}</span>
            <span className="text-xs text-gray-400 block">/person</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <Calendar size={13} className="text-cyan-400" />
          <span>{duration}</span>
        </div>

        {/* Action */}
        <Link href={`/allNav/destinations/${_id}`}>
          <button className="group/btn w-full bg-gray-50 hover:bg-cyan-500 text-gray-700 hover:text-white border border-gray-200 hover:border-cyan-500 rounded-xl py-2.5 px-4 font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-250 cursor-pointer">
            View & Book
            <ArrowUpRight size={14} className="group-hover/btn:rotate-45 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
