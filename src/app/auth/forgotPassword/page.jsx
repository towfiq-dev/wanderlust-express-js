'use client'
import React from 'react';
import { Input } from '@heroui/react';
import { ArrowLeft, Mail, Send } from 'lucide-react';
import Link from 'next/link';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-cyan-50/30 flex items-center justify-center px-4 py-16 mt-16">
      <div className="w-full max-w-[460px]">
        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/80 border border-gray-100/50 overflow-hidden">

          {/* Header */}
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 px-10 py-12 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '30px 30px' }} />
            <div className="relative">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/20">
                <Mail size={28} className="text-cyan-300" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-white">Forgot Password?</h1>
              <p className="text-cyan-100/70 mt-2 text-sm leading-relaxed max-w-xs mx-auto">
                Enter your email and we&apos;ll send you a reset link
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 md:p-10">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 text-sm"
                  />
                </div>
              </div>

              <button
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-200/50 hover:scale-[1.01] transition-all cursor-pointer"
              >
                <Send size={16} />
                Send Reset Link
              </button>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-600 font-medium text-sm transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
