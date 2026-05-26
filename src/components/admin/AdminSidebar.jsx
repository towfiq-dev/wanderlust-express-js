'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import {
  LayoutDashboard,
  Map,
  CalendarCheck,
  User,
  Settings,
  Shield,
  ChevronRight,
  LogOut,
  Package,
} from 'lucide-react';

const navItems = [
  {
    label: 'Dashboard',
    href: '/allNav/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Destinations',
    href: '/allNav/admin/destinations',
    icon: Map,
  },
  {
    label: 'All Bookings',
    href: '/allNav/admin/bookings',
    icon: CalendarCheck,
  },
  {
    label: 'My Profile',
    href: '/allNav/admin/profile',
    icon: User,
  },
  {
    label: 'Settings',
    href: '/allNav/admin/settings',
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const isActive = (href) => {
    if (href === '/allNav/admin') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 shrink-0 bg-[#0d1117] min-h-screen flex flex-col sticky top-[72px] self-start h-[calc(100vh-72px)]">

      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
            <Shield size={18} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">Admin Panel</div>
            <div className="text-gray-500 text-xs">Wanderlust</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">
          Navigation
        </p>

        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer
                  ${active
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent'
                  }`}
              >
                <item.icon
                  size={18}
                  className={active ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300'}
                />
                <span className="text-sm font-medium flex-1">{item.label}</span>
                {active && (
                  <ChevronRight size={14} className="text-cyan-400" />
                )}
              </div>
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-white/5">
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">
            Quick Add
          </p>
          <Link href="/allNav/allDestinations">
            <div className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent transition-all cursor-pointer">
              <Package size={18} className="text-gray-500 group-hover:text-gray-300" />
              <span className="text-sm font-medium">Add Destination</span>
            </div>
          </Link>
        </div>
      </nav>

      {/* User info + logout */}
      {user && (
        <div className="px-4 py-4 border-t border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-3 px-1">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || 'User'}
                width={36}
                height={36}
                className="rounded-xl object-cover border border-white/10"
              />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                {user.name?.[0]?.toUpperCase() || 'A'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">{user.name}</p>
              <p className="text-gray-500 text-xs truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm font-medium cursor-pointer"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      )}
    </aside>
  );
}
