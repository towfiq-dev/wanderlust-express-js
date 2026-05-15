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

const FeaturedCard = ({ featured }) => {
  const sliderRef = useRef(null);

  // Scroll Right
  const handleNext = () => {
    sliderRef.current.scrollBy({
      left: 420,
      behavior: 'smooth',
    });
  };

  // Scroll Left
  const handlePrev = () => {
    sliderRef.current.scrollBy({
      left: -420,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      {/* Cards */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {featured.map((item) => (
          <div
            key={item._id}
            className="min-w-[340px] md:min-w-[500px] bg-white flex-shrink-0"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.destinationName}
                width={600}
                height={400}
                className="w-full h-[250px] md:h-[330px] object-cover hover:scale-105 duration-500"
              />

              {/* Rating */}
              <div className="absolute top-4 right-4 bg-white px-3 py-2 flex items-center gap-2 shadow-md">
                <span className="font-semibold">4.5</span>
                <FaStar />
              </div>
            </div>

            {/* Content */}
            <div className="py-5">
              {/* Country */}
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <FaLocationDot />
                <span>{item.country}</span>
              </div>

              {/* Title + Price */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  {item.destinationName}
                </h2>

                <div>
                  <span className="text-3xl font-bold">${item.price}</span>
                  <span className="text-gray-500 text-sm">/Person</span>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 text-gray-500 mt-3">
                <FaCalendarDays />
                <span>{item.duration}</span>
              </div>

              {/* Button */}
              <Link href={`/allNav/destinations/${item._id}`}>
              <button className="mt-5 cursor-pointer text-sky-500 font-medium flex items-center gap-2 hover:gap-4 duration-300">
                BOOK NOW →
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Area */}
      <div className="flex items-center justify-between mt-10">
        {/* Pagination */}
        <div className="flex items-center gap-5 w-full">
          <span className="text-4xl font-light">
            1/{featured.length}
          </span>

          <div className="h-[1px] bg-gray-300 flex-1"></div>
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-4 ml-6">
          <button
            onClick={handlePrev}
            className="w-14 h-14 rounded-full cursor-pointer border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
          >
            <FaArrowLeft />
          </button>

          <button
            onClick={handleNext}
            className="w-14 h-14 rounded-full cursor-pointer border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;