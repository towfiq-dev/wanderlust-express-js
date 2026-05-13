import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, ArrowUpRight, Star } from 'lucide-react';
import Link from 'next/link';

const DestinationCard = ({ destination }) => {
  const { destinationName, country, price, duration, imageUrl, _id } = destination;

  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 shadow-sm">
          <span className="text-sm font-bold text-gray-800">4.5</span>
          <Star size={14} className="fill-black text-black" />
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <MapPin size={14} />
          <span>{country}</span>
        </div>

        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
            {destinationName}
          </h3>
          <div className="text-right">
            <span className="text-xl font-black text-gray-900">${price}</span>
            <span className="text-xs text-gray-400 block">/Person</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
          <Calendar size={16} className="text-gray-400" />
          <span>{duration}</span>
        </div>

        {/* Action Link */}
        <Link href={`/allNav/destinations/${_id}`}>
        <button className="flex items-center gap-1 text-cyan-500 font-bold text-sm uppercase tracking-widest border-b-2 border-transparent hover:border-cyan-500 transition-all pt-2">
          Book Now
          <ArrowUpRight size={16} />
        </button>
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;