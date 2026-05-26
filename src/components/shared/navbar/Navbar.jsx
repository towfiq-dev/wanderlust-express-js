'use client'

import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Logo from '@/assets/Wanderlust.png'
import NavLinks from './NavLinks';
import { authClient } from '@/lib/auth-client';
import { Menu, X, Compass } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { data: session } = authClient.useSession()
  const user = session?.user

  const handleSignOut = async () => {
    await authClient.signOut()
    setMenuOpen(false)
  }

  const links = (
    <>
      <NavLinks href={'/'}>Home</NavLinks>
      <NavLinks href={'/allNav/destinations'}>Destinations</NavLinks>
      <NavLinks href={'/allNav/allDestinations'}>Add Destination</NavLinks>
      {/* <NavLinks href={'/allNav/bookings'}>My Bookings</NavLinks> */}
      <NavLinks href={'/allNav/support'}>Contact Us</NavLinks>
      <NavLinks href={'/allNav/admin'}>Dashboard</NavLinks>
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.08)] py-3 border-b border-gray-100/80'
          : 'bg-transparent py-5'
        }`}
    >
      <div className='max-w-7xl mx-auto px-5 flex justify-between items-center'>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={Logo}
            alt='Wanderlust Logo'
            width={160}
            height={50}
            priority
            className='w-32 md:w-40 h-auto'
          />
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden lg:flex items-center gap-8'>
          {links}
        </ul>

        {/* Right Side */}
        <div className='hidden md:flex items-center gap-3'>
          {user ? (
            <>
              {user.image && (
                <Image
                  className='rounded-full border-2 border-cyan-400 shadow-md shadow-cyan-100'
                  width={40}
                  height={40}
                  src={user.image}
                  alt={user.name}
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
              )}

              <button
                onClick={handleSignOut}
                className='bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border border-red-200 text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200'
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href={'/auth/signin'}>
                <button className={`text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200
                  ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
                  Login
                </button>
              </Link>

              <Link href={'/auth/signup'}>
                <button className='bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-cyan-200/50 hover:shadow-cyan-300/50 hover:scale-[1.02]'>
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden p-2 rounded-full transition-all duration-200
            ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className='bg-white/98 backdrop-blur-xl border-t border-gray-100 px-6 py-6 space-y-6 shadow-xl'>

          <ul className='flex flex-col gap-1'>
            {links}
          </ul>

          {user ? (
            <div className='flex flex-col gap-3 pt-5 border-t border-gray-100'>
              <div className='flex items-center gap-4 p-3 bg-gray-50 rounded-2xl'>
                {user.image && (
                  <Image
                    className='rounded-full border-2 border-cyan-400'
                    width={48}
                    height={48}
                    src={user.image}
                    alt={user.name}
                    style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                  />
                )}
                <div>
                  <p className='font-semibold text-gray-900'>{user?.name}</p>
                  <p className='text-sm text-gray-500'>{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className='w-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border border-red-200 font-semibold py-3 rounded-xl transition-all duration-200'
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className='flex flex-col gap-3 pt-5 border-t border-gray-100'>
              <Link href={'/auth/signin'} onClick={() => setMenuOpen(false)}>
                <button className='w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold py-3 rounded-xl transition-all duration-200'>
                  Login
                </button>
              </Link>
              <Link href={'/auth/signup'} onClick={() => setMenuOpen(false)}>
                <button className='w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-200/50'>
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
