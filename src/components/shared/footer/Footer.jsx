import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Destinations', href: '/allNav/destinations' },
  { label: 'My Bookings', href: '/allNav/bookings' },
  { label: 'Add Destination', href: '/allNav/allDestinations' },
];

const Footer = () => {
  return (
    <footer className="bg-[#080808] text-gray-400 mt-10 md:mt-24">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-6xl font-serif font-black text-white tracking-tight mb-5">
              Wanderlust<span className="text-cyan-400">.</span>
            </h1>
            <p className="text-gray-500 leading-relaxed text-base max-w-sm">
              Your gateway to extraordinary travel experiences. We curate unique journeys
              that stay with you forever.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-7">
              {[
                { Icon: FaFacebookF, href: '#' },
                { Icon: FaTwitter, href: '#' },
                { Icon: FaInstagram, href: '#' },
                { Icon: FaLinkedinIn, href: '#' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:bg-cyan-500 hover:text-white transition-all duration-250 border border-white/5 hover:border-cyan-500"
                >
                  <social.Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full lg:w-80">
            <h3 className="text-white font-bold mb-1 text-lg">Stay Inspired</h3>
            <p className="text-gray-500 text-sm mb-5">Get exclusive travel deals every Tuesday.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 pr-14 outline-none focus:border-cyan-500/50 transition-all text-white placeholder:text-gray-600 text-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-cyan-500 hover:bg-cyan-400 rounded-xl flex items-center justify-center transition-all">
                <HiOutlineArrowUpRight size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        <hr className="border-white/5 mb-12" />

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold mb-5 tracking-widest text-xs uppercase">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm"
                  >
                    <span className="h-px w-0 bg-cyan-400 group-hover:w-4 transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-5 tracking-widest text-xs uppercase">Support</h4>
            <ul className="space-y-3">
              {['Help Center', 'Terms of Service', 'Privacy Policy', 'Refund Policy'].map((item) => (
                <li key={item}>
                  <span className="text-gray-500 hover:text-white cursor-pointer transition-colors text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 tracking-widest text-xs uppercase">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-cyan-500 transition-all duration-250 text-cyan-500 group-hover:text-white">
                  <FaPhoneAlt size={13} />
                </div>
                <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">+1 (786) 901 1622</span>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-cyan-500 transition-all duration-250 text-cyan-500 group-hover:text-white">
                  <FaEnvelope size={13} />
                </div>
                <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">hello@wanderlust.com</span>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-cyan-500 transition-all duration-250 text-cyan-500 group-hover:text-white">
                  <HiOutlineLocationMarker size={15} />
                </div>
                <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">Manhattan, New York</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © 2026 <span className="text-gray-400 font-medium">Wanderlust</span>. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">Crafted with ❤️ for adventurers worldwide</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
