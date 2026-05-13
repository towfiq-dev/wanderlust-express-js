'use client'
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Logo from '@/assets/Wanderlust.png'
import NavLinks from './NavLinks';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // স্ক্রল করলে নববার কিছুটা ট্রান্সপারেন্ট হবে (Glassmorphism)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = (
    <ul className='flex items-center gap-8'>
      <NavLinks href={'/'}>Home</NavLinks>
      <NavLinks href={'/allNav/destinations'}>Destinations</NavLinks>
      <NavLinks href={'/allNav/allDestinations'}>All Destinations</NavLinks>
      <NavLinks href={'/allNav/bookings'}>My Bookings</NavLinks>
      <NavLinks href={'/allNav/admin'}>Admin</NavLinks>
    </ul>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' : 'bg-transparent'
    }`}>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        
        {/* Logo Section */}
        <Link href="/" className='flex-shrink-0'>
          <Image 
            className='w-32 md:w-40 h-auto hover:opacity-80 transition-opacity' 
            width={160} 
            height={40} 
            src={Logo} 
            alt='Logo'
            priority
          />
        </Link>

        {/* Navigation Links - Hidden on Mobile, Visible on Desktop */}
        <div className='hidden lg:block'>
          {links}
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-3'>

          <div className="hidden md:flex items-center gap-3 border-r pr-3 border-gray-200">
            <Link href={'/profile'}>
              <Button size="sm" variant="light" className="font-medium">Profile</Button>
            </Link>
            <Button 
              size="sm"
              color="danger" 
              variant="flat"
              className="font-medium"
            >
              Sign Out
            </Button>
          </div>


          <div className='flex items-center gap-2'>
            <Link href={'/auth/signin'}>
              <Button size="sm" variant="light" className="font-semibold text-gray-700">Login</Button>
            </Link>
            <Link href={'/auth/signup'}>
              <Button 
                size="sm" 
                className="bg-black text-white font-medium hover:bg-gray-800 transition-all shadow-md"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;