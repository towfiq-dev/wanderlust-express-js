'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Star, Search, Play } from "lucide-react";
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

const animatedTexts = [
  'Luxury Tours',
  'Adventure Travel',
  'Beach Holidays',
  'Mountain Escapes'
]

const HeroBanner = () => {
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => prev === animatedTexts.length - 1 ? 0 : prev + 1)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={true}
        effect="fade"
        pagination={{ clickable: true }}
        className="absolute inset-0 h-full w-full z-0"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-screen bg-cover bg-center relative"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-20" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full z-10 pointer-events-none" />

      {/* Main Content */}
      <div className="absolute inset-0 z-30 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full pt-20">
          <div className="max-w-3xl">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8"
            >
              <div className="flex -space-x-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border border-white/50" />
                ))}
              </div>
              <Star className="text-amber-400 fill-amber-400" size={14} />
              <span className="text-xs text-white font-semibold">Trusted by 15K+ Travelers</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif font-black text-white leading-[1.05] mb-6"
            >
              Explore The
              <span
                key={textIndex}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mt-1"
              >
                {animatedTexts[textIndex]}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="text-base md:text-lg text-gray-300 leading-relaxed mb-10 max-w-xl"
            >
              Discover breathtaking destinations, unforgettable adventures, and world-class
              travel experiences crafted for modern explorers.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href={'/allNav/destinations'}>
                <button className="bg-cyan-500 hover:bg-cyan-400 px-8 py-4 rounded-full text-base font-bold flex items-center gap-3 transition-all duration-250 hover:scale-[1.03] shadow-2xl shadow-cyan-500/30 text-white cursor-pointer group">
                  Explore Destinations
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <button className="border border-white/25 bg-white/8 backdrop-blur-md hover:bg-white/15 px-8 py-4 rounded-full text-base font-semibold flex items-center gap-3 transition-all duration-250 text-white cursor-pointer">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Play size={14} fill="white" className="ml-0.5" />
                </div>
                Watch Video
              </button>
            </motion.div>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.9 }}
              className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-4 max-w-3xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                {[
                  { label: 'Destination', placeholder: 'Where to go?' },
                  { label: 'Duration', placeholder: '3–7 Days' },
                  { label: 'Budget', placeholder: '$1000–$5000' },
                ].map((field) => (
                  <div key={field.label}>
                    <p className="text-xs text-gray-300 mb-1.5 font-medium">{field.label}</p>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm outline-none placeholder:text-gray-400 focus:border-cyan-400/50 focus:bg-white/15 transition-all"
                    />
                  </div>
                ))}
                <button className="bg-cyan-500 hover:bg-cyan-400 h-[42px] rounded-xl flex items-center justify-center gap-2 font-bold text-white text-sm transition-all duration-250 hover:scale-[1.02] cursor-pointer mt-4 md:mt-0">
                  <Search size={16} />
                  Search
                </button>
              </div>
            </motion.div>

          </div>

          {/* Stats - bottom right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.9 }}
            className="hidden lg:flex items-center gap-10 mt-14"
          >
            {[
              { num: '120+', label: 'Destinations' },
              { num: '15K+', label: 'Travelers' },
              { num: '4.9★', label: 'Rating' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-white">{stat.num}</div>
                <div className="text-gray-400 text-sm mt-0.5">{stat.label}</div>
              </div>
            ))}
            <div className="h-10 w-px bg-white/10" />
            <div className="flex items-center gap-2.5">
              <MapPin className="text-cyan-400" size={22} />
              <div>
                <div className="text-white font-semibold text-sm">Bali, Indonesia</div>
                <div className="text-gray-400 text-xs">🔥 Trending Now</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2.5 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
