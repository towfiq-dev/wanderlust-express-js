'use client'
import { authClient } from '@/lib/auth-client';
import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsGoogle } from 'react-icons/bs';
import { toast } from 'react-toastify';

const SignInPage = () => {

  const router = useRouter()
      const onSubmit = async(e)=>{
      e.preventDefault()
      const formData  = new FormData(e.currentTarget)
      const user = Object.fromEntries(formData.entries())
  
      const {data, error} = await authClient.signIn.email({
        email: user.email,
        password: user.password
      })
      if (data) {
        toast.success('You are Successfully SignIn')
        router.push('/')
      }else if (error) {
        toast.error(error.message)
      }else{
        toast.error('Something went wrong. Please try again later')
      }
    }

    const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10 mt-25">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Resume your adventure with Wanderlust
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={onSubmit}>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email" name='email'
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password" name='password'
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                className="rounded cursor-pointer border-gray-300 text-cyan-500 focus:ring-cyan-500"
              />
              Remember me
            </label>

            <Link
              href='/auth/forgotPassword'
              className="font-medium text-cyan-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-600 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>

          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Button */}
        <button onClick={signIn} type="button" className="w-full cursor-pointer rounded-xl border border-gray-200 py-3 font-medium text-gray-700 flex items-center justify-center transition hover:bg-gray-50">
          <span className="mr-2"><BsGoogle/></span>
          Sign In With Google
        </button>

        {/* Footer */}
        <p className="mt-7 text-center text-gray-500">
          Don&apos;t have an account?{' '}
          <Link 
            href={'/auth/signup'}
            className="font-semibold cursor-pointer text-cyan-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
};

export default SignInPage;