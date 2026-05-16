'use client'

import { Avatar, Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Logo from '@/assets/Wanderlust.png'
import NavLinks from './NavLinks';
import { authClient } from '@/lib/auth-client';
import { Menu, X } from 'lucide-react';

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
  }

  const links = (
    <>
      <NavLinks href={'/'}>Home</NavLinks>
      <NavLinks href={'/allNav/destinations'}>Destinations</NavLinks>
      <NavLinks href={'/allNav/allDestinations'}>Add Destination</NavLinks>
      <NavLinks href={'/allNav/bookings'}>My Bookings</NavLinks>
      <NavLinks href={'/allNav/admin'}>Admin</NavLinks>
    </>
  );

  return (

    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${isScrolled
        ? 'bg-white/80 backdrop-blur-md shadow-md py-3'
        : 'bg-transparent py-5'
      }`}>

      <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>

        {/* Logo */}
        <Link href="/">
          <Image
            src={Logo}
            alt='Logo'
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

          {
            user ?

              <>
                <Link href={'/allNav/profile'}>
                  <Button variant='light'>
                    Profile
                  </Button>
                </Link>

                <Image className='rounded-full w-13 h-13 border-2 border-cyan-500'
                      width={100}
                      height={100}
                      src={user.image}
                      alt={user.name}
                />

                <Button
                  color='danger'
                  variant='flat'
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>

              :

              <>
                <Link href={'/auth/signin'}>
                  <Button variant='light'>
                    Login
                  </Button>
                </Link>

                <Link href={'/auth/signup'}>
                  <Button className='bg-black text-white'>
                    Sign Up
                  </Button>
                </Link>
              </>
          }

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='lg:hidden'
        >
          {
            menuOpen
              ? <X size={28} />
              : <Menu size={28} />
          }
        </button>

      </div>

      {/* Mobile Menu */}
      {
        menuOpen && (

          <div className='lg:hidden bg-white shadow-lg px-6 py-5 space-y-5'>

            <ul className='flex flex-col gap-5'>
              {links}
            </ul>

            {
              user ?

                <div className='flex flex-col gap-3 pt-4 border-t'>

                  <div className='flex items-center gap-3'>

                    <Image className='rounded-full w-13 h-13 border-2 border-cyan-500'
                      width={100}
                      height={100}
                      src={user.image}
                      alt={user.name}
                    />

                    <div>
                      <h3 className='font-semibold'>{user?.name}</h3>
                      <p className='text-sm text-gray-500'>{user?.email}</p>
                    </div>

                  </div>

                  <Button
                    color='danger'
                    variant='flat'
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>

                </div>

                :

                <div className='flex flex-col gap-3 pt-4 border-t'>

                  <Link href={'/auth/signin'}>
                    <Button className='w-full' variant='light'>
                      Login
                    </Button>
                  </Link>

                  <Link href={'/auth/signup'}>
                    <Button className='w-full bg-black text-white'>
                      Sign Up
                    </Button>
                  </Link>

                </div>
            }

          </div>
        )
      }

    </nav>
  );
};

export default Navbar;