'use client'
import React from 'react';
import { Button, Input } from '@heroui/react';
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const ForgotPassword = () => {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12 mt-10">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#001D3D] mb-3">Forgot Password?</h1>
          <p className="text-gray-500 leading-relaxed">
            No worries, it happens! Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              variant="bordered"
              radius="lg"
              className="w-full"
              // startContent={
              //   <Mail className="text-gray-400" size={20} />
              // }
            />
          </div>

          <Button 
            className="w-full bg-[#00B4D8] hover:bg-[#0096C7] text-white font-bold py-6 rounded-xl transition-all shadow-lg shadow-cyan-100"
            size="lg"
          >
            Send Reset Link
          </Button>
        </form>

        {/* Footer Section */}
        <div className="mt-10 text-center">
          <Link 
            href="/auth/signin" 
            className="inline-flex items-center gap-2 text-[#00B4D8] font-semibold hover:underline group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Sign In
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ForgotPassword;