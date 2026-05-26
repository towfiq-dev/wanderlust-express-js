import { BadgeCheck, CalendarDays, Eye, MapPin, Hash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import UserBookingDelete from '../delete/UserBookingDelete';

const UserBookingCard = ({ booking }) => {
  const departureDate = new Date(booking.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const isPast = new Date(booking.date) < new Date();

  return (
    <div className="flex flex-col md:flex-row gap-0 overflow-hidden">
      {/* Image */}
      <div className="relative h-[220px] md:h-auto md:w-[280px] md:min-h-[200px] shrink-0">
        <Image
          src={booking.imageUrl}
          alt={booking.destinationName}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {/* Status Badge */}
          <div className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide
            ${isPast
              ? 'bg-gray-100 text-gray-500'
              : 'bg-emerald-100 text-emerald-700'
            }`}>
            <BadgeCheck size={14} />
            {isPast ? 'Completed' : 'Confirmed'}
          </div>

          {/* Name */}
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            {booking.destinationName}
          </h2>

          {/* Details */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-cyan-500" />
              <span>{departureDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-cyan-500" />
              <span>{booking.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Hash size={15} className="text-gray-400" />
              <span className="font-mono text-xs">{booking._id}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-0.5">Total Amount</p>
            <h3 className="text-3xl font-black text-cyan-500">${booking.price}</h3>
          </div>

          <div className="flex gap-3">
            <UserBookingDelete booking={booking} />
            <Link href={`/allNav/destinations`}>
              <button className="flex items-center gap-2 bg-gray-900 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer">
                <Eye size={15} />
                View Trips
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookingCard;
