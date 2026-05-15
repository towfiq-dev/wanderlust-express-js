// app/error.js

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRotateRight, FaHouse } from 'react-icons/fa6';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen mt-25 bg-black relative overflow-hidden flex items-center justify-center px-4">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Blur Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-blue-500/20 blur-3xl rounded-full"></div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center max-w-3xl"
      >
        {/* Error Code */}
        <motion.h1
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            type: 'spring',
          }}
          className="text-[90px] md:text-[170px] font-extrabold text-white leading-none"
        >
          5<span className="text-cyan-400">0</span>0
        </motion.h1>

        {/* Title */}
        <h2 className="text-3xl md:text-6xl font-bold text-white mt-4">
          Something Went Wrong
        </h2>

        {/* Subtitle */}
        <p className="text-gray-300 mt-6 text-lg md:text-xl leading-relaxed">
          An unexpected error occurred while exploring your journey.
          Please try again or return back to the homepage.
        </p>

        {/* Optional Error Message */}
        {error?.message && (
          <p className="mt-4 text-red-300 text-sm bg-white/10 border border-white/10 rounded-lg px-4 py-3">
            {error.message}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
          
          {/* Retry */}
          <button
            onClick={() => reset()}
            className="bg-cyan-500 cursor-pointer hover:bg-cyan-600 text-white px-8 py-4 rounded-full flex items-center gap-3 text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            Try Again
            <FaArrowRotateRight />
          </button>

          {/* Home */}
          <Link href="/">
            <button className="border cursor-pointer border-white/30 hover:border-cyan-400 hover:bg-cyan-400/10 text-white px-8 py-4 rounded-full flex items-center gap-3 text-lg transition-all duration-300">
              Back Home
              <FaHouse />
            </button>
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-gray-500 text-sm mt-12">
          Wanderlust © 2026 — Your travel companion worldwide.
        </p>
      </motion.div>
    </div>
  );
}