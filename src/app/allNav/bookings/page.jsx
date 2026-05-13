import UserBookingCard from '@/components/allNavPage/userBookingCard/UserBookingCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
// import { BadgeCheck, CalendarDays, Eye, MapPin } from 'lucide-react';
// import Image from 'next/image';
import React from 'react';
//import Link from 'next/link';

const Bookings = async() => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const user = session?.user

  const res = await fetch(`http://localhost:5000/bookings/${user?.id}`)
  const bookings = await res.json()
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 mt-20 md:px-10">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          My Bookings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage and view your upcoming travel plans
        </p>
      </div>

      {/* Empty State */}
      {bookings.length === 0 && (
        <div className="flex h-[400px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Bookings Found
            </h2>

            <p className="mt-2 text-gray-500">
              You haven’t booked any destination yet.
            </p>
          </div>
        </div>
      )}
      {/* Booking Cards */}
      <div className="space-y-8">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
          >
          <UserBookingCard booking={booking}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;