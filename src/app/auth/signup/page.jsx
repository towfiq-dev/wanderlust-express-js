'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GrGoogle } from 'react-icons/gr';
import { User, Mail, Image as ImageIcon, Lock } from 'lucide-react';

const SignUpPage = () => {

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Google Sign Up
  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: 'google',
    });
  };

  // Submit
  const onSubmit = async (data) => {
    const { email, name, photo, password } = data;

    const { data: res, error } = await authClient.signUp.email({
      name,
      image: photo,
      email,
      password,
    });

    if (res) {
      await authClient.signOut();

      toast.success(
        `Congratulations ${name}! You have successfully signed up.`
      );

      router.push('/auth/signin');

    } else if (error) {
      toast.error(error.message || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen md:mt-25 bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 flex justify-center items-center px-4 py-10">

      <div className="w-full max-w-[620px]">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

          {/* Top Banner */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-10 text-center">

            <h2 className="text-4xl font-bold text-white">
              Create Account
            </h2>

            <p className="text-cyan-50 mt-3 text-sm md:text-base">
              Join our platform and start your new journey today.
            </p>
          </div>

          {/* Form Area */}
          <div className="p-8 md:p-12">

            <form
              className="space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >

              {/* Name */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register('name', { required: true })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />
                </div>

                {errors.name && (
                  <small className="text-red-500 mt-1 inline-block">
                    Name is required
                  </small>
                )}
              </div>

              {/* Photo URL */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Photo URL
                </label>

                <div className="relative">
                  <ImageIcon
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Enter your photo URL"
                    {...register('photo', { required: true })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />
                </div>

                {errors.photo && (
                  <small className="text-red-500 mt-1 inline-block">
                    Photo URL is required
                  </small>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    {...register('email', { required: true })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />
                </div>

                {errors.email && (
                  <small className="text-red-500 mt-1 inline-block">
                    Email is required
                  </small>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register('password', { required: true })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-12 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-cyan-500 transition"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </span>
                </div>

                {errors.password && (
                  <small className="text-red-500 mt-1 inline-block">
                    Password is required
                  </small>
                )}
              </div>

              {/* Terms */}
              <div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register('terms', { required: true })}
                    className="w-4 h-4 cursor-pointer accent-cyan-500"
                  />

                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    I accept the{' '}
                    <span className="font-semibold text-cyan-600">
                      Terms & Conditions
                    </span>
                  </label>
                </div>

                {errors.terms && (
                  <small className="text-red-500 mt-1 inline-block">
                    Please accept terms & conditions
                  </small>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:scale-[1.01] hover:shadow-cyan-200 transition-all cursor-pointer"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleSignUp}
              className="w-full border border-gray-200 bg-white hover:bg-gray-50 py-4 rounded-2xl flex items-center justify-center gap-3 text-[17px] font-semibold text-gray-700 transition-all cursor-pointer"
            >
              <GrGoogle className="text-xl" />
              Sign Up With Google
            </button>

            {/* Footer */}
            <p className="text-center mt-8 text-gray-600 text-sm md:text-base">
              Already have an account?{' '}
              <Link
                href="/auth/signin"
                className="font-semibold text-cyan-600 hover:underline"
              >
                Login
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;