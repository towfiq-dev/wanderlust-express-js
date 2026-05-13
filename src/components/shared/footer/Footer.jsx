import React from 'react';
// react-icons থেকে আইকন ইমপোর্ট করা হয়েছে
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
//import { HiOutlineLocationMarker, HiOutlineArrowUpRight } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-gray-400 px-6 md:px-8 py-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Branding & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-5">
          <div className="max-w-lg">
            <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter mb-6">
              Wanderlust<span className="text-blue-500">.</span>
            </h1>
            <p className="text-lg leading-relaxed text-gray-500">
              Your gateway to extraordinary travel experiences. We curate unique journeys 
              that stay with you forever. Explore the world with a new perspective.
            </p>
          </div>

          <div className="w-full lg:w-1/3">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2 uppercase tracking-widest text-sm">
              <FaEnvelope className="text-blue-500" /> Join The Adventure
            </h3>
            <div className="relative group">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-[#111] border-b border-gray-700 py-4 outline-none focus:border-white transition-all duration-300 text-white placeholder:text-gray-600"
              />
              <button className="absolute right-0 bottom-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <HiOutlineArrowUpRight size={24} />
              </button>
            </div>
            <p className="mt-3 text-xs uppercase tracking-widest text-gray-600">
              * Get exclusive deals every Tuesday.
            </p>
          </div>
        </div>

        <hr className="border-gray-900 mb-6" />

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest text-sm uppercase">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Destinations', 'My Bookings', 'Travel Guides'].map((item) => (
                <li key={item} className="group flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                  <span className="h-[1px] w-0 bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest text-sm uppercase">Support</h4>
            <ul className="space-y-4">
              {['Help Center', 'Terms of Service', 'Privacy Policy', 'Refund Policy'].map((item) => (
                <li key={item} className="hover:text-white cursor-pointer transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h4 className="text-white font-bold mb-6 tracking-widest text-sm uppercase">Contact</h4>
            <div className="space-y-5">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-[#111] rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 text-blue-500">
                  <FaPhoneAlt size={14} />
                </div>
                <span className="text-sm">+1 (786) 901 1622</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-[#111] rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 text-blue-500">
                  <HiOutlineLocationMarker size={16} />
                </div>
                <span className="text-sm">Manhattan, New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-7 pt-5 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm tracking-wide">
            © 2026 <span className="text-white font-medium">Wanderlust</span>. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[
              { Icon: FaFacebookF, link: '#' },
              { Icon: FaTwitter, link: '#' },
              { Icon: FaInstagram, link: '#' },
              { Icon: FaLinkedinIn, link: '#' }
            ].map((social, index) => (
              <a 
                key={index} 
                href={social.link} 
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#111] text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 border border-gray-800 hover:border-blue-600"
              >
                <social.Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;