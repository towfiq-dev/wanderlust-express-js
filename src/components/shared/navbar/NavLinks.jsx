'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLinks = ({ children, href, className = "" }) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <li className="list-none">
      <Link 
        href={href} 
        className={`relative py-1 text-sm font-medium tracking-wide transition-colors duration-300 group
        ${isActive ? 'text-black font-bold' : 'text-gray-500 hover:text-black'} 
        ${className}`}
      >
        {children}
        
        {/* Modern Hover Underline Animation */}
        <span className={`absolute left-0 bottom-0 w-full h-[2px] bg-green-500 transition-transform duration-300 origin-left 
          ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}>
        </span>
      </Link>
    </li>
  );
};

export default NavLinks;