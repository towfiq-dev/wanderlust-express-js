'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';

export default function NotFound() {
  return (
    <div className="min-h-screen mt-25 bg-black relative overflow-hidden flex items-center justify-center px-4">
      
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop')",
        }}
      ></div>

      {/* Gradient Blur */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-blue-500/20 blur-3xl rounded-full"></div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl text-center"
      >
        {/* 404 */}
        <motion.h1
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.6,
            type: 'spring',
          }}
          className="text-[120px] md:text-[220px] font-extrabold text-white leading-none"
        >
          4<span className="text-cyan-400">0</span>4
        </motion.h1>

        {/* Title */}
        <h2 className="text-3xl md:text-6xl font-bold text-white mt-4">
          Lost In The Journey?
        </h2>

        {/* Subtitle */}
        <p className="text-gray-300 mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          The destination you are looking for might have been removed,
          renamed, or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
          
          {/* Home Button */}
          <Link href="/">
            <button className="bg-cyan-500 cursor-pointer hover:bg-cyan-600 text-white px-8 py-4 rounded-full flex items-center gap-3 text-lg font-medium transition-all duration-300 shadow-lg hover:scale-105">
              Back To Home
              <FaArrowRight />
            </button>
          </Link>

          {/* Explore */}
          <Link href="allNav/destinations">
            <button className="border cursor-pointer border-white/30 hover:border-cyan-400 hover:bg-cyan-400/10 text-white px-8 py-4 rounded-full text-lg transition-all duration-300">
              Explore Destinations
            </button>
          </Link>
        </div>

        {/* Small Text */}
        <p className="text-gray-500 text-sm mt-12">
          Wanderlust © 2026 — Explore the world without limits.
        </p>
      </motion.div>
    </div>
  );
}