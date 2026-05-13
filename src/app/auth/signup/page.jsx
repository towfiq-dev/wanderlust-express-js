'use client';
import Link from 'next/link';
import {
  Mail,
  Lock,
  User,
  Image,
} from 'lucide-react';
import { BsGoogle } from 'react-icons/bs';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const SignUpPage = () => {
    const router = useRouter()
    const onSubmit = async(e)=>{
    e.preventDefault()
    const formData  = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries())

    const {data, error} = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      image: user.url,
      password: user.password
    })
    if (data) {
      toast.success(`${user.name} is Successfully SignUp`)
      router.push('/auth/signin')
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
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Start your adventure with Wanderlust
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={onSubmit}>
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text" name='name'
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            </div>
          </div>

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

          {/* ImageUrl */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo Url
            </label>

            <div className="relative">
              <Image
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="url" name='image'
                placeholder="Enter your image url"
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
                placeholder="Create a password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            </div>
          </div>

          {/* Confirm Password */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            </div>
          </div> */}

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl cursor-pointer bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-600 active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>

          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-gray-500">
              Or sign up with
            </span>
          </div>
        </div>

        {/* Google Button */}
                <button onClick={signIn} type='submit' className="w-full cursor-pointer rounded-xl border border-gray-200 py-3 font-medium text-gray-700 flex items-center justify-center transition hover:bg-gray-50">
                  <span className="mr-2"><BsGoogle/></span>
                  Sign Up With Google
                </button>

        {/* Footer */}
        <p className="mt-7 text-center text-gray-500">
          Already have an account?{' '}
          <Link
           href={'/auth/signin'}
            className="font-semibold cursor-pointer text-cyan-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;