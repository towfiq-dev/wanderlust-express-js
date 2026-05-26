'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GrGoogle } from 'react-icons/gr';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({ provider: 'google' });
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    const { data: res, error } = await authClient.signIn.email({ email, password });
    if (res) {
      toast.success('Welcome back! Successfully signed in.');
      router.push('/');
    } else if (error) {
      toast.error(error.message || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-cyan-50/30 flex justify-center items-center px-4 py-16 mt-16">
      <div className="w-full max-w-[560px]">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/80 border border-gray-100/50 overflow-hidden">

          {/* Header */}
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 px-10 py-12 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '30px 30px' }} />
            <div className="relative">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/20">
                <Lock size={28} className="text-cyan-300" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white">Welcome Back</h2>
              <p className="text-cyan-100/70 mt-2 text-sm">Sign in to continue your journey</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 md:p-10">
            {/* Google */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full border border-gray-200 bg-white hover:bg-gray-50 py-3.5 rounded-2xl flex items-center justify-center gap-3 text-sm font-semibold text-gray-700 transition-all cursor-pointer mb-6 shadow-sm"
            >
              <GrGoogle className="text-base" />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs text-gray-400 font-semibold uppercase tracking-widest">or email</span>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register('email', { required: true })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 text-sm"
                  />
                </div>
                {errors.email && <small className="text-red-500 mt-1 inline-block text-xs">Email is required</small>}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                  <Link href="/auth/forgotPassword" className="text-xs text-cyan-600 hover:underline font-semibold">Forgot?</Link>
                </div>
                <div className="relative">
                  <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Your password"
                    {...register('password', { required: true })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-12 outline-none transition-all focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 text-sm"
                  />
                  <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-cyan-500 transition">
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </span>
                </div>
                {errors.password && <small className="text-red-500 mt-1 inline-block text-xs">Password is required</small>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-200/50 hover:shadow-cyan-300/50 hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>

            <p className="text-center mt-6 text-gray-500 text-sm">
              No account?{' '}
              <Link href="/auth/signup" className="font-bold text-cyan-600 hover:underline">Create one →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
