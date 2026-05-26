import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import {
  Package, CalendarCheck, TrendingUp,
  MapPin, DollarSign, Star
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = { title: 'Dashboard' };

async function getAdminData(token) {
  const destRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`, { cache: 'no-store' });
  const destinations = await destRes.json();

  let bookings = [];
  try {
    const bookRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/bookings`, {
      headers: { authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (bookRes.ok) bookings = await bookRes.json();
  } catch { /* no admin endpoint yet */ }

  return { destinations, bookings };
}

export default async function AdminDashboard() {
  const session = await auth.api.getSession({ headers: await headers() });
  const { token } = await auth.api.getToken({ headers: await headers() });
  const user = session?.user;

  let destinations = [];
  let bookings = [];
  try {
    const data = await getAdminData(token);
    destinations = Array.isArray(data.destinations) ? data.destinations : [];
    bookings = Array.isArray(data.bookings) ? data.bookings : [];
  } catch { /* empty */ }

  const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.price || 0), 0);
  const upcomingBookings = bookings.filter(b => new Date(b.date) >= new Date()).length;

  const categories = destinations.reduce((acc, d) => {
    const cat = d.category || 'Other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const statCards = [
    { label: 'Total Destinations', value: destinations.length, icon: Package, bg: 'bg-cyan-50', text: 'text-cyan-600', sub: `${Object.keys(categories).length} categories`, href: '/allNav/admin/destinations' },
    { label: 'Total Bookings', value: bookings.length, icon: CalendarCheck, bg: 'bg-violet-50', text: 'text-violet-600', sub: `${upcomingBookings} upcoming`, href: '/allNav/admin/bookings' },
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, bg: 'bg-emerald-50', text: 'text-emerald-600', sub: 'All time earnings', href: '#' },
    { label: 'Avg. Rating', value: '4.9 ★', icon: Star, bg: 'bg-amber-50', text: 'text-amber-600', sub: 'Based on reviews', href: '#' },
  ];

  const recentBookings = [...bookings].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
  const recentDestinations = [...destinations].slice(-4).reverse();

  return (
    <div className="p-6 md:p-8 space-y-7">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0d1117] via-[#111827] to-[#1a2332] rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '28px 28px' }} />
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-cyan-500/5 to-transparent" />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">Admin Dashboard</p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0] || 'Admin'} 👋
            </h1>
            <p className="text-gray-400 text-sm max-w-md">
              Here&apos;s an overview of your Wanderlust platform — destinations, bookings, and revenue at a glance.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-right">
            <div>
              <p className="text-gray-400 text-xs mb-1">Total Revenue</p>
              <p className="text-2xl font-black text-white">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <Link href={card.href} key={i}>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 ${card.bg} rounded-xl flex items-center justify-center`}>
                  <card.icon size={20} className={card.text} />
                </div>
                <TrendingUp size={14} className="text-gray-200 group-hover:text-emerald-400 transition-colors mt-1" />
              </div>
              <div className="text-2xl font-black text-gray-900 mb-0.5">{card.value}</div>
              <div className="text-sm font-semibold text-gray-700 mb-1">{card.label}</div>
              <div className="text-xs text-gray-400">{card.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">Recent Bookings</h2>
            <Link href="/allNav/admin/bookings">
              <span className="text-xs text-cyan-500 font-semibold hover:underline cursor-pointer">View All →</span>
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <div className="py-16 text-center">
              <CalendarCheck size={32} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No bookings data available</p>
              <p className="text-gray-300 text-xs mt-1">Add /admin/bookings endpoint to backend to see all bookings</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-50 bg-gray-50/50">
                    <th className="px-6 py-3">Traveler</th>
                    <th className="px-6 py-3">Destination</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentBookings.map((b, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2.5">
                          {b.userImage ? (
                            <Image src={b.userImage} alt={b.userName || ''} width={32} height={32}
                              className="rounded-lg object-cover border border-gray-100 shrink-0" />
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                              {b.userName?.[0]?.toUpperCase() || 'U'}
                            </div>
                          )}
                          <span className="font-medium text-gray-800 truncate max-w-[120px]">{b.userName || 'User'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <div>
                          <p className="font-medium text-gray-800 truncate max-w-[130px]">{b.destinationName}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <MapPin size={10} />{b.country}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-gray-500">
                        {new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-3.5 font-bold text-gray-900">${b.price}</td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full
                          ${new Date(b.date) >= new Date()
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-500'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${new Date(b.date) >= new Date() ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                          {new Date(b.date) >= new Date() ? 'Upcoming' : 'Completed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Category pie breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-5">Category Breakdown</h2>
            {Object.keys(categories).length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">No destinations yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(categories).map(([cat, count]) => {
                  const pct = Math.round((count / destinations.length) * 100);
                  const colors = {
                    Beach: 'from-cyan-400 to-blue-500',
                    Mountain: 'from-emerald-400 to-teal-500',
                    Adventure: 'from-orange-400 to-red-500',
                    Cultural: 'from-violet-400 to-purple-500',
                    City: 'from-amber-400 to-yellow-500',
                    Other: 'from-gray-300 to-gray-400',
                  };
                  const gradient = colors[cat] || 'from-cyan-400 to-blue-500';
                  return (
                    <div key={cat}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-gray-700">{cat}</span>
                        <span className="text-gray-400 text-xs">{count} · {pct}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
                          style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Destinations */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">Latest Destinations</h2>
              <Link href="/allNav/admin/destinations">
                <span className="text-xs text-cyan-500 font-semibold hover:underline cursor-pointer">All →</span>
              </Link>
            </div>
            <div className="space-y-3">
              {recentDestinations.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">No destinations</p>
              ) : recentDestinations.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                    <Image src={d.imageUrl} alt={d.destinationName} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{d.destinationName}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin size={10} />
                      <span>{d.country}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 shrink-0">${d.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
