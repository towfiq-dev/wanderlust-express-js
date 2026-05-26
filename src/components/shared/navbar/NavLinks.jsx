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
        className={`relative py-1.5 px-1 text-sm font-medium tracking-wide transition-all duration-250 group inline-block
        ${isActive
            ? 'text-cyan-500 font-semibold'
            : 'text-gray-600 hover:text-gray-900'
          }
        ${className}`}
      >
        {children}

        {/* Active / Hover underline */}
        <span
          className={`absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 origin-left rounded-full
            ${isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'}`}
        />

        {/* Active dot */}
        {isActive && (
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
        )}
      </Link>
    </li>
  );
};

export default NavLinks;
