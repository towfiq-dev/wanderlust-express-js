'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaLocationDot,
  FaCalendarDays,
  FaStar,
} from 'react-icons/fa6';
import { ArrowUpRight } from 'lucide-react';

const FeaturedCard = ({ featured }) => {
  const sliderRef = useRef(null);

  const handleNext = () => {
    sliderRef.current.scrollBy({ left: 440, behavior: 'smooth' });
  };

  const handlePrev = () => {
    sliderRef.current.scrollBy({ left: -440, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Cards */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-2"
      >
        {featured.map((item) => (
          <div
            key={item._id}
            className="group min-w-[320px] md:min-w-[400px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-400 hover:-translate-y-2 flex-shrink-0"
          >
            {/* Image */}
            <div className="relative overflow-hidden h-[240px] md:h-[280px]">
              <Image
                src={item.imageUrl}
                alt={item.destinationName}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                <FaStar className="text-amber-400" size={13} />
                <span className="font-bold text-gray-800 text-sm">4.5</span>
              </div>

              {/* Country on image */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-sm font-medium">
                <FaLocationDot className="text-cyan-300" size={14} />
                <span>{item.country}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title + Price */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors leading-tight">
                  {item.destinationName}
                </h2>
                <div className="text-right shrink-0">
                  <span className="text-2xl font-black text-gray-900">${item.price}</span>
                  <span className="text-gray-400 text-xs block">/person</span>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-5">
                <FaCalendarDays size={13} className="text-cyan-400" />
                <span>{item.duration}</span>
              </div>

              {/* Button */}
              <Link href={`/allNav/destinations/${item._id}`}>
                <button className="group/btn w-full bg-gray-50 hover:bg-cyan-500 text-gray-700 hover:text-white border border-gray-200 hover:border-cyan-500 rounded-xl py-3 px-4 font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-250 cursor-pointer">
                  Book Now
                  <ArrowUpRight size={16} className="group-hover/btn:rotate-45 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Area */}
      <div className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-5 flex-1">
          <span className="text-3xl font-light text-gray-300">
            {featured.length}
            <span className="text-sm font-semibold text-gray-500 ml-1">destinations</span>
          </span>
          <div className="h-px bg-gradient-to-r from-gray-200 to-transparent flex-1" />
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-3 ml-6">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-250 cursor-pointer text-gray-600"
          >
            <FaArrowLeft size={14} />
          </button>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-250 cursor-pointer"
          >
            <FaArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
