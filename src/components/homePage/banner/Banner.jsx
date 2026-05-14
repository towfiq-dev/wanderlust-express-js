// import Link from "next/link";


// const HeroBanner = () => {
//   return (
//     <section className="relative h-[90vh] w-full flex flex-col justify-center items-center text-white overflow-hidden">
//       {/* Background Image with Overlay */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: "url('/Banner.png')" }} // replace with your image path
//       >
//         <div className="absolute inset-0 bg-black/40"></div>
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 text-center px-4 max-w-4xl">
//         <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
//           Discover Your <br /> Next Adventure
//         </h1>
//         <p className="text-lg md:text-xl mb-10 text-gray-200">
//           Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.
//         </p>
        
//         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//           <Link href={'/allNav/bookings'}>
//           <button className="uppercase bg-cyan-500 px-5 py-3 cursor-pointer">
//             Explore Now
//           </button>
//           </Link>
//           <Link href={'/allNav/destinations'}>
//           <button className="uppercase px-5 py-3 bg-white/50 cursor-pointer">
//             View Destination
//           </button>
//           </Link>
//         </div>
//       </div>

//       {/* Responsive Search Bar Overlay */}
//       <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-md border-t border-white/10 hidden lg:block">
//         <div className="max-w-7xl mx-auto grid grid-cols-5 divide-x divide-white/20">
//           <div className="p-6">
//             <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Location</p>
//             <p className="text-sm">Address, City Or Zip</p>
//           </div>
//           <div className="p-6">
//             <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Date/Duration</p>
//             <p className="text-sm">Anytime/3 Days</p>
//           </div>
//           <div className="p-6">
//             <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Budget</p>
//             <p className="text-sm">$0-$3000</p>
//           </div>
//           <div className="p-6">
//             <p className="text-xs font-bold uppercase tracking-widest text-gray-400">People</p>
//             <p className="text-sm">5-10</p>
//           </div>
//           <button className="bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center gap-2 font-bold text-lg">
//             Search
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;

'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  MapPin,
  Star,
  Search,
  Play
} from "lucide-react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const images = [
  '/images/banner1.jpg',
  '/images/banner2.jpg',
  '/images/banner3.jpg',
  '/images/banner4.jpg',
]

const HeroBanner = () => {

  const [textIndex, setTextIndex] = useState(0)

  const animatedTexts = [
    'Luxury Tours',
    'Adventure Travel',
    'Beach Holidays',
    'Mountain Escape'
  ]

  useEffect(() => {

    const interval = setInterval(() => {

      setTextIndex((prev) =>
        prev === animatedTexts.length - 1 ? 0 : prev + 1
      )

    }, 2500)

    return () => clearInterval(interval)

  }, [])

  return (

    <section className="relative h-screen mt-20 overflow-hidden">

      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 4000 }}
        loop={true}
        effect="fade"
        pagination={{ clickable: true }}
        className="absolute inset-0 h-full w-full z-0"
      >

        {
          images.map((image, index) => (

            <SwiperSlide key={index}>

              <div
                className="w-full h-screen bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${image})`
                }}
              >

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/55 z-10"></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-20"></div>

              </div>

            </SwiperSlide>

          ))
        }

      </Swiper>

      {/* Floating Blur Effect */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full z-10"></div>

      {/* Main Content */}
      <div className="absolute inset-0 z-30 flex items-center">

        <div className="max-w-7xl mx-auto px-6 w-full">

          <div className="max-w-3xl">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full mb-8"
            >

              <Star className="text-yellow-400 fill-yellow-400" size={18} />

              <span className="text-sm text-white font-medium">
                Trusted by 15K+ Travelers Worldwide
              </span>

            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-3xl mt-15 md:text-6xl font-black text-white leading-tight mb-6"
            >

              Explore The

              <span className="block text-cyan-400 mt-2">
                {animatedTexts[textIndex]}
              </span>

            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg md:text-xl text-gray-200 leading-relaxed mb-10 max-w-2xl"
            >

              Discover breathtaking destinations, unforgettable adventures,
              and world-class travel experiences crafted for modern explorers.

            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex flex-col sm:flex-row gap-5"
            >

              <Link href={'/allNav/destinations'}>

                <button className="bg-cyan-500 cursor-pointer hover:bg-cyan-600 px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-2xl shadow-cyan-500/30 text-white">

                  Explore Destinations

                  <ArrowRight size={22} />

                </button>

              </Link>

              <button className="border cursor-pointer border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3 transition-all duration-300 text-white">

                <Play size={20} />

                Watch Video

              </button>

            </motion.div>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 1 }}
              className="mt-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 max-w-4xl"
            >

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">

                <div>
                  <p className="text-sm text-gray-300 mb-2">
                    Destination
                  </p>

                  <input
                    type="text"
                    placeholder="Where to go?"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none placeholder:text-gray-300"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-300 mb-2">
                    Duration
                  </p>

                  <input
                    type="text"
                    placeholder="3-7 Days"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none placeholder:text-gray-300"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-300 mb-2">
                    Budget
                  </p>

                  <input
                    type="text"
                    placeholder="$1000-$5000"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none placeholder:text-gray-300"
                  />
                </div>

                <button className="bg-cyan-500 cursor-pointer hover:bg-cyan-600 h-[54px] rounded-xl flex items-center justify-center gap-2 font-semibold text-white mt-6 md:mt-7 transition-all duration-300 hover:scale-105">

                  <Search size={20} />

                  Search

                </button>

              </div>

            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="hidden lg:flex items-center gap-8 mt-16"
            >

              <div>
                <h2 className="text-4xl font-bold text-white">
                  120+
                </h2>

                <p className="text-gray-300 mt-1">
                  Premium Destinations
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-white">
                  15K+
                </h2>

                <p className="text-gray-300 mt-1">
                  Happy Travelers
                </p>
              </div>

              <div className="flex items-center gap-3">

                <MapPin className="text-cyan-400" size={35} />

                <div>

                  <h3 className="text-white font-semibold text-lg">
                    Bali, Indonesia
                  </h3>

                  <p className="text-gray-300 text-sm">
                    Trending Destination
                  </p>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce">

        <div className="w-7 h-12 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white rounded-full"></div>
        </div>

      </div>

    </section>
  )
}

export default HeroBanner