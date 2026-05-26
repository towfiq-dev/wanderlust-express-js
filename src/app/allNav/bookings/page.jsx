import UserBookingCard from '@/components/allNavPage/userBookingCard/UserBookingCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { CalendarX, Plus } from 'lucide-react';

export const metadata = {
  title: 'My Bookings',
  description: 'View and manage your upcoming travel bookings and reservations.',
};

const Bookings = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const { token } = await auth.api.getToken({ headers: await headers() });
  const user = session?.user;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${user?.id}`, {
    headers: { authorization: `Bearer ${token}` }
  });
  const bookings = await res.json();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 pt-28 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-4">
          <div>
            <span className="section-label mb-3 block">Dashboard</span>
            <h1 className="text-4xl font-serif font-bold text-gray-900">My Bookings</h1>
            <p className="mt-2 text-gray-500">Manage and view your upcoming travel plans</p>
          </div>
          {bookings.length > 0 && (
            <Link href="/allNav/destinations">
              <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-cyan-200/50 text-sm">
                <Plus size={16} />
                New Booking
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Stats */}
        {bookings.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Total Bookings', value: bookings.length },
              { label: 'Confirmed', value: bookings.length },
              { label: 'Upcoming', value: bookings.filter(b => new Date(b.date) >= new Date()).length },
              { label: 'Total Spent', value: `$${bookings.reduce((a, b) => a + Number(b.price), 0).toLocaleString()}` }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm text-center">
                <div className="text-2xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 rounded-3xl border border-dashed border-gray-200 bg-white text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <CalendarX size={36} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Bookings Yet</h2>
            <p className="text-gray-500 mb-8 max-w-sm">
              You haven&apos;t booked any destination yet. Start exploring amazing destinations!
            </p>
            <Link href="/allNav/destinations">
              <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-cyan-200/50">
                <Plus size={18} />
                Explore Destinations
              </button>
            </Link>
          </div>
        )}

        {/* Booking Cards */}
        <div className="space-y-5">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <UserBookingCard booking={booking} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
